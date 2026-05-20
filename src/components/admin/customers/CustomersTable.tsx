import CustomerRow from "./CustomerRow";

import { Customer } from "./types";

type Props = {
  customers: Customer[];
};

export default function CustomersTable({
  customers,
}: Props) {

  return (
    <div className="min-h-[500px] overflow-x-auto  bg-white shadow-sm">

      <table className="min-w-full">

        {/* Head */}
        <thead className="border-b bg-gray-50">

          <tr className="text-left text-sm text-gray-500">

            <th className="px-6 py-4">
              Customer
            </th>

            <th className="px-6 py-4">
              Contact
            </th>

            <th className="px-6 py-4">
              City
            </th>

            <th className="px-6 py-4">
              Orders
            </th>

            <th className="px-6 py-4">
              Total Spend
            </th>

            <th className="px-6 py-4">
              Joined
            </th>

            <th className="px-6 py-4">
              Status
            </th>

          </tr>

        </thead>

        {/* Body */}
        <tbody>

          {customers.map((customer) => (

            <CustomerRow
              key={customer.id}
              customer={customer}
            />

          ))}

        </tbody>

      </table>

    </div>
  );
}