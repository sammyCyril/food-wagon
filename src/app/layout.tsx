import type { Metadata } from "next";

import "./globals.css";

import Navbar from "@/components/layout/Navbar";

import { CartProvider } from "@/data/context/CartContext";
import { SearchProvider } from "@/data/context/SearchContext";
import { AuthProvider } from "@/data/context/AuthContext";

import { Toaster } from "sonner";
import Footer from "@/components/layout/Footer";
import { OrdersProvider } from "@/data/context/OrdersContext";

export const metadata: Metadata = {
  title: "Foodwagon",
  description: "Food ordering app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        <AuthProvider>
          <CartProvider>
            <SearchProvider>
              <OrdersProvider>
               
                  {children}
               
                <Toaster
                  position="top-center"
                  richColors
                />
                
              </OrdersProvider>
            </SearchProvider>
          </CartProvider>
        </AuthProvider>

      </body>
    </html>
  );
}
