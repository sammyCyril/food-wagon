'use client';

import Container from "@/components/layout/Container";
import { MapPin, Search, Truck, User, Menu, X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button";
import { useCart } from "@/data/context/CartContext";
import CartDrawer from "../cart/CartDrawer";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
   const { cart } = useCart();

   const cartCount = cart.reduce(
     (total, item) => total + item.quantity,
     0
   );

  return (
    <>
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between h-16">

          {/* LEFT: Logo */}
          <div className="flex items-center gap-2">
            <Truck className="text-orange-500" size={26} />
            <h1 className="font-bold text-xl text-orange-500">foodwagon</h1>
          </div>

          {/* CENTER: Location */}
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
            <span className="font-bold">Deliver to:</span>
            <MapPin size={18} className="text-orange-500" />
            <span className="font-medium text-gray-700">Current Location</span>
            <span className="font-bold text-gray-700">
              Mohammadpur Bus Stand, Dhaka
            </span>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Search Button */}
            <Button 
              variant="outline" 
              className="flex items-center gap-2 text-sm border-none hover:bg-gray-100"
            >
              <Search size={20} />
              <span className="hidden sm:inline">Search Food</span>
            </Button>          

            {/* CART BUTTON */}
               <button
                 onClick={() => setIsCartOpen(true)}
                 className="relative flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition"
               >
                 <ShoppingCart size={22} />

                 <span className="hidden sm:inline">
                     Cart
                 </span>

                 {/* CART COUNT */}
                 <span className="absolute -top-2 -right-5 bg-orange-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                   {cartCount}
                 </span>
               </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-7 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

           {/* Login Button */}
            <Button 
              variant="secondary" 
              className="hidden md:flex items-center gap-2 text-sm transition whitespace-nowrap"
            >
              <User size={20} />
              <span>Login</span>
            </Button>

          </div>
        </div>

        {/* Mobile Menu - Improved with smooth transition */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t bg-white ${
            isMenuOpen ? "max-h-64 py-4" : "max-h-0 py-0"
          }`}
        >
          <div className="px-2 space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={18} className="text-orange-500" />
              <span>Deliver to: <strong>Mohammadpur Bus Stand, Dhaka</strong></span>
            </div>

            <Button className="w-full flex items-center justify-center gap-2">
              <User size={20} />
              Login
            </Button>
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






// 'use client';

// import Container from "@/components/layout/Container";
// import {
//   MapPin,
//   Search,
//   Truck,
//   User,
//   Menu,
//   X,
//   ShoppingCart,
// } from "lucide-react";

// import { useState } from "react";
// import Button from "../ui/Button";
// import { useCart } from "@/data/context/CartContext";
// import CartDrawer from "@/components/cart/CartDrawer";

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   const { cart } = useCart();

//   const cartCount = cart.reduce(
//     (total, item) => total + item.quantity,
//     0
//   );

//   return (
//     <>
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
//         <Container>
//           <div className="flex items-center justify-between h-16">

//             {/* LEFT: Logo */}
//             <div className="flex items-center gap-2">
//               <Truck className="text-orange-500" size={26} />

//               <h1 className="font-bold text-xl text-orange-500">
//                 foodwagon
//               </h1>
//             </div>

//             {/* CENTER: Location */}
//             <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
//               <span className="font-bold">
//                 Deliver to:
//               </span>

//               <MapPin
//                 size={18}
//                 className="text-orange-500"
//               />

//               <span className="font-medium text-gray-700">
//                 Current Location
//               </span>

//               <span className="font-bold text-gray-700">
//                 Mohammadpur Bus Stand, Dhaka
//               </span>
//             </div>

//             {/* RIGHT SIDE */}
//             <div className="flex items-center gap-3 md:gap-4">

//               {/* Search Button */}
//               <Button
//                 variant="outline"
//                 className="flex items-center gap-2 text-sm border-none"
//               >
//                 <Search size={20} />

//                 <span className="hidden sm:inline">
//                   Search Food
//                 </span>
//               </Button>

//               {/* CART BUTTON */}
//               <button
//                 onClick={() => setIsCartOpen(true)}
//                 className="relative flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition"
//               >
//                 <ShoppingCart size={22} />

//                 <span className="hidden sm:inline">
//                   Cart
//                 </span>

//                 {/* CART COUNT */}
//                 <span className="absolute -top-2 -right-5 bg-orange-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               </button>

//               {/* Login Button */}
//               <Button
//                 variant="secondary"
//                 className="hidden md:flex items-center gap-2 text-sm transition whitespace-nowrap"
//               >
//                 <User size={20} />
//                 <span>Login</span>
//               </Button>

//               {/* Mobile Menu Button */}
//               <button
//                 onClick={() =>
//                   setIsMenuOpen(!isMenuOpen)
//                 }
//                 className="md:hidden p-9 text-gray-700 hover:bg-gray-100 rounded-lg"
//               >
//                 {isMenuOpen ? (
//                   <X size={24} />
//                 ) : (
//                   <Menu size={24} />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* MOBILE MENU */}
//           {isMenuOpen && (
//             <div className="md:hidden border-t py-4 space-y-4 bg-white">

//               <div className="flex items-center gap-2 px-2 text-sm text-gray-600">
//                 <MapPin
//                   size={18}
//                   className="text-orange-500"
//                 />

//                 <span>
//                   Deliver to:
//                   <strong>
//                     {" "}
//                     Mohammadpur Bus Stand, Dhaka
//                   </strong>
//                 </span>
//               </div>

//               <button className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-xl font-medium">
//                 <User size={20} />
//                 Login
//               </button>
//             </div>
//           )}
//         </Container>
//       </header>

//       {/* CART DRAWER */}
//       <CartDrawer
//         isOpen={isCartOpen}
//         onClose={() => setIsCartOpen(false)}
//       />
//     </>
//   );
// }