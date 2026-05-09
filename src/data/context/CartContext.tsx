"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Item } from "@/data/type";

type CartItem = Item & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Item) => void;
  increaseQuantity: (_id: string) => void;
  decreaseQuantity: (_id: string) => void;
  removeFromCart: (_id: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({children,}: {children: React.ReactNode;}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
}, [cart]);

useEffect(() => {
  const savedCart =
    localStorage.getItem("cart");

  if (savedCart) {
    setCart(JSON.parse(savedCart));
  }
}, []);


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

  const increaseQuantity = (_id: string) => {
  setCart((prev) =>
    prev.map((item) =>
      item._id === _id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    )
  );
};

const decreaseQuantity = (_id: string) => {
  setCart((prev) =>
    prev
      .map((item) =>
        item._id === _id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

const removeFromCart = (_id: string) => {
  setCart((prev) =>
    prev.filter((item) => item._id !== _id)
  );
};

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart }}>
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