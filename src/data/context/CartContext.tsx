"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
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
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

const CART_KEY = "cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // ✅ LOAD CART ON FIRST CLIENT MOUNT
  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY);

    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch {
        setCart([]);
      }
    }

    setHydrated(true);
  }, []);

  // ✅ SAVE ONLY AFTER HYDRATION
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  const addToCart = (item: Item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p._id === item._id);

      if (exists) {
        return prev.map((p) =>
          p._id === item._id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const increaseQuantity = (_id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === _id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (_id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === _id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (_id: string) => {
    setCart((prev) => prev.filter((item) => item._id !== _id));
  };

  const clearCart = () => {
  setCart([]);
};

  // ✅ IMPORTANT: prevent UI flash of empty cart
  if (!hydrated) return null;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) throw new Error("useCart must be used inside CartProvider");

  return context;
};