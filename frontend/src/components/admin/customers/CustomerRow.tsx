import { Customer } from "./types";

type Props = {
  customer: Customer;
};

export default function CustomerRow({ customer,}: Props) {

  return (
    <tr className="border-b last:border-none hover:bg-gray-50">

      {/* Customer */}
      <td className="px-6 py-4">

        <div className="flex items-center gap-3">

          <div className="flex size-10 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700">

            {customer.name
              .split(" ")
              .map((word) => word[0])
              .join("")}

          </div>

          <div>

            <p className="font-medium">
              {customer.name}
            </p>

            <p className="text-sm text-gray-500">
              {customer.email}
            </p>

          </div>

        </div>

      </td>

      {/* Contact */}
      <td className="px-6 py-4 text-sm text-gray-600">

        {customer.phone}

      </td>

      {/* City */}
      <td className="px-6 py-4 text-sm text-gray-600">

        {customer.city}

      </td>

      {/* Orders */}
      <td className="px-6 py-4 font-medium">

        {customer.orders}

      </td>

      {/* Spend */}
      <td className="px-6 py-4 font-semibold">

        ₦{customer.totalSpend.toLocaleString()}

      </td>

      {/* Joined */}
      <td className="px-6 py-4 text-sm text-gray-500">

        {new Date(
          customer.joined
        ).toLocaleDateString()}

      </td>

      {/* Status */}
      <td className="px-6 py-4">

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            customer.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >

          {customer.status}

        </span>

      </td>

    </tr>
  );
}