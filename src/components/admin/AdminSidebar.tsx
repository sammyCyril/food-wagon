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
    icon: Package,

    children: [
      {
        name: "All Products",
        href: "/admin/products",
      },
      {
        name: "Categories",
        href: "/admin/products/category",
      },
    ],
  },
  {
    name: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState<string | null>( "Products");

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-gray-100 bg-white">

      {/* Logo */}
      <div className="h-25 border-b border-gray-100 flex-col items-center px-6 pt-6">
        <h3 className="text-xl font-bold">
          Admin
        </h3>

        <p>
          Admin panel
        </p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          // DROPDOWN MENU
          if (link.children) {
            const isOpen = openMenu === link.name;

            return (
              <div key={link.name}>
                
                {/* Parent Button */}
                <button
                  onClick={() =>
                    setOpenMenu(
                      isOpen ? null : link.name
                    )
                  }
                  className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-gray-600 hover:bg-gray-100 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} />

                    <span className="font-medium">
                      {link.name}
                    </span>
                  </div>

                  {isOpen ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                </button>

                {/* Dropdown Items */}
                {isOpen && (
                  <div className="mt-2 ml-6 space-y-1">
                    {link.children.map((child) => {
                      const isActive =
                        pathname === child.href;

                      return (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`block rounded-lg px-4 py-2 text-sm transition-all
                            ${
                              isActive
                                ? "bg-orange-300 text-black"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                          {child.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          // NORMAL LINKS
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href!}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all
                ${
                  isActive
                    ? "bg-orange-300 text-black"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <Icon size={20} />

              <span className="font-medium">
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}