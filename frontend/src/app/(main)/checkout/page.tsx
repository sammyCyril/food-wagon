"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { useCart } from "@/data/context/CartContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createOrder } from "@/services/orders";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/data/context/AuthContext";   // ← Import this

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();   // ← Get logged in user

  // Form States
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 5;
  const total = subtotal + deliveryFee;
  // Add this near your other states
const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  const handleOrder = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!phone || !email || !address || !city) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setIsPlacingOrder(true);

      await createOrder({
  phone,
  address: `${address}, ${city}${landmark ? `, ${landmark}` : ""}`,
  items: cart.map((item) => ({
    productId: item._id,
    name: item.name,
    image: item.image,
    quantity: item.quantity,
    price: item.price,
  })),
  totalAmount: total,
  paymentMethod,
});

      clearCart();
      toast.success("Order placed successfully! 🎉");
      router.push("/orders");

    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
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
    <ProtectedRoute>
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
                    value={fullName}
                    disabled
                    className="bg-gray-50"
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
                  
                    value={email}
                    disabled
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
              {/* Order Summary (same as before) */}
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              {/* ... your existing summary code ... */}

              <Button 
                className="w-full"
                isLoading={isPlacingOrder}
                onClick={handleOrder}
              >
                Place Order - ${total.toFixed(2)}
              </Button>
            </aside>
          </div>
        </Container>
      </main>
    </ProtectedRoute>
  );
}

