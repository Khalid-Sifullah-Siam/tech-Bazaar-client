"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductForm from "@/components/ProductForm";

const labels = {
  buyer: { purchases: "Purchased products", spent: "Total spent" },
  seller: { productCount: "Products", soldCount: "Units sold", revenue: "Revenue", plan: "Current plan" },
  admin: { buyerCount: "Buyers", sellerCount: "Sellers", productCount: "Products", pendingCount: "Pending review", revenue: "Total payments" },
};

function money(key, value) {
  return key === "spent" || key === "revenue" ? `$${Number(value).toFixed(2)}` : value;
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

  const productAction = async (id, method, body) => {
    const response = await fetch(`/api/marketplace/products/${id}`, { method, headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
    if (!response.ok) return toast.error((await response.json().catch(() => ({}))).message || "Action failed");
    toast.success("Product updated");
    setReload((value) => value + 1);
  };

  const userAction = async (id, body) => {
    const response = await fetch(`/api/marketplace/users/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (!response.ok) return toast.error("User update failed");
    toast.success("User updated");
    setReload((value) => value + 1);
  };

  if (loading || isPending) return <p className="p-8 text-muted">Loading dashboard...</p>;

  if (mode === "overview") return (
    <section className="w-full">
      <h1 className="mb-6 text-3xl font-bold">{role?.[0]?.toUpperCase() + role?.slice(1)} overview</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Object.entries(data).map(([key, value]) => <div key={key} className="rounded-2xl border bg-surface p-6"><p className="text-sm text-muted">{labels[role]?.[key] || key}</p><p className="mt-2 text-3xl font-bold capitalize">{money(key, value)}</p></div>)}
      </div>
    </section>
  );

  if (mode === "products") return (
    <section className="w-full">
      <h1 className="mb-6 text-3xl font-bold">{role === "admin" ? "Product moderation" : "My products"}</h1>
      {editing && <div className="mb-8"><ProductForm product={editing} onSaved={() => { setEditing(null); setReload((value) => value + 1); }} /></div>}
      <div className="grid gap-4 lg:grid-cols-2">
        {data.map((product) => <article key={product._id} className="flex gap-4 rounded-2xl border bg-surface p-4"><div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl"><Image unoptimized fill sizes="112px" src={product.image} alt={product.name} className="object-cover" /></div><div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><h2 className="truncate font-semibold">{product.name}</h2><span className="text-xs font-semibold uppercase text-accent">{product.status}</span></div><p className="text-sm text-muted">${product.price} · Stock {product.stock} · Sold {product.soldCount || 0}</p>{product.rejectionReason && <p className="mt-1 text-sm text-red-500">{product.rejectionReason}</p>}<div className="mt-4 flex flex-wrap gap-2">{role === "admin" ? <><button className="rounded-lg bg-green-600 px-3 py-2 text-sm text-white" onClick={() => productAction(product._id, "PATCH", { status: "approved" })}>Approve</button><button className="rounded-lg bg-amber-600 px-3 py-2 text-sm text-white" onClick={() => productAction(product._id, "PATCH", { status: "rejected", rejectionReason: "Does not meet marketplace requirements" })}>Reject</button></> : <button className="rounded-lg border px-3 py-2 text-sm" onClick={() => setEditing(product)}>Edit</button>}<button className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white" onClick={() => confirm("Delete this product?") && productAction(product._id, "DELETE")}>Delete</button></div></div></article>)}
      </div>
    </section>
  );

  if (mode === "users") return (
    <section className="w-full"><h1 className="mb-6 text-3xl font-bold">User management</h1><div className="overflow-x-auto rounded-2xl border"><table className="w-full text-left text-sm"><thead className="bg-default"><tr><th className="p-4">User</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead><tbody>{data.map((user) => <tr key={user.id} className="border-t"><td className="p-4"><b>{user.name}</b><br/><span className="text-muted">{user.email}</span></td><td className="capitalize">{user.role}</td><td className="capitalize">{user.status || "active"}</td><td className="space-x-2"><button className="rounded border px-3 py-2" onClick={() => userAction(user.id, { role: user.role === "seller" ? "buyer" : "seller" })}>Make {user.role === "seller" ? "buyer" : "seller"}</button><button className="rounded bg-red-600 px-3 py-2 text-white" onClick={() => userAction(user.id, { status: user.status === "blocked" ? "active" : "blocked" })}>{user.status === "blocked" ? "Unblock" : "Block"}</button></td></tr>)}</tbody></table></div></section>
  );

  return (
    <section className="w-full"><h1 className="mb-6 text-3xl font-bold">{mode === "purchases" ? "Purchased products" : mode === "plans" ? "Plan history" : "Payment history"}</h1><div className="overflow-x-auto rounded-2xl border"><table className="w-full text-left text-sm"><thead className="bg-default"><tr><th className="p-4">Date</th><th>Type</th><th>Product / Plan</th><th>Quantity</th><th>Amount</th><th>Status</th></tr></thead><tbody>{data.filter((item) => mode === "purchases" ? item.type === "product" : mode === "plans" ? item.type === "plan" : true).map((payment) => <tr key={payment._id} className="border-t"><td className="p-4">{new Date(payment.createdAt).toLocaleDateString()}</td><td className="capitalize">{payment.type}</td><td>{payment.productName || payment.plan || payment.productId}</td><td>{payment.quantity || "-"}</td><td>${payment.amount}</td><td className="capitalize">{payment.status}</td></tr>)}</tbody></table></div></section>
  );
}
