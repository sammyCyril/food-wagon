"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { toast } from "sonner";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import FoodCardSkeleton from "@/components/ui/FoodCardSkeleton";

import { Item } from "@/data/type";
import { useCart } from "@/data/context/CartContext";
import { useSearch } from "@/data/context/SearchContext";

import { getItems } from "@/services/items";

export default function PopularPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { addToCart } = useCart();
  const { search } = useSearch();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();

        setItems(data);
        setHasError(false);
      } catch (error) {
        console.error(error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesName = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesPlace = item.place
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesName || matchesPlace;
  });

   function capitalizeFirstLetter(str: string) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

  // Loading State
  if (loading) {
    return (
      <section className="py-10 bg-white">
        <Container>
          <h1 className="mb-6 text-2xl font-semibold">
            Popular Items
          </h1>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <FoodCardSkeleton key={index} />
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // Error State
  if (hasError) {
    return (
      <section className="py-10 bg-white">
        <Container>
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-2xl font-semibold text-red-500">
              Unable to load products
            </h2>

            <p className="mt-2 text-gray-500">
              Please check your internet connection and try again.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-10 bg-white">
      <Container>
        <h1 className="mb-6 text-2xl font-semibold">
          Popular Items
        </h1>

        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-2xl font-semibold">
              No product found
            </h2>

            <p className="mt-2 text-gray-500">
              Try searching for another item.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {filteredItems.map((item) => (
              <Link
                href={`/popular/${item._id}`}
                key={item._id}
                className="group rounded-xl transition-all duration-300 "
              >
                <div className="overflow-hidden rounded-xl mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[160px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h3 className="text-sm font-semibold">
                  {capitalizeFirstLetter(item.name)}
                </h3>

                <div className="mt-1 flex items-center gap-1 text-xs text-orange-500">
                  <MapPin size={12} />
                  {capitalizeFirstLetter(item.place)}
                </div>

                <p className="mt-2 font-semibold text-sm">
                  ${item.price}
                </p>

                <p
                  className={`mt-1 text-xs ${
                    item.stock <= 0
                      ? "text-red-500"
                      : item.stock <= 10
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {item.stock <= 0
                    ? "Sold Out"
                    : item.stock <= 10
                    ? `${item.stock} left`
                    : "In Stock"}
                </p>

                <Button
                  disabled={item.stock <= 0}
                  className="mt-3 w-full"
                  onClick={(e) => {
                    e.preventDefault();

                    if (item.stock <= 0) return;

                    addToCart(item);
                    toast.success("Added to cart");
                  }}
                >
                  {item.stock <= 0
                    ? "Sold Out"
                    : "Order Now"}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}