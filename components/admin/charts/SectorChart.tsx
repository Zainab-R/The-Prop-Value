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
      <h2 className="mb-5 text-xl font-bold text-[#123A6D]">
        Top Sectors
      </h2>

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
            fill="#123A6D"
            radius={[0, 8, 8, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}