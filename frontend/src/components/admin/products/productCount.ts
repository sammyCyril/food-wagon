"use client";

import { useEffect, useState } from "react";
import { getItems } from "@/services/items";

export const useProductsCount = () => {
  const [countt, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const products = await getItems();
        setCount(products.length);
      } catch (error) {
        console.log(error)
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  return { countt, loading };
};