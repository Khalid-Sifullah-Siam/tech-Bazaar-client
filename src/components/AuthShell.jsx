"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const benefits = [
  "Secure checkout and protected accounts",
  "Curated products from verified sellers",
  "One dashboard for orders and sales",
];

export default function AuthShell({ eyebrow, title, description, children }) {
  return (
    <section className="relative isolate min-h-[calc(100vh-7rem)] overflow-hidden bg-[#f7f3eb] px-4 py-10 sm:py-16">
      <div className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(#c56a2d_1px,transparent_1px)] [background-size:24px_24px]" />
      <motion.div animate={{ x: [0, 28, 0], y: [0, 18, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-24 top-10 -z-10 h-80 w-80 rounded-full bg-orange-200/60 blur-3xl" />
      <motion.div animate={{ x: [0, -24, 0], y: [0, -16, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-20 bottom-0 -z-10 h-96 w-96 rounded-full bg-amber-200/50 blur-3xl" />

      <motion.div initial={{ opacity: 0, y: 24, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-2xl shadow-orange-950/10 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.aside initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18, duration: 0.55 }} className="relative hidden overflow-hidden bg-[#17241f] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-[40px] border-orange-400/20" />
          <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-orange-500/15 blur-2xl" />
          <div className="relative">
            <Link href="/" className="inline-flex items-center gap-3 font-bold">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white"><Image src="/logo.webp" width={32} height={32} alt="Tech Bazaar" /></span>
              Tech Bazaar
            </Link>
            <div className="mt-16 max-w-md">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-300">
                <Sparkles size={14} /> Smarter marketplace
              </span>
              <h2 className="mt-6 text-4xl font-bold leading-tight">Technology you want. A marketplace you can trust.</h2>
              <p className="mt-5 leading-7 text-white/65">Discover reliable products, manage purchases, or grow your seller business from one secure account.</p>
            </div>
          </div>

          <div className="relative mt-14 space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div key={benefit} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + index * 0.1 }} className="flex items-center gap-3 text-sm text-white/80">
                <CheckCircle2 className="text-orange-400" size={18} /> {benefit}
              </motion.div>
            ))}
            <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6 text-xs text-white/50">
              <ShieldCheck size={18} /> Your account data is encrypted and protected.
            </div>
          </div>
        </motion.aside>

        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.18 } } }} className="p-6 sm:p-10 lg:p-14">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Link href="/" className="flex items-center gap-2 font-bold"><Image src="/logo.webp" width={34} height={34} alt="Tech Bazaar" /> Tech Bazaar</Link>
            <ShoppingBag className="text-orange-600" size={22} />
          </div>
          <motion.p variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">{eyebrow}</motion.p>
          <motion.h1 variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }} className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">{title}</motion.h1>
          <motion.p variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }} className="mt-3 max-w-lg leading-7 text-gray-600">{description}</motion.p>
          <motion.div variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }} className="mt-8">{children}</motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
