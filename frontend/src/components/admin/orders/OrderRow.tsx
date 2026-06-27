import StatusBadge from "./OrderBadge";

interface OrderRowProps {
  orderId: string;
  customer: string;
  date: string;
  amount: string;
  status:
    | "Pending"
    | "Processing"
    | "Delivered"
    | "Cancelled";

  editable?: boolean;

  onStatusChange?: (
    status:
      | "Pending"
      | "Processing"
      | "Delivered"
      | "Cancelled"
  ) => void;
}

export default function OrderRow({
  orderId,
  customer,
  date,
  amount,
  status,
  editable = false,
  onStatusChange,
}: OrderRowProps) {
  return (
    <tr className="border-b border-gray-100">
      <td className="px-6 py-4 font-medium">
        {orderId}
      </td>

      <td className="px-6 py-4 text-gray-600">
        {customer}
      </td>

      <td className="px-6 py-4 text-gray-600">
        {date}
      </td>

      <td className="px-6 py-4 font-medium">
        {amount}
      </td>

      <td className="px-6 py-4">
        {editable ? (
          <select
            value={status}
            onChange={(e) =>
              onStatusChange?.(
                e.target.value as
                  | "Pending"
                  | "Processing"
                  | "Delivered"
                  | "Cancelled"
              )
            }
            className={`
              rounded-lg
              border
              px-3
              py-2
              text-sm
              font-medium
              ${
                status === "Pending"
                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                  : status === "Processing"
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : status === "Delivered"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-700 border-red-200"
              }
            `}
          >
            <option value="Pending">
              Pending
            </option>

            <option value="Processing">
              Processing
            </option>

            <option value="Delivered">
              Delivered
            </option>

            <option value="Cancelled">
              Cancelled
            </option>
          </select>
        ) : (
          <StatusBadge status={status} />
        )}
      </td>
    </tr>
  );
}