"use client";

import Link from "next/link";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center py-10">

      <Container>

        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-sm p-10 text-center">

          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle2
                size={60}
                className="text-green-600"
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold">
            Order Successful 🎉
          </h1>

          <p className="text-gray-500 mt-4">
            Your order has been placed successfully.
          </p>

          <p className="text-gray-500 mt-2">
            Estimated delivery time: 20 - 30 mins
          </p>

          <Link href="/">
            <Button
              className="mt-8 w-full"
              variant="primary"
            >
              Continue Shopping
            </Button>
          </Link>

        </div>

      </Container>

    </main>
  );
}