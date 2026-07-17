"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfileForm() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const user = session?.user;

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/marketplace/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))) });
    setLoading(false);
    if (!response.ok) return toast.error("Profile update failed");
    toast.success("Profile updated");
    router.refresh();
    window.location.reload();
  };

  return <section><h1 className="mb-6 text-3xl font-bold">Update profile</h1><form onSubmit={submit} className="grid max-w-xl gap-4 rounded-2xl border bg-surface p-6"><label className="grid gap-1">Name<input required name="name" defaultValue={user?.name} className="rounded-xl border bg-background px-4 py-3" /></label><label className="grid gap-1">Email<input disabled value={user?.email || ""} className="rounded-xl border bg-default px-4 py-3" /></label><label className="grid gap-1">Image URL<input name="image" defaultValue={user?.image || ""} className="rounded-xl border bg-background px-4 py-3" /></label><button disabled={loading} className="rounded-xl bg-foreground px-5 py-3 text-background">{loading ? "Saving..." : "Save profile"}</button></form></section>;
}
