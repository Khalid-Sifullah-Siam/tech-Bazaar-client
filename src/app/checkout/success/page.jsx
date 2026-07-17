"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function Confirmation() {
  const sessionId = useSearchParams().get("session_id");
  const [state, setState] = useState(sessionId ? "confirming" : "error");

  useEffect(() => {
    if (!sessionId) return;
    fetch("/api/marketplace/checkout/confirm", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionId }) })
      .then((response) => setState(response.ok ? "success" : "error"));
  }, [sessionId]);

  return (
    <div className="mx-auto my-20 max-w-xl rounded-3xl border border-separator bg-surface p-10 text-center">
      <h1 className="text-3xl font-bold">{state === "confirming" ? "Confirming payment..." : state === "success" ? "Payment successful" : "Payment confirmation failed"}</h1>
      <p className="mt-3 text-muted">{state === "success" ? "Your payment and account history have been updated." : "Please do not close this page while we verify Stripe."}</p>
      {state !== "confirming" && <Link className="mt-6 inline-block rounded-xl bg-foreground px-5 py-3 text-background" href="/dashboard">Go to dashboard</Link>}
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return <Suspense fallback={<p className="p-12 text-center">Loading...</p>}><Confirmation /></Suspense>;
}
