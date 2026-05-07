"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Container from "@/components/layout/Container";
import { getItems } from "@/data/foods";
import Button from "@/components/ui/Button";
import { Item } from "@/data/type";
import FoodCardSkeleton from "@/components/ui/FoodCardSkeleton";
import { useCart } from "@/data/context/CartContext";

export default function PopularItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getItems();
      setItems(data);
      setLoading(false);
    };
    fetchItems();

  }, []);

  if (loading) {
    return (
      <section className="bg-white py-[40px]">
        <Container>
          <FoodCardSkeleton />
        </Container>
      </section>
    );
  }

  
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-[70px] bg-white">
      <Container>

        <h2 className="text-center text-[22px] font-semibold mb-10">
          Popular items
        </h2>

        <div className="relative">

          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-14 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full shadow z-10"
          >
            <ChevronLeft size={18} />
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-14 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full shadow z-10"
          >
            <ChevronRight size={18} />
          </button>

          {/* CARDS (SCROLLABLE NOW) */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
          >
            {items.map((item) => (
              <div key={item._id} className="min-w-[200px] snap-start">

                <img
                  src={item.image}
                  className="w-full h-[160px] object-cover rounded-xl mb-3"
                />

                <h3 className="text-sm font-semibold">
                  {item.name}
                </h3>

                <div className="flex items-center gap-1 text-xs text-orange-500">
                  <MapPin size={12} />
                  {item.place}
                </div>

                <p className="font-semibold text-sm mt-1">
                  ${item.price}
                </p>

                {/* <button className="mt-3 w-full bg-orange-500 text-white text-sm py-2 rounded-md">
                  Order Now
                </button> */}

                <Button className="mt-3 w-full bg-orange-500 text-white text-sm py-2 rounded-md"
                onClick={() => addToCart(item)}
                >
                  Order Now
                </Button>

              </div>
            ))}
          </div>

        </div>

      </Container>
    </section>
  );
}