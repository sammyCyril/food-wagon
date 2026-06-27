"use client";

import Container from "@/components/layout/Container";
import { Item } from "@/data/type";
import { useEffect, useState } from "react";
import { useCart } from "@/data/context/CartContext";
import { useSearch } from "@/data/context/SearchContext";
import Button from "@/components/ui/Button";
import { MapPin } from "lucide-react";
import { toast } from "sonner";
import FoodCardSkeleton from "@/components/ui/FoodCardSkeleton";
import Link from "next/link";
import { getItems } from "@/services/items";

export default function PopularPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { search } = useSearch();

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

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <section className="py-10 bg-white">
        <Container>

          <h1 className="text-2xl font-semibold mb-6">
            Popular Items
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <FoodCardSkeleton key={index} />
            ))}
          </div>

        </Container>
      </section>
    );
  }

  return (
    <section className="py-10 bg-white">
      <Container>

        <h1 className="text-2xl font-semibold mb-6">
          Popular Items
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 hover:shadow-md transition-all duration-300">

          {filteredItems.map((item) => (
            <Link
              href={`/popular/${item._id}`}
              key={item._id}
              className="group cursor-pointer rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
                <div key={item._id}
            className="group cursor-pointer rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="overflow-hidden rounded-xl mb-3">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-[160px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                </div>

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

            <Button
  className="mt-3 w-full"
  onClick={(e) => {
    e.preventDefault();

    addToCart(item);

    toast.success("Added to cart");
  }}
>
  Order Now
</Button>


            </div>
            </Link>
          ))}

        </div>

      </Container>
    </section>
  );
}