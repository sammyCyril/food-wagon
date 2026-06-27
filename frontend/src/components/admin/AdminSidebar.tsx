"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  Truck,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
  name: "Products",
  href: "/admin/products",
  icon: Package,
},
  {
    name: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
];

type AdminSidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen flex-col
          border-r border-gray-100 bg-white
          transition-transform duration-300

          w-64
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0
          md:w-20
          lg:w-64
        `}
      >
        {/* Logo */}
        <Link href="/">
          <div className="flex h-20 items-center justify-center md:justify-center lg:justify-start gap-2 px-4 lg:px-6">
            <Truck
              className="text-orange-500"
              size={26}
            />

            <h1 className="md:hidden lg:block font-bold text-[20px] text-orange-500">
              foodwagon
            </h1>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-start gap-3 rounded-xl px-4 py-3 transition-all ${
                  isActive
                    ? "bg-orange-300 text-black"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />

                <span className="font-medium md:hidden lg:inline">
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}