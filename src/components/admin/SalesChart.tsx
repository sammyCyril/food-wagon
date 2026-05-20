"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 700 },
  { name: "Mar", sales: 500 },
  { name: "Apr", sales: 900 },
  { name: "May", sales: 1200 },
  { name: "Jun", sales: 800 },
];

export default function SalesChart() {
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
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#000"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}