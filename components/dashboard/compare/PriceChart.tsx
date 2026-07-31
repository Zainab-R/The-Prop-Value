"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Estimate {
  estimatedMin: string;
  estimatedMax: string;
}

interface PriceChartProps {
  first: Estimate;
  second: Estimate;
}

export default function PriceChart({
  first,
  second,
}: PriceChartProps) {
  const data = [
    {
      name: "Property 1",
      Min: Number(first.estimatedMin),
      Max: Number(first.estimatedMax),
    },
    {
      name: "Property 2",
      Min: Number(second.estimatedMin),
      Max: Number(second.estimatedMax),
    },
  ];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Price Comparison
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
  formatter={(value) => `PKR ${Number(value).toLocaleString()}`}
/>
            <Legend />

            <Bar dataKey="Min" fill="#fb923c" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Max" fill="#ea580c" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}