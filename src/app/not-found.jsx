"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[70vh] place-items-center overflow-hidden px-4 py-16 text-center">
      <motion.div animate={{ scale: [1, 1.12, 1], rotate: [0, 8, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute h-80 w-80 rounded-full bg-orange-100 blur-3xl" />
      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="relative max-w-xl">
        <motion.div initial={{ scale: 0.6, rotate: -12 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 180, damping: 14 }} className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-[#17241f] text-orange-400 shadow-xl"><SearchX size={38} /></motion.div>
        <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }} className="mt-7 text-8xl font-black tracking-tighter text-gray-950">404</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-2 text-3xl font-bold">This page is off the shelf</motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mx-auto mt-4 max-w-md leading-7 text-muted">The page may have moved, the link may be incorrect, or the product is no longer available.</motion.p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#17241f] px-6 py-3 font-semibold text-white"><Home size={18} /> Back home</Link>
          <Link href="/products" className="inline-flex items-center justify-center gap-2 rounded-xl border border-separator bg-surface px-6 py-3 font-semibold"><ArrowLeft size={18} /> Browse products</Link>
        </div>
      </motion.div>
    </section>
  );
}
