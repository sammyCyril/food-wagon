interface StatCardProps {
  title: string;
  value: string;
  change: string;
  loading?: boolean;
}

export default function StatCard({
  title,
  value,
  change,
  loading = false,
}: StatCardProps) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
        <div className="mt-3 h-8 w-32 animate-pulse rounded bg-gray-200" />
        <div className="mt-3 h-4 w-20 animate-pulse rounded bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <p className="text-sm text-gray-500">{title}</p>

      <h3 className="mt-2 text-3xl font-bold">
        {value}
      </h3>

      <p className="mt-2 text-sm text-green-600">
        {change}
      </p>
    </div>
  );
}