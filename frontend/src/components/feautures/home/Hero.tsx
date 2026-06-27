
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { Bike, Lock, MapPin, Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-[#fbbf24] py-12 md:py-12 relative overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
          
          {/* LEFT CONTENT */}
          <div className="flex-2 md:flex-1 text-center lg:text-left max-w-[600px]">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              Are you starving?
            </h1>

            <p className="text-white text-lg md:text-xl mb-8">
              Within a few clicks, find meals that are accessible near you
            </p>

            {/* SEARCH BOX */}
            <div className="bg-white rounded-2xl p-6 shadow-xl mx-auto lg:mx-0 max-w-lg lg:max-w-[600px]">
              
              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                {/* <button className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-medium flex-1 justify-center">
                  <Bike size={20} />
                  Delivery
                </button> */}
                <Button variant="primary" className="flex items-center gap-2 flex-1 justify-center">
                  <Bike size={20} />
                  Delivery
                </Button>

                <Button variant="outline" className="flex items-center gap-2 flex-1 justify-center">
                  <Lock size={20} />
                  Pickup
                </Button>
              </div>

              {/* Input + Button */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text"
                    placeholder="Enter Your Address"
                    className="w-full border border-gray-200 rounded-xl pl-11 py-3.5 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <Button variant="primary" className="flex items-center justify-center gap-2 transition whitespace-nowrap">
                  <Search size={20} />
                  <span>Find Food</span>
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <img
              src="/pizza/pizza.jpg"
              alt="Delicious food"
              className="w-full max-w-[380px] md:max-w-[450px] lg:max-w-[420px] drop-shadow-2xl"
            />
          </div>

        </div>
      </Container>
    </section>
  );
}



// import Container from "@/components/Container";
// import { BikeIcon, Locate, Lock, MapPin, Search } from "lucide-react";

// export default function Hero() {
//   return (
//     <section className="bg-[#fbbf24] py-[50px] relative overflow-hidden">
//       <Container>
//         <div className="flex items-center">
          
//           {/* LEFT */}
//           <div className="max-w-[600px]">
//             <h1 className="text-[56px] font-bold text-white leading-tight mb-4">
//               Are you starving?
//             </h1>

//             <p className="text-white text-[16px] mb-6">
//               Within a few clicks, find meals that are accessible near you
//             </p>

//             {/* SEARCH BOX */}
//             <div className="bg-white rounded-xl p-5 w-full max-w-[600px] shadow">
              
//               <div className="flex gap-1 mb-4">
//                 <button className="flex gap-2 bg-orange-100 text-orange-500 px-2 py-1 rounded-xs text-sm">
//                   <BikeIcon size={18} className="text-orange-500" />
//                   <span>Delivery</span>
//                 </button>

//                 <div className="border-b border-black"></div>

//                 <button className="flex gap-2 px-2 py-1 rounded-xs  text-black font-bold text-sm">
//                    <Lock size={18} className="text-black" />
//                   <span>Pickup</span>
//                 </button>
//               </div>

//               <div className="flex gap-2">
//                 <input 
//                   placeholder=  "Enter Your Address"
//                   className="flex-1 border rounded-md px-3 py-2 text-sm"
//                 />

//                 <button className="flex gap-2 items-center bg-orange-500 text-white px-9 rounded-md text-sm">
//                   <Search size={18} className=""/>
//                   <span>Find Food</span>
//                 </button>
//               </div>

//             </div>
//           </div>

//         </div>
//       </Container>

//       {/* RIGHT IMAGE (absolute now) */}
//       <div className=" absolute bottom-0 top-9 right-9">
//         <img
//           src="/product_9.png"
//           alt="food"
//           className="w-[420px]"
//         />
//       </div>
//     </section>
//   );
// }