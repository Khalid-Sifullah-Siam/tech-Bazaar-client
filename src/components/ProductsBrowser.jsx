"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductsBrowser() {
  const [data, setData] = useState({ items: [], categories: [], page: 1, pages: 0 });
  const [filters, setFilters] = useState({ search: "", category: "", sort: "newest", page: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const query = new URLSearchParams(Object.entries(filters).filter(([, value]) => value !== ""));
    fetch(`/api/marketplace/products?${query}`, { signal: controller.signal })
      .then((response) => response.json())
      .then(setData)
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [filters]);

  const updateFilter = (key, value) => {
    setLoading(true);
    setFilters((current) => ({ ...current, [key]: value, page: key === "page" ? value : 1 }));
  };

  return (
    <section className="mx-auto max-w-7xl px-3 py-10">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Marketplace</p>
      <h1 className="mt-2 text-4xl font-bold">Browse approved products</h1>

      <div className="my-8 grid gap-3 rounded-2xl border border-separator bg-surface p-4 md:grid-cols-[1fr_220px_180px]">
        <input className="rounded-xl border border-separator bg-background px-4 py-3" placeholder="Search products..." value={filters.search} onChange={(event) => updateFilter("search", event.target.value)} />
        <select className="rounded-xl border border-separator bg-background px-4" value={filters.category} onChange={(event) => updateFilter("category", event.target.value)}>
          <option value="">All categories</option>
          {data.categories.map((category) => <option key={category}>{category}</option>)}
        </select>
        <select className="rounded-xl border border-separator bg-background px-4" value={filters.sort} onChange={(event) => updateFilter("sort", event.target.value)}>
          <option value="newest">Newest</option>
          <option value="popular">Most popular</option>
          <option value="priceAsc">Price: low to high</option>
          <option value="priceDesc">Price: high to low</option>
        </select>
      </div>

      {loading ? (
        <p className="py-16 text-center text-muted">Loading products...</p>
      ) : data.items.length === 0 ? (
        <p className="rounded-2xl border border-separator p-12 text-center text-muted">No approved products found.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.items.map((product) => (
            <article key={product._id} className="overflow-hidden rounded-2xl border border-separator bg-surface">
              <div className="relative aspect-[4/3]">
                <Image unoptimized fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" src={product.image} alt={product.name} className="object-cover" />
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">{product.category}</p>
                <h2 className="mt-1 truncate text-lg font-semibold">{product.name}</h2>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xl font-bold">${product.price}</p>
                  <Link className="rounded-lg bg-foreground px-3 py-2 text-sm text-background" href={`/products/${product._id}`}>View details</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {data.pages > 1 && (
        <div className="mt-8 flex justify-center gap-3">
          <button className="rounded-lg border px-4 py-2 disabled:opacity-40" disabled={data.page <= 1} onClick={() => updateFilter("page", data.page - 1)}>Previous</button>
          <span className="px-3 py-2">Page {data.page} of {data.pages}</span>
          <button className="rounded-lg border px-4 py-2 disabled:opacity-40" disabled={data.page >= data.pages} onClick={() => updateFilter("page", data.page + 1)}>Next</button>
        </div>
      )}
    </section>
  );
}
