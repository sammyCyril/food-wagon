"use client";

import { Bell, Menu, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Button from "../ui/Button";
import { customers } from "./customers/data";
import { initialCategories } from "./categories/CategoriesGrid";
import { useAuth } from "@/data/context/AuthContext";
import { useOrdersCount } from "./orders/useOrdersCount";
import { useProductsCount } from "./products/productCount";
import NotificationDropdown from "./NotificationDropdown";
import { useNotifications } from "@/data/context/admin/NotificationContext";

type AdminNavbarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AdminNavbar({
  sidebarOpen,
  setSidebarOpen,
}: AdminNavbarProps) {
  
  const pathname = usePathname();
  const router = useRouter();

  const { user, logout } = useAuth();
  const { count } = useOrdersCount();
  const { countt } = useProductsCount();
  const { unreadCount, notifications } = useNotifications();

  const [openNotifications, setOpenNotifications] = useState(false);

  const fullName = user
    ? `${user.firstName} ${user.lastName}`
    : "Admin";

  const initials = user
    ? `${user.firstName[0]}${user.lastName[0]}`
    : "A";

  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const pageData = {
    "/admin": {
      title: "Dashboard",
      subtitle: date,
      buttonText: "",
    },

    "/admin/orders": {
      title: "Orders",
      subtitle: `${count} orders scheduled`,
      buttonText: "",
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

    const notificationRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(
        event.target as Node
      )
    ) {
      setOpenNotifications(false);
    }
  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 md:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <Menu
          size={24}
          className="cursor-pointer md:hidden"
          onClick={() => setSidebarOpen(true)}
        />

        <div>
          <h2 className="text-xl font-bold md:text-2xl">
            {currentPage.title}
          </h2>

          <p className="hidden text-sm text-gray-500 sm:block">
            {currentPage.subtitle}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notification */}
        <div ref={notificationRef} className="relative">
          <Button
            variant="secondary"
            onClick={() =>
              setOpenNotifications((prev) => !prev)
            }
            className="relative !p-2 hover:bg-gray-100"
          >
            <Bell size={20} />

            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {unreadCount}
              </span>
            )}
          </Button>

          {openNotifications && (
            <NotificationDropdown
              notifications={notifications}
            />
          )}
        </div>

        {/* Dynamic Button */}
        {currentPage.buttonText && (
          <Button>
            <Plus size={20} />
            <span className="hidden sm:inline">
              {currentPage.buttonText}
            </span>
          </Button>
        )}

        {/* Profile */}
        <div className="hidden items-center gap-3 sm:flex">
          <Button
            variant="secondary"
            className="flex items-center gap-3 rounded-xl p-2 transition"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 bg-emerald-100 text-sm font-semibold text-emerald-700">
              {initials}
            </div>

            <div className="hidden text-left md:block">
              <p className="text-sm font-semibold text-gray-900">
                {fullName}
              </p>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}