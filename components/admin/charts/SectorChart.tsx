"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data: {
    sector: string;
    _count: {
      sector: number;
    };
  }[];
}

export default function SectorChart({ data }: Props) {
  const chartData = data.map((item) => ({
    sector: item.sector,
    estimates: item._count.sector,
  }));

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold text-primary">
        Top Sectors
      </h2>

      {chartData.length === 0 ? (
        <div className="flex h-80 items-center justify-center text-sm text-slate-400">
          No estimate data available yet.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={chartData}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis type="number" />

            <YAxis
              type="category"
              dataKey="sector"
              width={90}
            />

            <Tooltip />

            <Bar
              dataKey="estimates"
              fill="var(--color-primary)"
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}