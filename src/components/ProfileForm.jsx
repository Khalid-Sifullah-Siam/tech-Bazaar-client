"use client";

import { Avatar, Modal } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfileForm() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const user = session?.user;

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/marketplace/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))),
    });
    const result = await response.json().catch(() => ({}));
    setLoading(false);
    if (!response.ok) return toast.error(result.message || "Profile update failed");
    toast.success("Profile updated");
    router.refresh();
    window.location.reload();
  };

  if (isPending) return <p className="p-8 text-muted">Loading profile...</p>;
  if (!user) return null;

  return (
    <section className="max-w-2xl">
      <h1 className="mb-6 text-3xl font-bold">My profile</h1>
      <div className="rounded-3xl border border-separator bg-surface p-6 md:p-8">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <Avatar size="lg">
            <Avatar.Image alt={user.name} src={user.image || undefined} />
            <Avatar.Fallback>{user.name?.charAt(0) || "U"}</Avatar.Fallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-2xl font-semibold">{user.name}</h2>
            <p className="truncate text-muted">{user.email}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium uppercase">
              <span className="rounded-full bg-default px-3 py-1">{user.role}</span>
              <span className="rounded-full bg-default px-3 py-1">{user.plan || "free"} plan</span>
            </div>
          </div>
        </div>

        <Modal>
          <Modal.Trigger className="mt-8 inline-flex rounded-xl bg-foreground px-5 py-3 font-semibold text-background">
            Update profile
          </Modal.Trigger>
          <Modal.Backdrop>
            <Modal.Container placement="center" size="md">
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Heading>Update profile</Modal.Heading>
                </Modal.Header>
                <form onSubmit={submit}>
                  <Modal.Body className="grid gap-4">
                    <label className="grid gap-1 text-sm">Name<input required name="name" defaultValue={user.name} className="rounded-xl border border-separator bg-background px-4 py-3" /></label>
                    <label className="grid gap-1 text-sm">Email<input disabled value={user.email} className="rounded-xl border border-separator bg-default px-4 py-3" /></label>
                    <label className="grid gap-1 text-sm">Profile image URL<input name="image" defaultValue={user.image || ""} className="rounded-xl border border-separator bg-background px-4 py-3" /></label>
                  </Modal.Body>
                  <Modal.Footer className="flex justify-end gap-3">
                    <Modal.CloseTrigger className="rounded-xl border px-4 py-2">Cancel</Modal.CloseTrigger>
                    <button disabled={loading} className="rounded-xl bg-foreground px-4 py-2 text-background disabled:opacity-50">{loading ? "Saving..." : "Save changes"}</button>
                  </Modal.Footer>
                </form>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </div>
    </section>
  );
}
