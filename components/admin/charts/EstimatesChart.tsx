"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data: {
    month: string;
    estimates: number;
  }[];
}

export default function EstimatesChart({
  data,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold text-primary">
        Monthly Estimates
      </h2>

      {data.length === 0 ? (
        <div className="flex h-80 items-center justify-center text-sm text-slate-400">
          No estimate data available yet.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="estimates"
              stroke="#F97316"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}