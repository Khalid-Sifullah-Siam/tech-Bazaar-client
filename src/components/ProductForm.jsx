"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ProductForm({ product, onSaved }) {
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const file = form.imageFile.files[0];

    if (file) {
      const uploadForm = new FormData();
      uploadForm.append("image", file);
      const uploadResponse = await fetch("/api/marketplace/upload", { method: "POST", body: uploadForm });
      const upload = await uploadResponse.json().catch(() => ({}));
      if (!uploadResponse.ok) {
        setLoading(false);
        return toast.error(upload.message || "Image upload failed");
      }
      values.image = upload.url;
    }

    const response = await fetch(`/api/marketplace/products${product ? `/${product._id}` : ""}`, {
      method: product ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const result = await response.json().catch(() => ({}));
    setLoading(false);
    if (!response.ok) return toast.error(result.message || "Product could not be saved");
    toast.success(product ? "Product updated and sent for review" : "Product submitted for review");
    if (!product) form.reset();
    onSaved?.();
  };

  return (
    <form onSubmit={submit} className="grid max-w-3xl gap-4 rounded-2xl border border-separator bg-surface p-6 md:grid-cols-2">
      <label className="grid gap-1 text-sm">Product name<input required name="name" defaultValue={product?.name} className="rounded-xl border bg-background px-4 py-3" /></label>
      <label className="grid gap-1 text-sm">Category<input required name="category" defaultValue={product?.category} className="rounded-xl border bg-background px-4 py-3" /></label>
      <label className="grid gap-1 text-sm">Price (USD)<input required min="0.01" step="0.01" type="number" name="price" defaultValue={product?.price} className="rounded-xl border bg-background px-4 py-3" /></label>
      <label className="grid gap-1 text-sm">Stock<input required min="0" type="number" name="stock" defaultValue={product?.stock} className="rounded-xl border bg-background px-4 py-3" /></label>
      <label className="grid gap-1 text-sm md:col-span-2">Image URL<input name="image" defaultValue={product?.image} className="rounded-xl border bg-background px-4 py-3" /></label>
      <label className="grid gap-1 text-sm md:col-span-2">Or upload image<input accept="image/*" type="file" name="imageFile" className="rounded-xl border bg-background px-4 py-3" /></label>
      <label className="grid gap-1 text-sm md:col-span-2">Description<textarea name="description" defaultValue={product?.description} rows="5" className="rounded-xl border bg-background px-4 py-3" /></label>
      <button disabled={loading} className="rounded-xl bg-foreground px-5 py-3 font-semibold text-background disabled:opacity-50 md:col-span-2">{loading ? "Saving..." : product ? "Update product" : "Submit product"}</button>
    </form>
  );
}
