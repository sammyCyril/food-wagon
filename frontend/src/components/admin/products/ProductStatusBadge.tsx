
interface ProductStatusBadgeProps {
    status : "Active" | "Low Stock" | "sold out";
}

const statusStyles = {
     "Active" : "bg-green-100 text-green-700",

     "Low Stock": "bg-yellow-100 text-yellow-700",

     "sold out": "bg-red-100 text-red-700",
}

const dotStyles = {
     "Active" : "bg-green-500",

     "Low Stock": "bg-yellow-500",

     "sold out": "bg-red-500",
} as const

export default function ProductStatusBadge({status,}: ProductStatusBadgeProps) {
    return (
        <div
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${statusStyles[status]}`}
    >
      <div
        className={`h-2 w-2 rounded-full ${dotStyles[status]}`}
      />

      {status}

        </div>
    )
} 