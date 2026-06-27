interface StatusBadgeProps {
  status:
    | "Pending"
    | "Processing"
    | "Delivered"
    | "Cancelled";
}

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",

  Processing: "bg-blue-100 text-blue-700",

  Delivered: "bg-green-100 text-green-700",

  Cancelled: "bg-red-100 text-red-700",
};

const dotStyles = {
  Pending: "bg-yellow-500",

  Processing: "bg-blue-500",

  Delivered: "bg-green-500",

  Cancelled: "bg-red-500",
};

export default function StatusBadge({status,}: StatusBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${statusStyles[status]}`}
    >
      <div
        className={`h-2 w-2 rounded-full ${dotStyles[status]}`}
      />
      {status}
    </div>
  );
}