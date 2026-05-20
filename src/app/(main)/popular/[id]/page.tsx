"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import Container from "@/components/layout/Container";

import { getItems } from "@/data/foods";

import { Item } from "@/data/type";

import Button from "@/components/ui/Button";

import { MapPin } from "lucide-react";

import { useCart } from "@/data/context/CartContext";

import { toast } from "sonner";

export default function ProductDetailPage() {

  const params = useParams();

  const [item, setItem] = useState<Item | null>(null);

  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {

    const fetchItem = async () => {

      const data = await getItems();

      const foundItem = data.find(
        (food) => food._id === params.id
      );

      setItem(foundItem || null);

      setLoading(false);
    };

    fetchItem();

  }, [params.id]);

  if (loading) {
    return (
      <section className="py-20">
        <Container>
          <p>Loading...</p>
        </Container>
      </section>
    );
  }

  if (!item) {
    return (
      <section className="py-20">
        <Container>
          <h2 className="text-2xl font-semibold">
            Product not found
          </h2>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">

      <Container>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* IMAGE */}
          <div className="overflow-hidden rounded-3xl">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[450px] object-cover"
            />
          </div>

          {/* DETAILS */}
          <div>

            <h1 className="text-4xl font-bold">
              {item.name}
            </h1>

            <div className="flex items-center gap-2 text-orange-500 mt-4">
              <MapPin size={18} />
              <span>{item.place}</span>
            </div>

            <p className="text-3xl font-semibold mt-6">
              ${item.price}
            </p>

            <p className="text-gray-500 leading-7 mt-6">
              Delicious freshly prepared meal made with premium ingredients and delivered hot to your doorstep.
            </p>

            <Button
              className="mt-8 w-full md:w-auto"
              onClick={() => {
                addToCart(item);
                toast.success("Added to cart");
              }}
            >
              Add To Cart
            </Button>

          </div>

        </div>

      </Container>

    </section>
  );
}