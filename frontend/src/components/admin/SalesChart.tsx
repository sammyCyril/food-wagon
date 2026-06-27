"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

type SalesChartProps = {
  data: {
    name: string;
    sales: number;
  }[];
};

export default function SalesChart({data,}: SalesChartProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          Sales Overview
        </h2>

        <p className="text-sm text-gray-500">
          Monthly revenue analytics
        </p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
  <CartesianGrid strokeDasharray="3 3" />

  <XAxis dataKey="name" />

  <YAxis
    tickFormatter={(value) =>
      `₦${(value / 1000).toFixed(0)}k`
    }
  />

  <Tooltip
    formatter={(value) => [
      `₦${Number(value).toLocaleString()}`,
      "Revenue",
    ]}
  />

  <Line
    type="linear"
    dataKey="sales"
    stroke="#000"
    strokeWidth={3}
    dot={{ r: 4 }}
  />
</LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}