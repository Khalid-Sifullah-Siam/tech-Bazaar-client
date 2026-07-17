import { db } from "@/lib/auth";
import {
  jsonError,
  getCurrentUser,
  publicUrl,
  requireUser,
  serialize,
  getStripe,
} from "@/lib/marketplace";
import { ObjectId } from "mongodb";

const products = db.collection("products");
const payments = db.collection("payments");
const users = db.collection("user");

function pathParts(context) {
  return context.params.then(({ path }) => path || []);
}

function productId(id) {
  if (!ObjectId.isValid(id)) throw new Response("Invalid product", { status: 400 });
  return new ObjectId(id);
}

function userFilter(id) {
  const filters = [{ id }];
  if (ObjectId.isValid(id)) filters.push({ _id: new ObjectId(id) });
  return { $or: filters };
}

function productInput(body) {
  const price = Number(body.price);
  const stock = Number(body.stock);
  if (!body.name?.trim() || !body.category?.trim() || !body.image?.trim()) {
    throw new Response("Name, category and image are required", { status: 400 });
  }
  if (!Number.isFinite(price) || price <= 0 || !Number.isInteger(stock) || stock < 0) {
    throw new Response("Price or stock is invalid", { status: 400 });
  }
  return {
    name: body.name.trim(),
    category: body.category.trim(),
    image: body.image.trim(),
    description: body.description?.trim() || "",
    price,
    stock,
  };
}

