interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const categories = [
  "All",
  "Vegetables",
  "Fruits",
  "Dairy",
];

export default function CategoryFilter({
  value,
  onChange,
}: CategoryFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className=" rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-green-500"
    >
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