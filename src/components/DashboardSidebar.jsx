'use client';

import { Bars, Bell, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function DashboardSidebar() {
  const adminItems = [
    { icon: House, label: "Overview", link: "/dashboard/admin" },
    { icon: Person, label: "User Management", link: "/dashboard/admin/user-management" },
    { icon: Gear, label: "Maintain Products", link: "/dashboard/admin/maintain-products" },
    { icon: Bell, label: "Transactions", link: "/dashboard/admin/transactions" },
  ];

  const sellerItems = [
    { icon: House, label: "Overview", link: "/dashboard/seller" },
    { icon: Magnifier, label: "Add Products", link: "/dashboard/seller/add-products" },
    { icon: Bell, label: "Products", link: "/dashboard/seller/products" },
    { icon: Envelope, label: "Subscription History", link: "/dashboard/seller/subscription-history" },
  ];

  const buyerItems = [
    { icon: House, label: "Overview", link: "/dashboard/buyer" },
    { icon: Magnifier, label: "Products", link: "/dashboard/buyer/products" },
    { icon: Bell, label: "Transactions", link: "/dashboard/buyer/transactions" },
  ];

  const { data: session } = authClient.useSession();
  const role = session?.user?.role;

  const navItems = role === "admin" ? adminItems : role === "seller" ? sellerItems : buyerItems;


  return (
    <Drawer>
      <div className="flex w-full justify-end md:hidden">
        <Button variant="secondary" className="ml-auto w-fit self-end">
          <Bars />
          Menu
        </Button>
      </div>

      <div className="hidden md:block">
        <Image
          src="/logo-xl.png"
          alt="Logo"
          width={150}
          height={150}
          className="border-b"
        />

        <nav className="flex h-screen flex-col gap-1 border-r pt-6">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
              type="button"
            >
              <item.icon className="size-5 text-muted" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <Drawer.Backdrop>
        <Drawer.Content placement="right">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
