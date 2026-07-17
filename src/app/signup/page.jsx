"use client";

import AuthShell from "@/components/AuthShell";
import { authClient } from "@/lib/auth-client";
import { Button, FieldError, Form, Input, Label, ListBox, Select, TextField } from "@heroui/react";
import { ArrowRight, ImageIcon, LockKeyhole, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const user = Object.fromEntries(new FormData(event.currentTarget));
    const { error } = await authClient.signUp.email(user);
    setIsLoading(false);

    if (error) return toast.error(error.message || "Account could not be created");
    toast.success("Account created successfully");
    router.push("/");
    router.refresh();
  };

  const input = (Icon) => <Icon className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-400" size={18} />;

  return (
    <AuthShell eyebrow="Join the marketplace" title="Create your account" description="Shop the latest technology or start selling to customers across the marketplace.">
      <Form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField isRequired name="name" className="w-full"><Label className="mb-2 font-semibold text-gray-800">Full name</Label><div className="relative">{input(UserRound)}<Input placeholder="Your name" variant="secondary" className="h-12 pl-11" /></div><FieldError /></TextField>
          <TextField name="image" type="url" className="w-full"><Label className="mb-2 font-semibold text-gray-800">Profile image <span className="font-normal text-gray-400">(optional)</span></Label><div className="relative">{input(ImageIcon)}<Input placeholder="https://image-url.com" variant="secondary" className="h-12 pl-11" /></div><FieldError /></TextField>
        </div>
        <TextField isRequired name="email" type="email" className="w-full"><Label className="mb-2 font-semibold text-gray-800">Email address</Label><div className="relative">{input(Mail)}<Input placeholder="you@example.com" variant="secondary" className="h-12 pl-11" /></div><FieldError /></TextField>
        <TextField isRequired name="password" type="password" className="w-full"><Label className="mb-2 font-semibold text-gray-800">Password</Label><div className="relative">{input(LockKeyhole)}<Input placeholder="Create a secure password" variant="secondary" className="h-12 pl-11" /></div><FieldError /></TextField>
        <Select isRequired name="role" placeholder="Choose your account type" className="w-full">
          <Label className="mb-2 font-semibold text-gray-800">I want to join as</Label>
          <Select.Trigger className="h-12"><Select.Value /><Select.Indicator /></Select.Trigger>
          <Select.Popover><ListBox><ListBox.Item id="buyer" textValue="buyer">Buyer<ListBox.ItemIndicator /></ListBox.Item><ListBox.Item id="seller" textValue="seller">Seller<ListBox.ItemIndicator /></ListBox.Item></ListBox></Select.Popover>
        </Select>
        <Button type="submit" className="mt-2 h-12 w-full bg-[#17241f] font-semibold text-white" isDisabled={isLoading}>
          {isLoading ? "Creating account..." : <span className="flex items-center gap-2">Create account <ArrowRight size={18} /></span>}
        </Button>
      </Form>
      <p className="mt-6 text-center text-sm text-gray-600">Already have an account? <Link href="/signin" className="font-bold text-orange-600 hover:text-orange-700">Sign in</Link></p>
    </AuthShell>
  );
}
