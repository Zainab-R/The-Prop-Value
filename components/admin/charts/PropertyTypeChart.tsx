"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

interface Props {
  data: {
    propertyType: string;
    _count: {
      propertyType: number;
    };
  }[];
}

const COLORS = [
  "var(--color-primary)",
  "#F97316",
  "#10B981",
  "#8B5CF6",
  "#06B6D4",
];

export default function PropertyTypeChart({ data }: Props) {
  const chartData = data.map((item) => ({
    name: item.propertyType,
    value: item._count.propertyType,
  }));

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold text-primary">
        Property Types
      </h2>

      {chartData.length === 0 ? (
        <div className="flex h-80 items-center justify-center text-sm text-slate-400">
          No estimate data available yet.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {chartData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}