"use client";

import { AlertDialog } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import ProductForm from "@/components/ProductForm";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const labels = {
  buyer: { purchases: "Purchased products", spent: "Total spent" },
  seller: { productCount: "Products", soldCount: "Units sold", revenue: "Revenue", plan: "Current plan" },
  admin: { buyerCount: "Buyers", sellerCount: "Sellers", productCount: "Products", pendingCount: "Pending review", revenue: "Total payments" },
};

function DeleteProductDialog({ product, onDelete }) {
  return (
    <AlertDialog>
      <AlertDialog.Trigger className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white">Delete</AlertDialog.Trigger>
      <AlertDialog.Backdrop>
        <AlertDialog.Container placement="center">
          <AlertDialog.Dialog>
            <AlertDialog.Header>
              <AlertDialog.Heading>Delete product?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p><strong>{product.name}</strong> will be permanently deleted. This action cannot be undone.</p>
            </AlertDialog.Body>
            <AlertDialog.Footer className="flex justify-end gap-3">
              <AlertDialog.CloseTrigger className="rounded-lg border px-4 py-2">Cancel</AlertDialog.CloseTrigger>
              <AlertDialog.CloseTrigger className="rounded-lg bg-red-600 px-4 py-2 text-white" onPress={onDelete}>Delete product</AlertDialog.CloseTrigger>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}

function ProductCard({ product, role, onAction, onEdit }) {
  return (
    <article className="flex gap-4 rounded-2xl border bg-surface p-4">
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl">
        <Image unoptimized fill sizes="112px" src={product.image} alt={product.name} className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-3">
          <h2 className="truncate font-semibold">{product.name}</h2>
          <span className="text-xs font-semibold uppercase text-accent">{product.status}</span>
        </div>
        <p className="text-sm text-muted">${product.price} | Stock {product.stock} | Sold {product.soldCount || 0}</p>
        {product.rejectionReason && <p className="mt-1 text-sm text-red-500">{product.rejectionReason}</p>}
        <div className="mt-4 flex flex-wrap gap-2">
          {role === "admin" ? (
            <>
              <button className="rounded-lg bg-green-600 px-3 py-2 text-sm text-white" onClick={() => onAction(product._id, "PATCH", { status: "approved" }, "Product approved")}>Approve</button>
              <button className="rounded-lg bg-amber-600 px-3 py-2 text-sm text-white" onClick={() => onAction(product._id, "PATCH", { status: "rejected", rejectionReason: "Does not meet marketplace requirements" }, "Product rejected")}>Reject</button>
            </>
          ) : (
            <button className="rounded-lg border px-3 py-2 text-sm" onClick={() => onEdit(product)}>Edit</button>
          )}
          <DeleteProductDialog product={product} onDelete={() => onAction(product._id, "DELETE", undefined, "Product deleted")} />
        </div>
      </div>
    </article>
  );
}

function UserActions({ user, onAction }) {
  if (user.role === "admin") return <span className="text-muted">Protected admin account</span>;
  const status = user.status || "active";
  return (
    <div className="flex min-w-100 flex-wrap gap-2 py-3">
      <button className="rounded border px-3 py-2" onClick={() => onAction(user.id, { role: user.role === "seller" ? "buyer" : "seller" }, `User role changed to ${user.role === "seller" ? "buyer" : "seller"}`)}>
        Make {user.role === "seller" ? "buyer" : "seller"}
      </button>
      {status === "blocked" ? (
        <button className="rounded bg-green-600 px-3 py-2 text-white" onClick={() => onAction(user.id, { status: "active" }, "User unblocked")}>Unblock</button>
      ) : (
        <button className="rounded bg-red-600 px-3 py-2 text-white" onClick={() => onAction(user.id, { status: "blocked" }, "User blocked")}>Block</button>
      )}
      {status === "suspended" ? (
        <button className="rounded bg-green-600 px-3 py-2 text-white" onClick={() => onAction(user.id, { status: "active" }, "User unsuspended")}>Unsuspend</button>
      ) : (
        <button className="rounded bg-amber-600 px-3 py-2 text-white" onClick={() => onAction(user.id, { status: "suspended" }, "User suspended")}>Suspend</button>
      )}
    </div>
  );
}

export default function DashboardView({ mode }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [reload, setReload] = useState(0);
  const role = session?.user?.role;
  const endpoint = mode === "overview" ? "stats" : mode === "products" ? `products?scope=${role === "admin" ? "admin&status=all&limit=24" : "own&limit=24"}` : mode === "users" ? "users" : "payments";

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
      return;
    }
    if (!session) return;
    fetch(`/api/marketplace/${endpoint}`)
      .then(async (response) => {
        if (!response.ok) throw new Error(await response.text());
        return response.json();
      })
      .then((result) => setData(result.items || result))
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, [session, isPending, endpoint, reload, router]);

  const productAction = async (id, method, body, successMessage) => {
    const response = await fetch(`/api/marketplace/products/${id}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) return toast.error(result.message || "Action failed");
    toast.success(successMessage || "Product updated");
    setReload((value) => value + 1);
  };

  const userAction = async (id, body, successMessage) => {
    const response = await fetch(`/api/marketplace/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) return toast.error(result.message || "User update failed");
    toast.success(successMessage);
    setReload((value) => value + 1);
  };

  if (loading || isPending) return <p className="p-8 text-muted">Loading dashboard...</p>;

  if (mode === "overview") {
    return <section className="w-full"><h1 className="mb-6 text-3xl font-bold capitalize">{role} overview</h1><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Object.entries(data).map(([key, value]) => <div key={key} className="rounded-2xl border bg-surface p-6"><p className="text-sm text-muted">{labels[role]?.[key] || key}</p><p className="mt-2 text-3xl font-bold">{key === "spent" || key === "revenue" ? `$${Number(value).toFixed(2)}` : value}</p></div>)}</div></section>;
  }

  if (mode === "products") {
    return <section className="w-full"><h1 className="mb-6 text-3xl font-bold">{role === "admin" ? "Product moderation" : "My products"}</h1>{editing && <div className="mb-8"><ProductForm product={editing} onSaved={() => { setEditing(null); setReload((value) => value + 1); }} /></div>}<div className="grid gap-4 lg:grid-cols-2">{data.map((product) => <ProductCard key={product._id} product={product} role={role} onAction={productAction} onEdit={setEditing} />)}</div></section>;
  }

  if (mode === "users") {
    return <section className="w-full"><h1 className="mb-6 text-3xl font-bold">User management</h1><div className="overflow-x-auto rounded-2xl border"><table className="w-full text-left text-sm"><thead className="bg-default"><tr><th className="p-4">User</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead><tbody>{data.map((user) => <tr key={user.id} className="border-t"><td className="p-4"><b>{user.name}</b><br /><span className="text-muted">{user.email}</span></td><td className="capitalize">{user.role}</td><td className="capitalize">{user.status || "active"}</td><td><UserActions user={user} onAction={userAction} /></td></tr>)}</tbody></table></div></section>;
  }

  const filtered = data.filter((item) => mode === "purchases" ? item.type === "product" : mode === "plans" ? item.type === "plan" : true);
  return <section className="w-full"><h1 className="mb-6 text-3xl font-bold">{mode === "purchases" ? "Purchased products" : mode === "plans" ? "Plan history" : "Payment history"}</h1><div className="overflow-x-auto rounded-2xl border"><table className="w-full text-left text-sm"><thead className="bg-default"><tr><th className="p-4">Date</th><th>Type</th><th>Product / Plan</th><th>Quantity</th><th>Amount</th><th>Status</th></tr></thead><tbody>{filtered.map((payment) => <tr key={payment._id} className="border-t"><td className="p-4">{new Date(payment.createdAt).toLocaleDateString()}</td><td className="capitalize">{payment.type}</td><td>{payment.productName || payment.plan || payment.productId}</td><td>{payment.quantity || "-"}</td><td>${payment.amount}</td><td className="capitalize">{payment.status}</td></tr>)}</tbody></table></div></section>;
}
