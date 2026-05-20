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
}

export default function OrderRow({
  orderId,
  customer,
  date,
  amount,
  status,
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
        <StatusBadge status={status} />
      </td>
    </tr>
  );
}