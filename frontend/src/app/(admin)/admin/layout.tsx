"use client";

import { useState } from "react";

import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import OfflineMessage from "@/components/admin/OfflineMessage";
import { NotificationProvider } from "@/data/context/admin/NotificationContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <OfflineMessage />

      <NotificationProvider>
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex-1 min-w-0 md:ml-20 lg:ml-64">
          <AdminNavbar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <main className="p-4 md:p-6">
            {children}
          </main>
        </div>
      </NotificationProvider>
    </div>
  );
}