import BannerSlider from "@/components/Banner";
import { db } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const topProducts = await db
    .collection("products")
    .find({ status: "approved" })
    .sort({ soldCount: -1, createdAt: -1 })
    .limit(4)
    .toArray();

  return (
    <div className="mx-auto max-w-7xl px-2">
      <BannerSlider />

      <section className="py-14">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Customer favorites</p>
            <h2 className="mt-2 text-3xl font-bold">Top selling products</h2>
          </div>
          <Link href="/products" className="font-semibold text-accent">View all products</Link>
        </div>

        {topProducts.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {topProducts.map((product) => (
              <Link key={product._id.toString()} href={`/products/${product._id}`} className="group overflow-hidden rounded-2xl border border-separator bg-surface">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image unoptimized fill sizes="(max-width: 640px) 100vw, 25vw" src={product.image} alt={product.name} className="object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">{product.category}</p>
                  <h3 className="mt-1 truncate text-lg font-semibold">{product.name}</h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xl font-bold">${product.price}</span>
                    <span className="text-xs text-muted">{product.soldCount || 0} sold</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-separator p-10 text-center text-muted">Top products will appear after admin approval.</div>
        )}
      </section>
    </div>
  );
}
