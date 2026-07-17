import { ArrowLeft, Home, SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[70vh] place-items-center overflow-hidden px-4 py-16 text-center">
      <div className="absolute h-80 w-80 rounded-full bg-orange-100 blur-3xl" />
      <div className="relative max-w-xl">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-[#17241f] text-orange-400 shadow-xl"><SearchX size={38} /></div>
        <p className="mt-7 text-8xl font-black tracking-tighter text-gray-950">404</p>
        <h1 className="mt-2 text-3xl font-bold">This page is off the shelf</h1>
        <p className="mx-auto mt-4 max-w-md leading-7 text-muted">The page may have moved, the link may be incorrect, or the product is no longer available.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#17241f] px-6 py-3 font-semibold text-white"><Home size={18} /> Back home</Link>
          <Link href="/products" className="inline-flex items-center justify-center gap-2 rounded-xl border border-separator bg-surface px-6 py-3 font-semibold"><ArrowLeft size={18} /> Browse products</Link>
        </div>
      </div>
    </section>
  );
}
