import type { Metadata } from "next";

import "./globals.css";



import { CartProvider } from "@/data/context/CartContext";
import { SearchProvider } from "@/data/context/SearchContext";
import { AuthProvider } from "@/data/context/AuthContext";

import { Toaster } from "sonner";



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
              
               
                  {children}
               
                <Toaster
                  position="top-center"
                  richColors
                />
                
              
            </SearchProvider>
          </CartProvider>
        </AuthProvider>

      </body>
    </html>
  );
}
