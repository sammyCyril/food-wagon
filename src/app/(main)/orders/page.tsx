"use client";

import Container from "@/components/layout/Container";
import { useOrders } from "@/data/context/OrdersContext";
import { Package, Clock, CheckCircle } from "lucide-react";

export default function OrdersPage() {
  const { orders } = useOrders();

  return (
    <section className="py-10 bg-gray-50 min-h-screen">
      <Container>
        <div className="">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-4xl font-bold tracking-tight">My Orders</h1>
            <p className="text-gray-500 mt-1">
              {orders.length} {orders.length === 1 ? "order" : "orders"}
            </p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center max-w-md mx-auto">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-semibold mb-3">No orders yet</h2>
            <p className="text-gray-500">
              When you place an order, they will show up here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:gap-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                {/* Order Header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center">
                      <Package className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">
                        Order #{order.id?.slice(0, 8)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium ${
                      order.status === "delivered"
                        ? "bg-emerald-100 text-emerald-700"
                        : order.status === "processing"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {order.status === "delivered" ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                    <span className="capitalize">{order.status}</span>
                  </div>
                </div>

                {/* Items */}
                <div className="px-6 py-6 space-y-5">
                  {order.items.slice(0, 3).map((item) => (
                    <div key={item._id} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-2xl object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}

                  {order.items.length > 3 && (
                    <p className="text-sm text-gray-500 text-center pt-2">
                      +{order.items.length - 3} more items
                    </p>
                  )}
                </div>

                {/* Total Footer */}
                <div className="bg-gray-50 px-6 py-5 flex items-center justify-between border-t">
                  <span className="text-gray-600 font-medium">Total Amount</span>
                  <span className="text-2xl font-bold">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}