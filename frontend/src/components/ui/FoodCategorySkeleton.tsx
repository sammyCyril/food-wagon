export default function FoodCategorySkeleton() {
  return (
    <div className="flex gap-8 overflow-hidden">

      {Array.from({ length: 8 }).map((_, index) => (

        <div
          key={index}
          className="min-w-[120px] flex flex-col items-center animate-pulse"
        >

          {/* CIRCLE IMAGE */}
          <div className="w-[100px] h-[100px] rounded-full bg-gray-300" />

          {/* TEXT */}
          <div className="w-16 h-4 bg-gray-300 rounded mt-3" />

        </div>
      ))}
    </div>
  );
}