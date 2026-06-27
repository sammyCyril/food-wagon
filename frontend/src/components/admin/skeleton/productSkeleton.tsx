export default function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">

      <div className="p-5">
        <div className="h-10 w-64 animate-pulse rounded-lg bg-gray-100" />
      </div>

      <div className="space-y-4 p-5">
        {[1,2,3,4,5,6].map((item) => (
          <div
            key={item}
            className="h-16 animate-pulse rounded-lg bg-gray-100"
          />
        ))}
      </div>

    </div>
  );
}