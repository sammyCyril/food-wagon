"use client"
import { useState } from "react";
import CustomerRow from "./CustomerRow";

import { Customer } from "./types";
import Pagination from "@/components/ui/Pagination";

type Props = {
  customers: Customer[];
};

export default function CustomersTable({
  customers,
}: Props) {

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentCustomers = customers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="min-h-[500px] overflow-x-auto bg-white shadow-sm">

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

          {customers.length === 0 ? (

            <tr>

              <td
                colSpan={7}
                className="py-10 text-center text-gray-500"
              >
                No customers found
              </td>

            </tr>

          ) : (

            currentCustomers.map((customer) => (

              <CustomerRow
                key={customer._id}
                customer={customer}
              />

            ))

          )}

        </tbody>

      </table>

      <Pagination
        currentPage={currentPage}
        totalItems={customers.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

    </div>
  );
}