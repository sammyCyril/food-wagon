import Link from "next/link";
import Button from "../ui/Button";
import Input from "../ui/Input";
import OrderRow from "./orders/OrderRow";
import { ArrowRight } from "lucide-react";

const orders = [
  {
    orderId: "#1024",
    customer: "John Doe",
    date: "May 15, 2026",
    amount: "$120",
    status: "Pending",
  },

  {
    orderId: "#1025",
    customer: "Sarah Smith",
    date: "May 14, 2026",
    amount: "$80",
    status: "Delivered",
  },

  {
    orderId: "#1026",
    customer: "Michael Johnson",
    date: "May 13, 2026",
    amount: "$240",
    status: "Processing",
  },

  {
    orderId: "#1027",
    customer: "Emma Brown",
    date: "May 12, 2026",
    amount: "$65",
    status: "Cancelled",
  },
] as const;

export default function RecentOrders() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white">

          {/* Header */}
       <div className="p-3 flex items-center justify-between px-5">
         <div className="">
           <h2 className="text-xl font-bold">
             Recent Orders
           </h2>
         </div>

        <div className="flex gap-2 ">
              <Link
            href="/admin/orders"
            className="text-orange-600 flex gap-2 items-center text-[14px]"
            >
              
              View all orders
              <ArrowRight  size={13} />
            </Link>
        </div>

       </div>
      
      <table className="w-full min-w-[700px]">
        
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Order ID
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Customer
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Date
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Amount
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <OrderRow
              key={order.orderId}
              orderId={order.orderId}
              customer={order.customer}
              date={order.date}
              amount={order.amount}
              status={order.status}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}


// import Button from "../ui/Button";

// const orders = [
//   {
//     id: "#1024",
//     customer: "Samuel",
//     status: "Delivered",
//     total: "$120",
//   },
//   {
//     id: "#1025",
//     customer: "John",
//     status: "Pending",
//     total: "$80",
//   },
//   {
//     id: "#1026",
//     customer: "Sarah",
//     status: "Processing",
//     total: "$200",
//   },
// ];

// export default function RecentOrders() {
//   return (
//     <div className="rounded-2xl border border-gray-200 bg-white p-6">
      
//       {/* Header */}
//       <div className="mb-6 flex items-center justify-between">
//         <div>
//           <h2 className="text-xl font-bold">
//             Recent Orders
//           </h2>

//           <p className="text-sm text-gray-500">
//             Latest customer purchases
//           </p>
//         </div>

//         <Button 
//         variant="secondary"
//         className="rounded-xl border px-4 py-2 text-sm">
//           View All
//         </Button>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full min-w-[600px]">
          
//           <thead>
//             <tr className="border-b text-left">
//               <th className="pb-4 font-medium text-gray-500">
//                 Order ID
//               </th>

//               <th className="pb-4 font-medium text-gray-500">
//                 Customer
//               </th>

//               <th className="pb-4 font-medium text-gray-500">
//                 Status
//               </th>

//               <th className="pb-4 font-medium text-gray-500">
//                 Total
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((order) => (
//               <tr
//                 key={order.id}
//                 className="border-b transition hover:bg-gray-50"
//               >
//                 <td className="py-4 font-medium">
//                   {order.id}
//                 </td>

//                 <td>{order.customer}</td>

//                 <td>
//                   <span
//                     className={`rounded-full px-3 py-1 text-xs font-medium
//                     ${
//                       order.status === "Delivered"
//                         ? "bg-green-100 text-green-700"
//                         : order.status === "Pending"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-blue-100 text-blue-700"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </td>

//                 <td className="font-semibold">
//                   {order.total}
//                 </td>
//               </tr>
//             ))}
//           </tbody>

//         </table>
//       </div>
//     </div>
//   );
// }