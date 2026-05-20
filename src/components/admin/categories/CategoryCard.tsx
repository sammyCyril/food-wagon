import CategoryStatusBadge from "./CategoryStatusBadge";

interface CategoryCardProps {
  icon: string;
  name: string;
  description: string;
  products: number;
  status: "Active" | "Inactive";
  onDelete: () => void;
  onEdit: () => void;
}

export default function CategoryCard({
  icon,
  name,
  description,
  products,
  status,
  onDelete,
  onEdit,
}: CategoryCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">

      {/* Icon */}
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-3xl">
        {icon}
      </div>

      {/* Content */}
      <div>

        <h3 className="text-lg font-semibold">
          {name}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>

      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">

        <p className="text-sm text-gray-500">
          {products} products
        </p>

        <CategoryStatusBadge
          status={status}
        />

      </div>

      <button
    onClick={onDelete}
    className="text-sm text-red-500 hover:text-red-700"
  >
    Delete
  </button>

  <button onClick={onEdit}>
  Edit
</button>

    </div>
  );
}