import type { Metadata } from "next";

import "./globals.css";

import Navbar from "@/components/layout/Navbar";

import { CartProvider } from "@/data/context/CartContext";
import { SearchProvider } from "@/data/context/SearchContext";
import { AuthProvider } from "@/data/context/AuthContext";

import { Toaster } from "sonner";
import Footer from "@/components/layout/Footer";

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

              <Navbar />

              <main>
                {children}
              </main>

              <Toaster
                position="top-right"
                richColors
              />

              <Footer />

            </SearchProvider>
          </CartProvider>
        </AuthProvider>

      </body>
    </html>
  );
}