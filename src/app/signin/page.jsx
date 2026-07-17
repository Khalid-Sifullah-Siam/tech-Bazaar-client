"use client";

import AuthShell from "@/components/AuthShell";
import { authClient } from "@/lib/auth-client";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const user = Object.fromEntries(new FormData(event.currentTarget));
    const { error } = await authClient.signIn.email(user);
    setIsLoading(false);

    if (error) return toast.error(error.message || "Email or password is incorrect");
    toast.success("Login successful");
    router.push("/");
    router.refresh();
  };

  return (
    <AuthShell eyebrow="Welcome back" title="Sign in to your account" description="Access your orders, saved products, seller tools, and account settings.">
      <Form onSubmit={onSubmit} className="grid gap-5">
        <TextField isRequired name="email" type="email" className="w-full">
          <Label className="mb-2 font-semibold text-gray-800">Email address</Label>
          <div className="relative"><Mail className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-400" size={18} /><Input placeholder="you@example.com" variant="secondary" className="h-12 pl-11" /></div>
          <FieldError />
        </TextField>
        <TextField isRequired name="password" type="password" className="w-full">
          <Label className="mb-2 font-semibold text-gray-800">Password</Label>
          <div className="relative"><LockKeyhole className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-400" size={18} /><Input placeholder="Enter your password" variant="secondary" className="h-12 pl-11" /></div>
          <FieldError />
        </TextField>
        <Button type="submit" className="mt-2 h-12 w-full bg-[#17241f] font-semibold text-white" isDisabled={isLoading}>
          {isLoading ? "Signing in..." : <span className="flex items-center gap-2">Sign in <ArrowRight size={18} /></span>}
        </Button>
      </Form>
      <p className="mt-7 text-center text-sm text-gray-600">New to Tech Bazaar? <Link href="/signup" className="font-bold text-orange-600 hover:text-orange-700">Create an account</Link></p>
    </AuthShell>
  );
}
