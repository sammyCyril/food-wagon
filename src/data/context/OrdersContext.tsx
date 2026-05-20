"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type OrderItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  address: string;
  phone: string;
  paymentMethod: "cash" | "card";
  status: "pending" | "processing" | "delivered";
  createdAt: string;
};

type OrdersContextType = {
  orders: Order[];

  addOrder: (
    order: Omit<
      Order,
      "id" | "status" | "createdAt"
    >
  ) => void;
};

const OrdersContext =  createContext<OrdersContextType | null>(null);

export function OrdersProvider({  children,}: {  children: ReactNode;}) {

  // LOAD FROM LOCALSTORAGE IMMEDIATELY
  const [orders, setOrders] = useState<Order[]>(() => {

    if (typeof window !== "undefined") {

      const savedOrders =
        localStorage.getItem("orders");

      return savedOrders
        ? JSON.parse(savedOrders)
        : [];
    }

    return [];
  });

  // SAVE TO LOCALSTORAGE
  useEffect(() => {

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

  }, [orders]);

  // ADD ORDER
  const addOrder = (
    orderData: Omit<
      Order,
      "id" | "status" | "createdAt"
    >
  ) => {

    const newOrder: Order = {
      ...orderData,
      id: crypto.randomUUID(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [
      newOrder,
      ...prev,
    ]);
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {

  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error(
      "useOrders must be used within OrdersProvider"
    );
  }

  return context;
}