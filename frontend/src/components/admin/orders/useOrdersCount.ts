"use client";

import { useEffect, useState } from "react";
import { getAllOrders } from "@/services/orders";

export const useOrdersCount = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const orders = await getAllOrders();
        setCount(orders.length);
      } catch (error) {
        console.log( error);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };
 
    fetchCount();
  }, []);

  return { count, loading };
};