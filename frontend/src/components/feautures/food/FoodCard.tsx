import { Food } from "@/data/type";

type Props = {
  food: Food;
};

export default function FoodCard({ food }: Props) {
  return (
    <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* IMAGE CONTAINER */}
      <div className="relative">
        <img
          src={food.image}
          alt={food.title}
          className="w-full aspect-[16/13] md:aspect-[16/12] object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
        />

        {/* Discount Badge */}
        <div className="absolute bottom-2 left-0 
          bg-orange-500 text-white 
          px-2 py-0.5 text-xs 
          md:px-3 md:py-1 md:text-sm 
          font-bold shadow-md">
          {food.discount}
        </div>
      </div>

    

      {/* CONTENT */}
      <div className="mt-3 space-y-2">
        <h3 className="font-semibold text-base leading-tight line-clamp-2 text-gray-900">
          {food.title}
        </h3>

        <div className="inline-block mt-2 bg-orange-100 text-orange-600 text-xs font-medium px-3 py-1 rounded-md">
          {food.days}
        </div>
      </div>
    </div>
  );
}