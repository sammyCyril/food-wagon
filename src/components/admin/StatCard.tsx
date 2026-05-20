interface StatCardProps {
  title: string;
  value: string;
  change: string;
}

export default function StatCard({
  title,
  value,
  change,
}: StatCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 border border-gray-200">
      
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold">
        {value}
      </h3>

      <p className="mt-2 text-sm text-green-600">
        {change}
      </p>

      
    </div>
  );
}