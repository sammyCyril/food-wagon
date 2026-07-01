interface ProductStatusTabsProps {
  value: string;
  onChange: (value: string) => void;
}

const tabs = [
  "All",
  "Active",
  "Low Stock",
  "sold out",
];

export default function ProductStatusTabs({
  value,
  onChange,
}: ProductStatusTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      
      {tabs.map((tab) => {
        const isActive = value === tab;

        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition
              
              ${
                isActive
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}