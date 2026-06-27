"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Container from "@/components/layout/Container";
import OrderTimeline from "@/components/orders/OrderTimeline";
import Button from "@/components/ui/Button";
import { Order, statusStyles } from "@/data/type";
import { getOrders } from "@/services/orders";
import { Package } from "lucide-react";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  const visibleOrders = orders.slice(0, visibleCount);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <ProtectedRoute>
      <section className="py-10 bg-gray-50 min-h-screen">
        <Container>
          <div className="mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold tracking-tight">
                  My Orders
                </h1>

                <p className="text-gray-500 mt-2">
                  Track and manage your orders
                </p>
              </div>

              <div className="text-sm text-gray-500">
                {orders.length} {orders.length === 1 ? "order" : "orders"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="bg-white rounded-2xl p-5 ">
              <p className="text-sm text-gray-500">Total Orders</p>
              <h3 className="text-3xl font-bold mt-2">
                {orders.length}
              </h3>
            </div>

            <div className="bg-white rounded-2xl p-5 ">
              <p className="text-sm text-gray-500">Pending</p>
              <h3 className="text-3xl font-bold mt-2 text-yellow-600">
                {pendingOrders}
              </h3>
            </div>

            <div className="bg-white rounded-2xl p-5">
              <p className="text-sm text-gray-500">Processing</p>
              <h3 className="text-3xl font-bold mt-2 text-blue-600">
                {processingOrders}
              </h3>
            </div>

            <div className="bg-white rounded-2xl p-5 ">
              <p className="text-sm text-gray-500">Delivered</p>
              <h3 className="text-3xl font-bold mt-2 text-green-600">
                {deliveredOrders}
              </h3>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center max-w-md mx-auto">
              <Package className="w-16 h-16 mx-auto text-gray-300 mb-6" />

              <h2 className="text-2xl font-semibold mb-3">
                No orders yet
              </h2>

              <p className="text-gray-500">
                When you place an order, they will show up here.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {visibleOrders.map((order) => {
                  const firstItem = order.items[0];

                  return (
                    <div
                      key={order._id}
                      className="group bg-white rounded-2xl p-4 md:p-5 hover:shadow-md hover:border-orange-200 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <img
                          src={firstItem?.image}
                          alt={firstItem?.name}
                          className="w-20 h-20 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">
                            {firstItem?.name}
                          </h3>

                          {order.items.length > 1 && (
                            <p className="text-sm text-gray-500">
                              +{order.items.length - 1} more item
                              {order.items.length > 2 ? "s" : ""}
                            </p>
                          )}

                          <p className="text-sm text-gray-500 mt-2">
                            Order #{order._id.slice(0, 8)}
                          </p>

                          <p className="text-sm text-gray-500">
                            {new Date(
                              order.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        <div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[order.status]}`}
                          >
                            {order.status}
                          </span>
                        </div>

                        <div className="md:text-right">
                          <p className="text-sm text-gray-500">
                            Total
                          </p>

                          <p className="text-2xl font-bold">
                            ${order.totalAmount.toFixed(2)}
                          </p>

                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-orange-600 text-sm font-medium hover:underline mt-2"
                          >
                            View Details →
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {orders.length > visibleCount && (
                <div className="flex justify-center mt-8">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setVisibleCount((prev) => prev + 5)
                    }
                  >
                    Load More Orders
                  </Button>
                </div>
              )}
            </>
          )}

          {selectedOrder && (
            <div
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedOrder(null)}
            >
              <div
                className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">
                      Order Details
                    </h2>

                    <p className="text-gray-500">
                      #{selectedOrder._id.slice(0, 8)}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-2xl text-gray-500"
                  >
                    ×
                  </button>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[selectedOrder.status]}`}
                >
                  {selectedOrder.status}
                </span>

                <div className="mt-6 border-t pt-6">
                  <h3 className="font-semibold mb-4">
                    Order Tracking
                  </h3>

                  <OrderTimeline
                    status={selectedOrder.status}
                  />
                </div>

                <div className="mt-6 space-y-4">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />

                      <div className="flex-1">
                        <h4 className="font-medium">
                          {item.name}
                        </h4>

                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold">
                        $
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t pt-6">
                  <h3 className="font-semibold mb-2">
                    Delivery Information
                  </h3>

                  <p>{selectedOrder.customerName}</p>
                  <p>{selectedOrder.phone}</p>
                  <p>{selectedOrder.address}</p>
                </div>

                <div className="mt-6 border-t pt-6">
                  <h3 className="font-semibold mb-2">
                    Payment Method
                  </h3>

                  <p className="capitalize">
                    {selectedOrder.paymentMethod}
                  </p>
                </div>

                <div className="mt-6 border-t pt-6 flex items-center justify-between">
                  <span className="font-medium">
                    Total Amount
                  </span>

                  <span className="text-2xl font-bold">
                    ${selectedOrder.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    </ProtectedRoute>
  );
}