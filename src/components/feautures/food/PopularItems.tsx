"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowRight, ChevronLeft, ChevronRight, MapPin,} from "lucide-react";

import Container from "@/components/layout/Container";
import { getItems } from "@/data/foods";
import Button from "@/components/ui/Button";
import { Item } from "@/data/type";
import FoodCardSkeleton from "@/components/ui/FoodCardSkeleton";

import { useCart } from "@/data/context/CartContext";
import { useSearch } from "@/data/context/SearchContext";
import PopularItemSkeleton from "@/components/ui/PopularItemSkeleton";
import { toast } from "sonner";
import Link from "next/link";

export default function PopularItems() {

  const [items, setItems] = useState<Item[]>([]);

  const [loading, setLoading] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  const { addToCart } = useCart();

  const { search } = useSearch();

  // FILTER ITEMS
  const filteredItems = items.filter(
    (item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // FETCH ITEMS
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

  <h2 className="text-[22px] font-semibold">
    Popular items
  </h2>

  <Link href="/popular">
    <Button className="flex items-center gap-2 text-sm border-none text-orange-500">
      View All
      <ArrowRight size={18} />
    </Button>
  </Link>

   </div>

        <div className="relative">        

          {/* SCROLLABLE CARDS */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
          >

            {/* EMPTY STATE */}
            {filteredItems.length === 0 ? (

              <div className="w-full py-16 text-center">

                <h3 className="text-xl font-semibold text-gray-700">
                  No food found
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Try searching for another item
                </p>

              </div>

            ) : (

              filteredItems.map((item) => (

                <div
                  key={item._id}
                  className="min-w-[200px] snap-start"
                >

                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-[160px] object-cover rounded-xl mb-3"
                  />

                  {/* NAME */}
                  <h3 className="text-sm font-semibold">
                    {item.name}
                  </h3>

                  {/* LOCATION */}
                  <div className="flex items-center gap-1 text-xs text-orange-500">
                    <MapPin size={12} />

                    {item.place}
                  </div>

                  {/* PRICE */}
                  <p className="font-semibold text-sm mt-1">
                    ${item.price}
                  </p>

                  {/* BUTTON */}
                  <Button
                    className="mt-3 w-full bg-orange-500 text-white text-sm py-2 rounded-md"
                    onClick={() => {
                      addToCart(item)
                      toast.success("Added to cart")
                      }                    
                    }
                  >
                    Order Now
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