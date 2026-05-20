

import {
  DollarSign,
  Package,
  Users,
} from "lucide-react";

type Props = {
  totalCustomers: number;
};

export default function CustomersStats({totalCustomers,}: Props) {

  return (
    <div className="grid gap-4 md:grid-cols-3">

      {/* Customers */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-purple-100 p-3">
            <Users className="size-5 text-purple-600" />
          </div>

          <div>

            <p className="text-sm text-gray-500">
              Total Customers
            </p>

            <h2 className="text-2xl font-bold">
              {totalCustomers}
            </h2>

          </div>

        </div>

      </div>

      {/* Revenue */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-orange-100 p-3">
            <DollarSign className="size-5 text-orange-600" />
          </div>

          <div>

            <p className="text-sm text-gray-500">
              Total Revenue
            </p>

            <h2 className="text-2xl font-bold">
              ₹77,330
            </h2>

          </div>

        </div>

      </div>

      {/* Orders */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-yellow-100 p-3">
            <Package className="size-5 text-yellow-600" />
          </div>

          <div>

            <p className="text-sm text-gray-500">
              Avg Order Value
            </p>

            <h2 className="text-2xl font-bold">
              ₹781
            </h2>

          </div>

        </div>

      </div>

      

    </div>
  );
}