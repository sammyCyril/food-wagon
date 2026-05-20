"use client";

import { Bell, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Input from "../ui/Input";
import Button from "../ui/Button";
import { customers } from "./customers/data";
import { orders } from "./orders/OrdersTable";
import { productsData } from "./products/ProductsTable";
import { initialCategories } from "./categories/CategoriesGrid";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {

  const pathname = usePathname();

  const date = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const [open, setOpen] = useState(false);

  const router = useRouter();
  const handleLogout = () => {
  localStorage.removeItem("token");

  router.push("/login");
};

  // Dynamic page content
  const pageData = {
    "/admin": {
      title: "Dashboard",
      subtitle: date,
      buttonText: "New Order",
    },

    "/admin/orders": {
      title: "Orders",
      subtitle: `${orders.length} orders scheduled`,
      buttonText: "",
    },

    "/admin/products": {
      title: "Products",
      subtitle: `${productsData.length} available`,
      buttonText: "Add Product",
    },

    "/admin/products/category": {
      title: "Categories",
     subtitle: `${initialCategories.length} categories`,
      buttonText: "Add Category",
    },

    "/admin/customers": {
      title: "Customers",
      subtitle: `${customers.length} registered customers`,
      buttonText: "",
    },

    "/admin/settings": {
      title: "Settings",
      subtitle: "Manage your store settings",
      buttonText: "",
    },
  };

  const currentPage =
    pageData[pathname as keyof typeof pageData] ||
    pageData["/admin"];

  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between">

      {/* Left */}
      <div>
        <h2 className="text-2xl font-bold">
          {currentPage.title}
        </h2>

        <p className="text-sm text-gray-500">
          {currentPage.subtitle}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="hidden md:flex items-center">
          <Input
            type="text"
            placeholder="Search anything..."
          />
        </div>

        {/* Notification */}
        <Button
          variant="secondary"
          className="relative !p-2 hover:bg-gray-100"
        >
          <Bell size={20} />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        {/* Dynamic Button */}
        {currentPage.buttonText && (
          <Button>
            <Plus size={20} />
            {currentPage.buttonText}
          </Button>
        )}

        {/* Profile */}
        <div className="flex items-center gap-3">

          <div className="relative">

            <Button
              variant="secondary"
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-gray-100"
            >

              {/* Avatar */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 bg-emerald-100 text-sm font-semibold text-emerald-700">
                AS
              </div>

              {/* User Info */}
              <div className="hidden text-left md:block">

                <p className="text-sm font-semibold text-gray-900">
                  Arjun Sharma
                </p>

                <p className="text-xs text-gray-500">
                  Store Manager
                </p>

              </div>

            </Button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-gray-50 bg-white p-2 shadow-lg">

                <button className="w-full rounded-xl px-4 py-3 text-left text-sm hover:bg-gray-100">
                  Profile
                </button>

                <button className="w-full rounded-xl px-4 py-3 text-left text-sm hover:bg-gray-100">
                  Settings
                </button>

               <button
                  onClick={handleLogout}
                  className="w-full rounded-xl px-4 py-3 text-left text-sm text-red-500 hover:bg-red-50"
                >
                  Logout
               </button>

              </div>
            )}

          </div>

        </div>

      </div>

    </header>
  );
}