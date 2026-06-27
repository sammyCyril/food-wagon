"use client";

import { useEffect, useState } from "react";

import RecentOrders from "@/components/admin/RecentOrders";
import SalesChart from "@/components/admin/SalesChart";
import StatCard from "@/components/admin/StatCard";
import AdminStatCardSkeleton from "@/components/admin/skeleton/AdminStatCardSkeleton";

import { getAllOrders } from "@/services/orders";
import { getAllProducts } from "@/services/products";
import { Order } from "@/data/type";

type Product = {
  _id: string;
  stock: number;
  status: "Active" | "Low Stock" | "Out Of Stock";
};

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const ordersData = await getAllOrders();
        const productsData = await getAllProducts();

        setOrders(ordersData);
        setProducts(productsData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  const totalOrders = orders.length;

  const totalProducts = products.length;

  const lowStockProducts = products.filter(
    (product) => product.status === "Low Stock"
  ).length;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData = months.map((month) => ({
    name: month,
    sales: 0,
  }));

  orders.forEach((order) => {
  if (order.status !== "Delivered")
    return;

  const month = new Date(
    order.createdAt
  ).toLocaleString("en-US", {
    month: "short",
  });

  const monthData = chartData.find(
    (item) => item.name === month
  );

  if (monthData) {
    monthData.sales +=
      order.totalAmount;
  }
});

  return (
    <div className="space-y-6">
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <AdminStatCardSkeleton key={index} />
          ))
        ) : (
          <>
            <StatCard
              title="Revenue"
              value={`₦${totalRevenue.toLocaleString()}`}
              change={`${totalOrders} Orders`}
              loading={loading}
            />

            <StatCard
              title="Orders"
              value={String(totalOrders)}
              change={`${
                orders.filter(
                  (order) =>
                    order.status === "Pending"
                ).length
              } Pending`}
              loading={loading}
            />

            <StatCard
              title="Low Stock"
              value={String(totalProducts)}
              change={`${lowStockProducts} Low Stock`}
              loading={loading}
            />

            <StatCard
              title="Delivered"
              value={String(
                orders.filter(
                  (order) =>
                    order.status === "Delivered"
                ).length
              )}
              change="Completed Orders"
              loading={loading}
            />
          </>
        )}
      </section>

      <SalesChart data={chartData} />

      <RecentOrders
       orders={orders.slice(0, 3)}
       loading={loading}
        />
    </div>
  );
}