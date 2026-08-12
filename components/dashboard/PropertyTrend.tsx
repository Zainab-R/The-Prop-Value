"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
} from "recharts";

const data = [
  { month: "Jan", value: 180 },
  { month: "Feb", value: 210 },
  { month: "Mar", value: 195 },
  { month: "Apr", value: 240 },
  { month: "May", value: 265 },
  { month: "Jun", value: 290 },
];

export default function PropertyTrend() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Property Value Trend
        </h2>

        <p className="text-sm text-gray-500">
          Average estimated values over the last six months
        </p>
      </div>

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

            <Tooltip />

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
    </div>
  );
}