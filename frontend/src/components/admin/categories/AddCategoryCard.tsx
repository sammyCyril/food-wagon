import { Plus } from "lucide-react";

interface AddCategoryCardProps {
  onClick: () => void;
}

export default function AddCategoryCard({
  onClick,
}: AddCategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white transition hover:border-green-500 hover:bg-green-50"
    >

      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gray-300">
        <Plus size={24} />
      </div>

      <p className="font-medium text-gray-600">
        Add Category
      </p>

    </button>
  );
}