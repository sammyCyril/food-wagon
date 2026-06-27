"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowRight, ChevronLeft, ChevronRight, MapPin,} from "lucide-react";

import Container from "@/components/layout/Container";
// import { getItems } from "@/data/foods";

import Button from "@/components/ui/Button";
import { Item } from "@/data/type";
import FoodCardSkeleton from "@/components/ui/FoodCardSkeleton";

import { useCart } from "@/data/context/CartContext";
import { useSearch } from "@/data/context/SearchContext";
import PopularItemSkeleton from "@/components/ui/PopularItemSkeleton";
import { toast } from "sonner";
import Link from "next/link";
import { getItems } from "@/services/items";

export default function PopularItems() {

  const [items, setItems] = useState<Item[]>([]);

  const [loading, setLoading] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  const { addToCart } = useCart();

  const { search } = useSearch();

  // FILTER ITEMS
 // FILTER ITEMS
      const filteredItems = items.filter((item) => {
      const matchesName = item.name
     .toLowerCase()
     .includes(search.toLowerCase());

  const matchesPlace = item.place
    .toLowerCase()
    .includes(search.toLowerCase());

  return matchesName || matchesPlace;
});

  // FETCH ITEMS
  useEffect(() => {

    const fetchItems = async () => {

      try {
        
      const data = await getItems();

      setItems(data);

      } catch(error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchItems();

  }, []);

if (loading) {
  return (
    <section className="bg-white py-[70px]">

      <Container>

        <h2 className="text-center text-[22px] font-semibold mb-10">
          Popular items
        </h2>

        <PopularItemSkeleton />

      </Container>
    </section>
  );
}

  // SCROLL FUNCTION
  const scroll = (
    direction: "left" | "right"
  ) => {

    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left:
        direction === "left"
          ? -300
          : 300,

      behavior: "smooth",
    });
  };

   return (
  <section className="py-[70px] bg-white -mb-19">
    <Container>
      {/* TITLE */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-[22px] font-semibold">Popular items</h2>

        <Link href="/popular">
          <Button className="flex items-center gap-2 text-sm border-none text-orange-500">
            View All
            <ArrowRight size={18} />
          </Button>
        </Link>
      </div>

      <div className="relative">
        {/* SCROLL BUTTONS */}
        {/* <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 hidden md:block"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 hidden md:block"
        >
          <ChevronRight size={24} />
        </button> */}

        {/* SCROLLABLE CARDS */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar w-full pb-4"
        >
          {filteredItems.length === 0 ? (
            <div className="w-full min-w-full flex flex-col items-center justify-center py-16 text-center">
              <h3 className="text-xl font-semibold text-gray-700">No food found</h3>
              <p className="text-sm text-gray-500 mt-2">Try searching for another item</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item._id} className="min-w-[200px] snap-start">
                <img
                  src={item.image}
                  alt={item.name}
                  
                  className="w-[200px] h-[160px] object-cover rounded-xl mb-3"
                />
                <h3 className="text-sm font-semibold">{item.name}</h3>
                <div className="flex items-center gap-1 text-xs text-orange-500">
                  <MapPin size={12} />
                  {item.place}
                </div>
                <p
  className={`text-xs mt-1 ${
    item.stock <= 0
      ? "text-red-500"
      : item.stock <= 10
      ? "text-yellow-500"
      : "text-green-500"
  }`}
>
  {item.stock <= 0
    ? "Out Of Stock"
    : item.stock <= 10
    ? `${item.stock} left`
    : "In Stock"}
</p>

               <Button
  disabled={item.stock <= 0}
  className="mt-3 w-full"
  onClick={() => {
    if (item.stock <= 0) return;

    addToCart(item);
    toast.success("Added to cart");
  }}
>
  {item.stock <= 0 ? "Out Of Stock" : "Order Now"}
</Button>
              </div>
            ))
          )}
        </div>
      </div>
    </Container>
  </section>
);
}