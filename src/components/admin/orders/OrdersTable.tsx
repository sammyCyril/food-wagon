"use client";

import { useState } from "react";

import Input from "../../ui/Input";
import OrderRow from "./OrderRow";
import OrderStatusCard from "./OrderStatusCard";

export const orders = [
  {
    orderId: "#1024",
    customer: "John Doe",
    date: "May 15, 2026",
    amount: "$120",
    status: "Pending",
  },

  {
    orderId: "#1025",
    customer: "Sarah Smith",
    date: "May 14, 2026",
    amount: "$80",
    status: "Delivered",
  },

  {
    orderId: "#1026",
    customer: "Michael Johnson",
    date: "May 13, 2026",
    amount: "$240",
    status: "Processing",
  },

  {
    orderId: "#1027",
    customer: "Emma Brown",
    date: "May 12, 2026",
    amount: "$65",
    status: "Cancelled",
  },
] as const;

const tabs = [
  "All Orders",
  "Pending",
  "Processing",
  "Delivered",
  "Cancelled",
] as const;

export default function OrdersTable() {

  const [search, setSearch] =
    useState("");

  const [activeTab, setActiveTab] =
    useState<
      | "All Orders"
      | "Pending"
      | "Processing"
      | "Delivered"
      | "Cancelled"
    >("All Orders");

  // ─── Filter Orders ────────────────────────────────

  const filteredOrders =
    orders.filter((order) => {

      const matchesSearch =
        order.customer
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        order.orderId
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesTab =
        activeTab === "All Orders"
          ? true
          : order.status === activeTab;

      return (
        matchesSearch &&
        matchesTab
      );

    });

  return (

    <>
    <div>
        {/* Status Cards */}
<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

  <OrderStatusCard
    title="Pending"
    value={
      orders.filter(
        (order) =>
          order.status === "Pending"
      ).length
    }
    color="yellow"
  />

  <OrderStatusCard
    title="Processing"
    value={
      orders.filter(
        (order) =>
          order.status === "Processing"
      ).length
    }
    color="blue"
  />

  <OrderStatusCard
    title="Delivered"
    value={
      orders.filter(
        (order) =>
          order.status === "Delivered"
      ).length
    }
    color="green"
  />

  <OrderStatusCard
    title="Cancelled"
    value={
      orders.filter(
        (order) =>
          order.status === "Cancelled"
      ).length
    }
    color="red"
  />

</div>
    </div>

    <div className="min-h-[500px] overflow-x-auto rounded-2xl border border-gray-100 bg-white transition-all">

      

      {/* Top */}
      <div className="flex flex-col items-start gap-4 px-4 py-4 lg:flex-row lg:items-center">

        

        {/* Search */}
        <div className="relative flex-1 max-w-md">

          <Input
            placeholder="Search orders..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-2xl bg-gray-100 p-1.5">

          {tabs.map((tab) => (

            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab)
              }
              className={`rounded-xl px-6 py-2.5 text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-white shadow-sm"
                  : "hover:bg-white hover:shadow-sm"
              }`}
            >

              {tab}

            </button>

          ))}

        </div>

      </div>

      {/* Table */}
      <table className="min-w-[700px] w-full">

        {/* Head */}
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

        {/* Body */}
        <tbody>

          {filteredOrders.length === 0 ? (

            <tr>

              <td
                colSpan={5}
                className="py-10 text-center text-gray-500"
              >
                No orders found
              </td>

            </tr>

          ) : (

            filteredOrders.map((order) => (

              <OrderRow
                key={order.orderId}
                orderId={order.orderId}
                customer={order.customer}
                date={order.date}
                amount={order.amount}
                status={order.status}
              />

            ))

          )}

        </tbody>

      </table>

    </div>
    </>
  );
}