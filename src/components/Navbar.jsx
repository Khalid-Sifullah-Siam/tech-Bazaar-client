"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiLogOut } from "react-icons/bi";

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    setIsSigningOut(true);
    const { error } = await authClient.signOut();
    setIsSigningOut(false);

    if (error) {
      toast.error(error.message || "Logout করা যায়নি");
      return;
    }

    setIsMenuOpen(false);
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  };
  return (
    <div>
      <div className="bg-black p-1 text-white">
        <marquee>
          🎉 Avail Up to 4% Extra Discount with Bank Transfer | 💳 Cash on
          Delivery Available | 🚚 Fast Delivery in 2–3 Days.
        </marquee>
      </div>

      <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
        <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <div className="flex items-center gap-3">
                <Image
                  height={40}
                  width={40}
                  loading="eager"
                  src="/logo.webp"
                  alt="logo"
                />
                <p className="font-bold">Tech Bazaar</p>
              </div>
            </Link>
          </div>
          <ul className="hidden items-center gap-4 md:flex">
            <li>
              <Link
                href="/products"
                className="font-medium text-accent"
                aria-current="page"
              >
                Browse Products
              </Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
          </ul>
         {!user && (
            <div className="hidden items-center gap-4 md:flex">
              <Link href="/signin">Login</Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}

          {user && (
            <div className="hidden items-center gap-4 md:flex">
              <Avatar size="sm">
                <Avatar.Image alt={user.name} src={user.image || undefined} />
                <Avatar.Fallback>{user.name?.charAt(0) || "U"}</Avatar.Fallback>
              </Avatar>
              <div className="max-w-40 leading-tight">
                <p className="truncate text-sm font-medium">{user.name}</p>
                <p className="truncate text-xs text-muted">{user.email}</p>
              </div>
              <Link href={`/dashboard/${user.role}`} className="text-sm font-medium text-accent">
                Dashboard
              </Link>
              <Button
                variant="danger"
                onPress={handleSignOut}
                isDisabled={isSigningOut}
              >
                <BiLogOut />
                {isSigningOut ? "Logging out..." : "Logout"}
              </Button>
            </div>
          )}
        </header>
        {isMenuOpen && (
          <div className="border-t border-separator md:hidden">
            <ul className="flex flex-col gap-2 p-4">
              <li>
                <Link href="/products" onClick={() => setIsMenuOpen(false)} className="block py-2 font-medium text-accent">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link href="/pricing" onClick={() => setIsMenuOpen(false)} className="block py-2">
                  Pricing
                </Link>
              </li>
              {user && <li><Link href={`/dashboard/${user.role}`} onClick={() => setIsMenuOpen(false)} className="block py-2">Dashboard</Link></li>}
              {!user ? (
                <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
                  <Link href="/signin" onClick={() => setIsMenuOpen(false)} className="block py-2">Login</Link>
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)}><Button className="w-full">Sign Up</Button></Link>
                </li>
              ) : (
                <li className="mt-4 flex flex-col gap-3 border-t border-separator pt-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar size="sm">
                      <Avatar.Image alt={user.name} src={user.image || undefined} />
                      <Avatar.Fallback>{user.name?.charAt(0) || "U"}</Avatar.Fallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{user.name}</p>
                      <p className="truncate text-xs text-muted">{user.email}</p>
                    </div>
                  </div>
                  <Button className="w-full" variant="danger" onPress={handleSignOut} isDisabled={isSigningOut}>
                    <BiLogOut /> Logout
                  </Button>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