export async function GET(request, context) {
  try {
    const [resource, id] = await pathParts(context);
    const url = new URL(request.url);

    if (resource === "products" && id) {
      const user = await getCurrentUser(request);
      const product = await products.findOne({ _id: productId(id) });
      if (!product) return Response.json({ message: "Product not found" }, { status: 404 });
      const canView = product.status === "approved" || user?.role === "admin" || product.sellerId === user?.id;
      if (!canView) return new Response("Forbidden", { status: 403 });
      return Response.json(serialize(product));
    }

    if (resource === "products") {
      const scope = url.searchParams.get("scope") || "marketplace";
      const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
      const limit = Math.min(24, Math.max(1, Number(url.searchParams.get("limit")) || 8));
      const search = url.searchParams.get("search")?.trim();
      const category = url.searchParams.get("category")?.trim();
      const sort = url.searchParams.get("sort") || "newest";
      const filter = {};

      if (scope === "own") {
        const user = await requireUser(request, ["seller"]);
        filter.sellerId = user.id;
      } else if (scope === "admin") {
        await requireUser(request, ["admin"]);
        const status = url.searchParams.get("status");
        if (status && status !== "all") filter.status = status;
      } else {
        filter.status = "approved";
      }

      if (search) filter.name = { $regex: search, $options: "i" };
      if (category) filter.category = category;
      const sortMap = {
        newest: { createdAt: -1 },
        priceAsc: { price: 1 },
        priceDesc: { price: -1 },
        popular: { soldCount: -1 },
      };
      const [items, total, categories] = await Promise.all([
        products.find(filter).sort(sortMap[sort] || sortMap.newest).skip((page - 1) * limit).limit(limit).toArray(),
        products.countDocuments(filter),
        products.distinct("category", scope === "marketplace" ? { status: "approved" } : {}),
      ]);
      return Response.json({ items: serialize(items), total, page, pages: Math.ceil(total / limit), categories });
    }

    if (resource === "payments") {
      const user = await requireUser(request);
      const filter = user.role === "admin" ? {} : user.role === "seller" ? { sellerId: user.id } : { buyerId: user.id };
      return Response.json(serialize(await payments.find(filter).sort({ createdAt: -1 }).toArray()));
    }

    if (resource === "users") {
      await requireUser(request, ["admin"]);
      const items = await users.find({}, { projection: { password: 0 } }).sort({ createdAt: -1 }).toArray();
      return Response.json(serialize(items.map((user) => ({
        ...user,
        id: user.id || user._id.toString(),
      }))));
    }

    if (resource === "stats") {
      const user = await requireUser(request);
      if (user.role === "admin") {
        const [buyerCount, sellerCount, productCount, pendingCount, revenue] = await Promise.all([
          users.countDocuments({ role: "buyer" }),
          users.countDocuments({ role: "seller" }),
          products.countDocuments(),
          products.countDocuments({ status: "pending" }),
          payments.aggregate([{ $match: { status: "paid" } }, { $group: { _id: null, total: { $sum: "$amount" } } }]).toArray(),
        ]);
        return Response.json({ buyerCount, sellerCount, productCount, pendingCount, revenue: revenue[0]?.total || 0 });
      }
      if (user.role === "seller") {
        const [productCount, sold] = await Promise.all([
          products.countDocuments({ sellerId: user.id }),
          payments.aggregate([{ $match: { sellerId: user.id, type: "product", status: "paid" } }, { $group: { _id: null, revenue: { $sum: "$amount" }, sold: { $sum: "$quantity" } } }]).toArray(),
        ]);
        return Response.json({ productCount, soldCount: sold[0]?.sold || 0, revenue: sold[0]?.revenue || 0, plan: user.plan || "free" });
      }
      const [purchases, spent] = await Promise.all([
        payments.countDocuments({ buyerId: user.id, type: "product", status: "paid" }),
        payments.aggregate([{ $match: { buyerId: user.id, type: "product", status: "paid" } }, { $group: { _id: null, total: { $sum: "$amount" } } }]).toArray(),
      ]);
      return Response.json({ purchases, spent: spent[0]?.total || 0 });
    }

    return new Response("Not found", { status: 404 });
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(request, context) {
  try {
    const [resource, action] = await pathParts(context);

    if (resource === "products") {
      const user = await requireUser(request, ["seller"]);
      const limits = { free: 5, starter: 50, pro: Infinity };
      const productCount = await products.countDocuments({ sellerId: user.id });
      if (productCount >= (limits[user.plan] ?? limits.free)) {
        throw new Response("Your plan product limit has been reached", { status: 403 });
      }
      const input = productInput(await request.json());
      const product = {
        ...input,
        sellerId: user.id,
        sellerName: user.name,
        sellerEmail: user.email,
        status: "pending",
        soldCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await products.insertOne(product);
      return Response.json({ ...serialize(product), _id: result.insertedId.toString() }, { status: 201 });
    }

    if (resource === "checkout" && action === "product") {
      const user = await requireUser(request, ["buyer"]);
      const { productId: id, quantity: rawQuantity } = await request.json();
      const quantity = Math.max(1, Number(rawQuantity) || 1);
      const product = await products.findOne({ _id: productId(id), status: "approved" });
      if (!product || product.stock < quantity) throw new Response("Product unavailable", { status: 400 });
      const origin = publicUrl(request);
      const session = await getStripe().checkout.sessions.create({
        mode: "payment",
        customer_email: user.email,
        line_items: [{ quantity, price_data: { currency: "usd", unit_amount: Math.round(product.price * 100), product_data: { name: product.name, images: product.image ? [product.image] : [] } } }],
        metadata: { type: "product", buyerId: user.id, sellerId: product.sellerId || "platform", productId: id, quantity: String(quantity) },
        success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/products/${id}`,
      });
      return Response.json({ url: session.url });
    }

    if (resource === "checkout" && action === "plan") {
      const user = await requireUser(request, ["seller"]);
      const body = await request.json();
      const plan = body.plan === "pro" ? "pro" : "starter";
      const amount = plan === "pro" ? 49 : 19;
      const origin = publicUrl(request);
      const session = await getStripe().checkout.sessions.create({
        mode: "payment",
        customer_email: user.email,
        line_items: [{ quantity: 1, price_data: { currency: "usd", unit_amount: amount * 100, product_data: { name: `${plan} seller plan` } } }],
        metadata: { type: "plan", sellerId: user.id, plan },
        success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pricing`,
      });
      return Response.json({ url: session.url });
    }

    if (resource === "checkout" && action === "confirm") {
      const user = await requireUser(request);
      const { sessionId } = await request.json();
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      if (session.payment_status !== "paid") throw new Response("Payment is not complete", { status: 400 });
      if (session.metadata.type === "product" && session.metadata.buyerId !== user.id) throw new Response("Forbidden", { status: 403 });
      if (session.metadata.type === "plan" && session.metadata.sellerId !== user.id) throw new Response("Forbidden", { status: 403 });

      const existing = await payments.findOne({ stripeSessionId: session.id });
      if (existing) return Response.json(serialize(existing));
      const quantity = Number(session.metadata.quantity || 1);
      const purchasedProduct = session.metadata.productId
        ? await products.findOne({ _id: productId(session.metadata.productId) })
        : null;
      const payment = {
        stripeSessionId: session.id,
        type: session.metadata.type,
        buyerId: session.metadata.buyerId || null,
        sellerId: session.metadata.sellerId,
        productId: session.metadata.productId || null,
        productName: purchasedProduct?.name || null,
        productImage: purchasedProduct?.image || null,
        plan: session.metadata.plan || null,
        quantity,
        amount: session.amount_total / 100,
        currency: session.currency,
        status: "paid",
        customerEmail: session.customer_details?.email || user.email,
        createdAt: new Date(),
      };
      await payments.insertOne(payment);
      if (payment.type === "product") {
        await products.updateOne({ _id: productId(payment.productId), stock: { $gte: quantity } }, { $inc: { stock: -quantity, soldCount: quantity } });
      } else {
        await users.updateOne({ id: user.id }, { $set: { plan: payment.plan, planUpdatedAt: new Date() } });
      }
      return Response.json(serialize(payment));
    }

    if (resource === "upload") {
      await requireUser(request, ["seller"]);
      const form = await request.formData();
      const image = form.get("image");
      if (!(image instanceof File)) throw new Response("Image is required", { status: 400 });
      const upload = new FormData();
      upload.append("image", image);
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, { method: "POST", body: upload });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error?.message || "Image upload failed");
      return Response.json({ url: result.data.url });
    }

    return new Response("Not found", { status: 404 });
  } catch (error) {
    return jsonError(error);
  }
}

export async function PATCH(request, context) {
  try {
    const [resource, id] = await pathParts(context);
    const body = await request.json();

    if (resource === "products") {
      const user = await requireUser(request, ["seller", "admin"]);
      const filter = { _id: productId(id) };
      let update;
      if (user.role === "admin") {
        if (!["approved", "rejected", "pending"].includes(body.status)) throw new Response("Invalid status", { status: 400 });
        update = { status: body.status, rejectionReason: body.rejectionReason?.trim() || "", reviewedAt: new Date(), reviewedBy: user.id };
      } else {
        filter.sellerId = user.id;
        update = { ...productInput(body), status: "pending", updatedAt: new Date() };
      }
      const result = await products.updateOne(filter, { $set: update });
      if (!result.matchedCount) return new Response("Product not found", { status: 404 });
      return Response.json({ success: true });
    }

    if (resource === "users") {
      const admin = await requireUser(request, ["admin"]);
      const filter = userFilter(id);
      const target = await users.findOne(filter, { projection: { role: 1, id: 1 } });
      if (!target) return new Response("User not found", { status: 404 });
      if (target.role === "admin") throw new Response("Admin accounts cannot be changed", { status: 403 });
      const update = {};
      if (["buyer", "seller"].includes(body.role)) update.role = body.role;
      if (["active", "blocked", "suspended"].includes(body.status)) update.status = body.status;
      if (!Object.keys(update).length) throw new Response("Invalid update", { status: 400 });
      const targetId = target.id || target._id.toString();
      if (targetId === admin.id) throw new Response("You cannot change your own account", { status: 400 });
      const result = await users.updateOne(filter, { $set: update });
      return Response.json({ success: true, modified: result.modifiedCount > 0 });
    }

    if (resource === "profile") {
      const user = await requireUser(request);
      const update = { name: body.name?.trim(), image: body.image?.trim() || null };
      if (!update.name) throw new Response("Name is required", { status: 400 });
      await users.updateOne({ id: user.id }, { $set: update });
      return Response.json({ success: true });
    }

    return new Response("Not found", { status: 404 });
  } catch (error) {
    return jsonError(error);
  }
}

export async function DELETE(request, context) {
  try {
    const [resource, id] = await pathParts(context);
    if (resource !== "products") return new Response("Not found", { status: 404 });
    const user = await requireUser(request, ["seller", "admin"]);
    const filter = { _id: productId(id) };
    if (user.role === "seller") filter.sellerId = user.id;
    const result = await products.deleteOne(filter);
    if (!result.deletedCount) return new Response("Product not found", { status: 404 });
    return Response.json({ success: true });
  } catch (error) {
    return jsonError(error);
  }
}
