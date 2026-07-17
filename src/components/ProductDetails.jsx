"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProductDetails({ id }) {
  const { data: session, isPending } = authClient.useSession();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/marketplace/products/${id}`)
      .then(async (response) => {
        if (!response.ok) throw new Error(await response.text());
        return response.json();
      })
      .then(setProduct)
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, [id]);

  const checkout = async () => {
    const response = await fetch("/api/marketplace/checkout/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id, quantity }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) return toast.error(result.message || "Checkout failed");
    window.location.assign(result.url);
  };

  if (loading || isPending) return <p className="p-12 text-center">Loading product...</p>;
  if (!product) return <p className="p-12 text-center">Product not found.</p>;

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-3 py-12 md:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-3xl">
        <Image unoptimized fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" src={product.image} alt={product.name} />
      </div>
      <div className="self-center">
        <p className="font-semibold uppercase tracking-wide text-accent">{product.category}</p>
        <h1 className="mt-2 text-4xl font-bold">{product.name}</h1>
        <p className="mt-5 leading-7 text-muted">{product.description || "No description provided."}</p>
        <p className="mt-6 text-3xl font-bold">${product.price}</p>
        <p className="mt-2 text-sm text-muted">{product.stock} in stock · Sold by {product.sellerName}</p>

        {session?.user?.role === "buyer" ? (
          <div className="mt-8 flex flex-wrap gap-3">
            <input aria-label="Quantity" className="w-24 rounded-xl border px-4 py-3" type="number" min="1" max={product.stock} value={quantity} onChange={(event) => setQuantity(Math.min(product.stock, Math.max(1, Number(event.target.value))))} />
            <button className="rounded-xl bg-foreground px-6 py-3 font-semibold text-background disabled:opacity-50" disabled={!product.stock} onClick={checkout}>Buy with Stripe</button>
          </div>
        ) : !session ? (
          <Link className="mt-8 inline-block rounded-xl bg-foreground px-6 py-3 text-background" href="/signin">Login as buyer to purchase</Link>
        ) : (
          <p className="mt-8 rounded-xl border p-4 text-muted">Only buyer accounts can purchase products.</p>
        )}
      </div>
    </section>
  );
}
