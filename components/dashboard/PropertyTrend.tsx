"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
} from "recharts";

interface TrendPoint {
  month: string;
  value: number;
}

export default function PropertyTrend({ data }: { data: TrendPoint[] }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Your Estimate Value Trend
        </h2>

        <p className="text-sm text-gray-500">
          Average estimated value of your estimates, by month
        </p>
      </div>

      {data.length === 0 ? (
        <div className="flex h-80 items-center justify-center text-sm text-gray-400">
          No estimates yet — create one to see your trend.
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="value" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <Tooltip
                formatter={(value) => `Rs. ${Number(value).toLocaleString()}`}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#2563EB"
                strokeWidth={3}
                fill="url(#value)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
