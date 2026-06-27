interface CategoryFilterProps {
  value: string;
  categories: string[];
  onChange: (value: string) => void;
}

export default function CategoryFilter({
  value,
  categories,
  onChange,
}: CategoryFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-green-500"
    >
      <option value="All">All</option>

      {categories.map((category) => (
        <option
          key={category}
          value={category}
        >
          {category}
        </option>
      ))}
    </select>
  );
}