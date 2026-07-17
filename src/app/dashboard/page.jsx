"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  useEffect(() => {
    if (!isPending) router.replace(session ? `/dashboard/${session.user.role}` : "/signin");
  }, [session, isPending, router]);
  return <p className="p-8">Loading dashboard...</p>;
}
