export default function CustomerSkeleton() {
  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-28 animate-pulse rounded-2xl border border-gray-200 bg-gray-100"
          />
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between rounded-xl bg-white p-4">
        <div className="h-10 w-72 animate-pulse rounded-lg bg-gray-100" />
        <div className="flex gap-2">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-10 w-24 animate-pulse rounded-lg bg-gray-100"
            />
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-16 animate-pulse rounded-lg bg-gray-100"
            />
          ))}
        </div>
      </div>
    </div>
  );
}