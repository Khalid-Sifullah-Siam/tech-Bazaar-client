"use client";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function PlanCheckout({ plan, children }) {
  const { data: session } = authClient.useSession();
  const checkout = async () => {
    if (session?.user?.role !== "seller") return toast.error("Login with a seller account to upgrade");
    const response = await fetch("/api/marketplace/checkout/plan", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan }) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) return toast.error(result.message || "Checkout failed");
    window.location.assign(result.url);
  };
  return <button onClick={checkout} className="w-full rounded-xl bg-foreground px-5 py-3 font-semibold text-background">{children}</button>;
}
