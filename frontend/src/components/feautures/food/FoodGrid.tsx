"use client";

import { useEffect, useState } from "react";
import Container from "@/components/layout/Container";
import FoodCard from "./FoodCard";
import { Food } from "@/data/type";
import { getFoods } from "@/data/foods";
import FoodCardSkeleton from "@/components/ui/FoodCardSkeleton";

export default function FoodGrid() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      const data = await getFoods();
      setFoods(data);
      setLoading(false);
    };

    fetchFoods();
  }, []);

if (loading) {
  return (
    <section className="bg-white py-[60px]">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <FoodCardSkeleton key={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

  return (
    <section className="bg-white py-[60px]">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-3">
          {foods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      </Container>
    </section>
  );
}