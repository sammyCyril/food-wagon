export default function PopularItemSkeleton() {
  return (
    <div className="flex gap-6 overflow-hidden">

      {Array.from({ length: 5 }).map((_, index) => (

        <div
          key={index}
          className="min-w-[200px] animate-pulse"
        >

          {/* IMAGE */}
          <div className="w-full h-[160px] bg-gray-300 rounded-xl mb-3" />

          {/* TITLE */}
          <div className="w-24 h-4 bg-gray-300 rounded mb-2" />

          {/* LOCATION */}
          <div className="w-20 h-3 bg-gray-200 rounded mb-3" />

          {/* PRICE */}
          <div className="w-12 h-4 bg-gray-300 rounded mb-4" />

          {/* BUTTON */}
          <div className="w-full h-10 bg-gray-300 rounded-md" />

        </div>
      ))}
    </div>
  );
}