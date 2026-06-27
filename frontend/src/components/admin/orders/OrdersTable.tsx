"use client";

import { useEffect, useState } from "react";

import Input from "../../ui/Input";
import OrderRow from "./OrderRow";
import OrderStatusCard from "./OrderStatusCard";

import {
  getAllOrders,
  updateOrderStatus,
} from "@/services/orders";

import { Order } from "@/data/type";
import { useNotifications } from "@/data/context/admin/NotificationContext";
import Pagination from "@/components/ui/Pagination";

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

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState<
      | "All Orders"
      | "Pending"
      | "Processing"
      | "Delivered"
      | "Cancelled"
    >("All Orders");

  const { refreshNotifications } =
    useNotifications();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data =
          await getAllOrders();

        setOrders(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (
    id: string,
    status: string
  ) => {
    try {
      await updateOrderStatus(
        id,
        status
      );



      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? {
              ...order,
              status: status as
                | "Pending"
                | "Processing"
                | "Delivered"
                | "Cancelled",
            }
            : order
        )
      );
      await refreshNotifications();
    } catch (error) {
      console.log(error);
    }
  };

   // Pagination
const [currentPage, setCurrentPage] = useState(1);

const itemsPerPage = 5;

useEffect(() => {
  setCurrentPage(1);
}, [search,  activeTab]);

  const filteredOrders =
    orders.filter((order) => {
      const matchesSearch =
        (order.customerName || "")
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        order._id
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesTab =
        activeTab === "All Orders"
          ? true
          : order.status ===
          activeTab;

      return (
        matchesSearch &&
        matchesTab
      );
    });

    const startIndex =
  (currentPage - 1) * itemsPerPage;

const currentOrders =
  filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );


    

  return (
    <>
      <div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <OrderStatusCard
            title="Pending"
            value={
              orders.filter(
                (order) =>
                  order.status ===
                  "Pending"
              ).length
            }
            color="yellow"
          />

          <OrderStatusCard
            title="Processing"
            value={
              orders.filter(
                (order) =>
                  order.status ===
                  "Processing"
              ).length
            }
            color="blue"
          />

          <OrderStatusCard
            title="Delivered"
            value={
              orders.filter(
                (order) =>
                  order.status ===
                  "Delivered"
              ).length
            }
            color="green"
          />

          <OrderStatusCard
            title="Cancelled"
            value={
              orders.filter(
                (order) =>
                  order.status ===
                  "Cancelled"
              ).length
            }
            color="red"
          />

        </div>
      </div>

      <div className="min-h-[500px] overflow-x-auto rounded-2xl border border-gray-100 bg-white transition-all">

        <div className="flex flex-col items-start gap-4 px-4 py-4 lg:flex-row lg:items-center">

          <div className="relative max-w-md flex-1">
            <Input
              placeholder="Search orders..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />
          </div>

          <div className="flex gap-1 rounded-2xl bg-gray-100 p-1.5">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  setActiveTab(tab)
                }
                className={`rounded-xl px-6 py-2.5 text-sm font-medium transition-all ${activeTab === tab
                    ? "bg-white shadow-sm"
                    : "hover:bg-white hover:shadow-sm"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

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
              Array.from({
                length: 6,
              }).map((_, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100"
                >
                  <td className="px-6 py-4">
                    <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
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
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-gray-500"
                >
                  No orders found
                </td>
              </tr>
            ) : (
              currentOrders.map(
                (order) => (
                  <OrderRow
                    key={order._id}
                    orderId={order._id}
                    customer={
                      order.customerName
                    }
                    date={new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                    amount={`₦${order.totalAmount}`}
                    status={
                      order.status
                    }
                    editable={true}
                    onStatusChange={(
                      newStatus
                    ) =>
                      handleStatusChange(
                        order._id,
                        newStatus
                      )
                    }
                  />
                )
              )
            )}

          </tbody>

        </table>

         <Pagination
                currentPage={currentPage}
                totalItems={filteredOrders.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
         />

      </div>
    </>
  );
}