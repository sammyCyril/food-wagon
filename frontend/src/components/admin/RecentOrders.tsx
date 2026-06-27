"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import OrderRow from "./orders/OrderRow";
import { Order } from "@/data/type";

type RecentOrdersProps = {
  orders: Order[];
  loading: boolean;
};

export default function RecentOrders({orders, loading,}:RecentOrdersProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white">

      {/* Header */}
      <div className="flex items-center justify-between p-3 px-5">
        <h2 className="text-xl font-bold">
          Recent Orders
        </h2>

        <Link href="/admin/orders"
          className="flex items-center gap-2 text-[14px] text-orange-600"
        >
          View all orders
          <ArrowRight size={13} />
        </Link>
      </div>

      <table className="w-full min-w-[700px]">

        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Order ID
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Customer
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Date
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Amount
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <tr
                key={index}
                className="border-b border-gray-100"
              >
                <td className="px-6 py-4">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                </td>

                <td className="px-6 py-4">
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                </td>

                <td className="px-6 py-4">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                </td>

                <td className="px-6 py-4">
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                </td>

                <td className="px-6 py-4">
                  <div className="h-8 w-28 animate-pulse rounded bg-gray-200" />
                </td>
              </tr>
            ))
          ) : orders.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-12 text-center text-gray-500"
              >
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <OrderRow
                key={order._id}
                orderId={order._id}
                customer={order.customerName}
                date={new Date(
                  order.createdAt
                ).toLocaleDateString()}
                amount={`₦${order.totalAmount.toLocaleString()}`}
                status={order.status}
                editable={false}
              />
            ))
          )}
        </tbody>

      </table>
    </div>
  );
}