interface CategoryStatusBadgeProps {
  status: "Active" | "Inactive";
}

const styles = {
  Active:
    "bg-green-100 text-green-700",

  Inactive:
    "bg-gray-100 text-gray-500",
};

const dotStyles = {
  Active: "bg-green-500",

  Inactive: "bg-gray-400",
};

export default function CategoryStatusBadge({
  status,
}: CategoryStatusBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${styles[status]}`}
    >
      <div
        className={`h-2 w-2 rounded-full ${dotStyles[status]}`}
      />

      {status}
    </div>
  );
}