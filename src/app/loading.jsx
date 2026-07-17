"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Loading() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-[#f7f3eb] px-4">
      <div className="text-center">
        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} className="relative mx-auto h-28 w-28">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.35, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-2 border-transparent border-t-orange-600 border-r-orange-300" />
          <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-3 rounded-full bg-white shadow-xl" />
          <div className="absolute inset-0 grid place-items-center"><Image src="/logo.webp" width={48} height={48} alt="Tech Bazaar loading" priority /></div>
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-7 text-sm font-bold uppercase tracking-[0.28em] text-orange-600">Tech Bazaar</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-2 text-2xl font-bold text-gray-950">Preparing your marketplace</motion.h2>
        <div className="mx-auto mt-5 flex w-40 gap-2">
          <span className="h-1.5 flex-1 animate-pulse rounded-full bg-orange-600" />
          <span className="h-1.5 flex-1 animate-pulse rounded-full bg-orange-300 [animation-delay:150ms]" />
          <span className="h-1.5 flex-1 animate-pulse rounded-full bg-orange-200 [animation-delay:300ms]" />
        </div>
      </div>
    </section>
  );
}
