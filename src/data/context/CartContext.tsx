"use client";

import { createContext, useContext, useState } from "react";
import { Item } from "@/data/type";

type CartItem = Item & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Item) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({children,}: {children: React.ReactNode;}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Item) => {
    console.log(cart);
    setCart((prev) => {
      const existingItem = prev.find(
        (cartItem) => item._id === cartItem._id
      );

      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem._id === item._id
            ? {
                ...cartItem ,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};