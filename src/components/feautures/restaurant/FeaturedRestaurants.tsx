// components/FeaturedRestaurants.tsx
"use client";

import Container from "@/components/layout/Container";
import RestaurantCard from "@/components/feautures/restaurant/RestaurantCard";
import { Foodss, Restaurant } from "@/data/type";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { getFoodss, getRestaurants } from "@/data/foods";
import FoodCardSkeleton from "@/components/ui/FoodCardSkeleton";

export default function FeaturedRestaurants() {
  const [restaurant, setRestaurant] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      const data = await getRestaurants();
      setRestaurant(data);
      setLoading(false);
    };

    fetchRestaurants();
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

  return (
    <section className="bg-[#ffffff] py-[70px]">
      <Container>

        {/* TITLE */}
        <h2 className="text-center text-[22px] font-semibold mb-10">
          Featured Restaurants
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {restaurant.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>

        <div className="mt-15 flex justify-center gap-2">
          <Button 
          className="flex items-center gap-2 text-sm border-none">
            View All
            <ArrowRight size={18} />
          </Button>
        </div>


      </Container>
    </section>
  );
}