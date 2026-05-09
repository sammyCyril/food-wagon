"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/layout/Container";
import { Foodss } from "@/data/type";
import { getFoodss } from "@/data/foods";
import FoodCategorySkeleton from "@/components/ui/FoodCategorySkeleton";


export default function SearchByFood() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [foodss, setFoodss] = useState<Foodss[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFoodss = async () => {
      setLoading(true);
      const data = await getFoodss();
      setFoodss(data);
      setLoading(false);
    };

    fetchFoodss();
  }, []);
if (loading) {
  return (
    <section className="bg-[#f5efe6] py-[60px]">
      <Container>
        <FoodCategorySkeleton />
      </Container>
    </section>
  );
}
  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#f5efe6] py-[60px]">
      <Container>

        {/* TOP BAR */}
        <div className="flex items-center justify-end mb-8">

          {/* <h2 className="hidden md:block text-[22px] font-semibold">
            Search by Food
          </h2> */}

          <div className="flex items-center gap-4">

            <span className="text-sm text-orange-500 font-medium cursor-pointer">
              View All
            </span>

            <div className="hidden md:flex items-center gap-2">

              <button
                onClick={() => scroll("left")}
                className="bg-orange-400 text-white p-2 rounded-full shadow"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={() => scroll("right")}
                className="bg-orange-400 text-white p-2 rounded-full shadow"
              >
                <ChevronRight size={16} />
              </button>

            </div>
          </div>

        </div>

        {/* SCROLL ROW */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {foodss.map((foods) => (
            <div
              key={foods._id}
              className="min-w-[120px] flex flex-col items-center"
            >

              {/* IMAGE */}
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                <img
                  src={foods.image}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* LABEL */}
              <p className="text-sm mt-3 text-gray-700">
                {foods.name}
              </p>

            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}