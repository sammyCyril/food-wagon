"use client";

import { X } from "lucide-react";
import { useCart } from "@/data/context/CartContext";
import { toast } from "sonner";

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

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-screen w-full sm:w-[350px] bg-white z-50 shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg">
            Your Cart
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* ITEMS */}
        <div className="p-4 space-y-4 overflow-y-auto h-[80vh]">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex gap-3 border-b pb-3"
              >
                <img
                  src={item.image}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-medium">
                    {item.name}
                  </h3>

                  {/* CONTROLS */}
                  <div className="flex items-center gap-3 mt-2">

                    <button
                      onClick={() => {
                        decreaseQuantity(item._id);
                        toast.info("Quantity decreased");
                      }}
                      className="w-7 h-7 rounded-full bg-gray-200"
                    >
                      -
                    </button>

                    <span className="font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => {
                        increaseQuantity(item._id);
                        toast.success("Quantity increased");
                      }}
                      className="w-7 h-7 rounded-full bg-orange-500 text-black"
                    >
                      +
                    </button>

                    <button
                      onClick={() => {
                        removeFromCart(item._id);
                        toast.error("Item removed from cart");
                      }}
                      className="text-red-500 text-sm mt-2 pl-15"
                    >
                      remove
                    </button>

                  </div>

                  <p className="font-semibold">
                    $
                    {(
                      item.price * item.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="absolute bottom-0 left-0 w-full border-t p-4 bg-white">
          <div className="flex justify-between font-semibold mb-4">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className="w-full bg-orange-500 text-black py-3 rounded-lg">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}