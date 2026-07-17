import Image from "next/image";

export default function Loading() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-[#f7f3eb] px-4">
      <div className="text-center">
        <div className="relative mx-auto h-28 w-28">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-orange-600 border-r-orange-300" />
          <div className="absolute inset-3 animate-pulse rounded-full bg-white shadow-xl" />
          <div className="absolute inset-0 grid place-items-center"><Image src="/logo.webp" width={48} height={48} alt="Tech Bazaar loading" priority /></div>
        </div>
        <p className="mt-7 text-sm font-bold uppercase tracking-[0.28em] text-orange-600">Tech Bazaar</p>
        <h2 className="mt-2 text-2xl font-bold text-gray-950">Preparing your marketplace</h2>
        <div className="mx-auto mt-5 flex w-40 gap-2">
          <span className="h-1.5 flex-1 animate-pulse rounded-full bg-orange-600" />
          <span className="h-1.5 flex-1 animate-pulse rounded-full bg-orange-300 [animation-delay:150ms]" />
          <span className="h-1.5 flex-1 animate-pulse rounded-full bg-orange-200 [animation-delay:300ms]" />
        </div>
      </div>
    </section>
  );
}
