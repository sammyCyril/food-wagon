import { Search } from "lucide-react";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductSearch({
  value,
  onChange,
}: ProductSearchProps) {
  return (
    <div className="relative w-full">
      
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search by name or SKU..."
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-green-500"
      />
    </div>
  );
}