"use client";

import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({ error, reset }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <section className="grid min-h-[70vh] place-items-center bg-linear-to-b from-red-50 to-white px-4 py-16 text-center">
      <div className="max-w-xl rounded-[2rem] border border-red-100 bg-white p-8 shadow-2xl shadow-red-100 sm:p-12">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-red-100 text-red-600"><AlertTriangle size={38} /></div>
        <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-red-600">Something went wrong</p>
        <h1 className="mt-3 text-3xl font-bold text-gray-950">We hit an unexpected problem</h1>
        <p className="mt-4 leading-7 text-gray-600">Your data is safe. Try loading this section again, or return home and continue browsing.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"><RotateCcw size={18} /> Try again</button>
          <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-900 hover:bg-gray-50"><Home size={18} /> Back home</Link>
        </div>
      </div>
    </section>
  );
}
