import { db } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Products | Tech Bazaar",
  description: "Browse products available on Tech Bazaar.",
};

export default async function ProductsPage() {
  const products = await db
    .collection("products")
    .find({})
    .sort({ createdAt: -1 })
    .limit(24)
    .toArray();

  return (
    <section className="mx-auto max-w-7xl px-2 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          Tech Bazaar
        </p>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">Browse Products</h1>
        <p className="mt-2 text-muted">Find the latest products from our sellers.</p>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-separator bg-surface p-10 text-center">
          <h2 className="text-xl font-semibold">No products available yet</h2>
          <p className="mt-2 text-muted">New products will appear here when sellers add them.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            const name = product.name || product.title || "Untitled product";
            const image = product.image || product.imageUrl || product.photo;

            return (
              <article
                key={product._id.toString()}
                className="overflow-hidden rounded-2xl border border-separator bg-surface"
              >
                <div className="aspect-[4/3] bg-default-100">
                  {image ? (
                    // Product images can come from different seller-hosted domains.
                    <img className="h-full w-full object-cover" src={image} alt={name} />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-4">
                  {product.category && (
                    <p className="text-xs font-medium uppercase tracking-wide text-accent">
                      {product.category}
                    </p>
                  )}
                  <h2 className="mt-1 line-clamp-1 text-lg font-semibold">{name}</h2>
                  <p className="mt-3 text-xl font-bold">
                    {product.price != null ? `৳${product.price}` : "Price unavailable"}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
