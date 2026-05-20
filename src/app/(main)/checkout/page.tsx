"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { useCart } from "@/data/context/CartContext";
import { useOrders } from "@/data/context/OrdersContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { addOrder } = useOrders();

  // Form States
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 5;
  const total = subtotal + deliveryFee;

const handleOrder = async () => {
  if (cart.length === 0) {
    toast.error("Your cart is empty");
    return;
  }

  if (!fullName || !phone || !email || !address || !city) {
    toast.error("Please fill all required fields");
    return;
  }

  try {
    setIsPlacingOrder(true);

    // Fake API delay
    await new Promise((res) =>
      setTimeout(res, 2000)
    );

    addOrder({
      items: cart,
      total,
      address: `${address}, ${city}${
        landmark ? `, ${landmark}` : ""
      }`,
      phone,
      paymentMethod,
    });

    clearCart();

    toast.success("Order placed successfully! 🎉");

    router.push("/orders");

  } catch (error) {
    toast.error("Something went wrong");
  } finally {
    setIsPlacingOrder(false);
  }
};

  // Empty Cart
  if (cart.length === 0) {
    return (
      <main className="py-20 bg-gray-50 min-h-screen">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-500 mb-8">Add some items before checking out.</p>
            <Button onClick={() => router.push("/")}>Browse Menu</Button>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="py-10 bg-gray-50 min-h-screen">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-gray-500 mt-2">Complete your order details</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT SIDE - FORM */}
          <section className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm space-y-8">
            {/* Customer Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <Input
                  label="Phone Number"
                  placeholder="+234..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
              <div className="space-y-4">
                <Input
                  label="Street Address"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="City"
                    placeholder="Lagos"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                  <Input
                    label="Landmark (Optional)"
                    placeholder="Near..."
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:border-orange-500 transition">
                  <input
                    type="radio"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                  />
                  <span>Cash on Delivery</span>
                </label>

                <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:border-orange-500 transition">
                  <input
                    type="radio"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  <span>Card Payment</span>
                </label>
              </div>
            </div>
          </section>

          {/* RIGHT SIDE - SUMMARY */}
          <aside className="bg-white rounded-2xl p-6 shadow-sm h-fit sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4 border-b pb-4">
              {cart.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 py-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-3 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full"
            isLoading={isPlacingOrder}
             onClick={handleOrder}>
              
              Place Order - ${total.toFixed(2)}
            </Button>
          </aside>
        </div>
      </Container>
    </main>
  );
}