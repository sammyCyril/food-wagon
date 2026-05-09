'use client';

import Container from "@/components/layout/Container";
import {
  MapPin,
  Search,
  Truck,
  User,
  Menu,
  X,
  ShoppingCart
} from "lucide-react";

import { useState } from "react";
import Button from "../ui/Button";
import { useCart } from "@/data/context/CartContext";
import CartDrawer from "../cart/CartDrawer";
import { useSearch } from "@/data/context/SearchContext";
import { useAuth } from "@/data/context/AuthContext";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const { cart } = useCart();
  const { search, setSearch } = useSearch();
  const { user, logout } = useAuth();

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <Container>
          <div className="flex items-center justify-between h-16">

            {/* LEFT */}
            <Link href="/">
               <div className="flex items-center gap-2">
              <Truck className="text-orange-500" size={26} />
              <h1 className="font-bold text-[17px] text-orange-500 mr-4">
                foodwagon
              </h1>
            </div>
            </Link>

            {/* CENTER */}
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <span className="font-bold">Deliver to:</span>
              <MapPin size={18} className="text-orange-500" />
              <span className="font-medium text-gray-700">
                Current Location
              </span>
              <span className="font-bold text-gray-700">
                Mohammadpur Bus Stand, Dhaka
              </span>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3 md:gap-4">

              {/* SEARCH */}
              <div className="hidden md:flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-orange-400 transition">
              <Search size={18} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search food..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent outline-none text-sm w-[160px] text-gray-700 placeholder:text-gray-400"
                />
              </div>

              {/* CART */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black"
              >
                <ShoppingCart size={18} />
                <span className="hidden sm:inline"></span>
                <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </button>

              {/* MOBILE MENU BTN */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* DESKTOP AUTH */}
              {user ? (
                <div className="relative hidden md:block">
                  <Button
                    variant="secondary"
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 text-sm"
                  >
                    <User size={20} className="text-black"/>
                    <span className="hidden sm:inline">
                      {user.name}
                    </span>
                  </Button>

                  {open && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl  shadow-lg overflow-hidden z-50">
                      <div className="px-4 py-3 border-b">
                        <p className="text-sm font-medium">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user.email}
                        </p>
                      </div>

                      <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        Profile
                      </button>

                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login">
                  <Button
                    variant="secondary"
                    className="hidden md:flex items-center gap-2 text-sm ml-3"
                  >
                    <User size={20} className="text-black"/>
                    <span>Login</span>
                  </Button>
                </Link>
              )}

            </div>
          </div>

          {/* MOBILE MENU */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 border-t bg-white ${
              isMenuOpen ? "max-h-96 py-4" : "max-h-0 py-0"
            }`}
          >
            <div className="px-2 space-y-4">

              {/* LOCATION */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={18} className="text-orange-500" />
                <span>
                  Deliver to: <strong>Mohammadpur Bus Stand, Dhaka</strong>
                </span>
              </div>

              {/* AUTH MOBILE */}
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <User size={18} />
                    <span>{user.name}</span>
                  </div>

                  <Button
                    onClick={logout}
                    className="w-full"
                    variant="secondary"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button className="w-full flex items-center justify-center gap-2">
                    <User size={20} />
                    Login
                  </Button>
                </Link>
              )}

            </div>
          </div>
        </Container>
      </header>

      {/* CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}