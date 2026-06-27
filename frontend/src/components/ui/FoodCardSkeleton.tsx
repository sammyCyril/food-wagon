export default function FoodCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-2xl aspect-[16/13]" />

      <div className="mt-3 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />

        <div className="h-3 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );
}

// export default function FoodCardSkeleton() {
//   return (
//     <div className="">
//       <div className="flex flex-col items-center justify-center min-h-[320px] gap-5">
//           <div className="text-6xl animate-bounce">🍔</div>
//           <p className="text-xl font-medium text-gray-600">Loading ...</p>
//         </div>
//     </div>
//   );
// }