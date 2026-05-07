// components/RestaurantCard.tsx

import { Restaurant } from "@/data/type";
import { Clock, Tag, Star } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

export default function RestaurantCard({ restaurant}: Props) {
  return (
    <div>
      {/* IMAGE */}
      <div className="relative">
        <img
          src={restaurant.image}
          className="w-full h-[180px] object-cover rounded-xl"
        />

        {/* BADGES */}
        <div className="absolute top-3 left-3 flex gap-2">
          
          {/* Discount */}
          <div className="flex items-center gap-1 bg-orange-500 text-white text-xs px-2 py-1 rounded-md">
            <Tag size={12} />
            {restaurant.discount}
          </div>

          {/* Fast */}
          {restaurant.fast && (
            <div className="flex items-center gap-1 bg-yellow-400 text-white text-xs px-2 py-1 rounded-md">
              <Clock size={12} />
              Fast
            </div>
          )}

        </div>
      </div>

      {/* INFO */}
      <div className="flex items-center gap-3 mt-3">
        <img src={restaurant.logo} className="w-8 h-8 rounded-md" />

        <div>
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>

          <div className="flex items-center gap-1 text-xs text-orange-500">
            <Star size={12} />
            {restaurant.rating}
          </div>
        </div>
      </div>

      {/* STATUS */}
      <div className="mt-3">
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            restaurant.statusColor === "green"
              ? "bg-green-100 text-green-600"
              : "bg-orange-100 text-orange-500"
          }`}
        >
          {restaurant.status}
        </span>
      </div>
    </div>
  );
}