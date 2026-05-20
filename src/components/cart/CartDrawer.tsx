"use client";

import { X } from "lucide-react";
import { useCart } from "@/data/context/CartContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: Props) {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const router = useRouter();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white z-50 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="font-semibold text-xl">Your Cart</h2>
          <button onClick={onClose} className="p-1">
            <X size={24} />
          </button>
        </div>

        {/* CART ITEMS */}
        <div className="p-5 space-y-5 overflow-y-auto h-[calc(100vh-180px)]">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 border-b pb-5 last:border-b-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-medium leading-tight">{item.name}</h3>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => {
                        decreaseQuantity(item._id);
                        toast.info("Quantity decreased");
                      }}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg"
                    >
                      −
                    </button>

                    <span className="font-semibold w-6 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => {
                        increaseQuantity(item._id);
                        toast.success("Quantity increased");
                      }}
                      className="w-8 h-8 rounded-full bg-orange-500 text-white hover:bg-orange-600 flex items-center justify-center text-lg"
                    >
                      +
                    </button>

                    <button
                      onClick={() => {
                        removeFromCart(item._id);
                        toast.error("Item removed");
                      }}
                      className="text-red-500 text-sm font-medium ml-auto hover:underline"
                    >
                      Remove
                    </button>
                  </div>

                  <p className="font-semibold mt-3">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {cart.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold">${total.toFixed(2)}</span>
            </div>

            <Button
              onClick={() => {
                onClose();
                router.push("/checkout");
              }}
              className="w-full py-6 text-base"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
}