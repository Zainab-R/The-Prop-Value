"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface Rate {
  id: string;
  sector: string;
  propertyType: string;
  propertySize: string;
  basePrice: number;
}

interface SectorTrendsProps {
  rates: Rate[];
}

export default function SectorTrends({
  rates,
}: SectorTrendsProps) {
  const chartData = rates.map((rate) => ({
    sector: rate.sector,
    price: rate.basePrice,
  }));

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Sector Price Trends
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="sector" />

            <YAxis />

            <Tooltip
              formatter={(value) =>
                `PKR ${Number(value).toLocaleString()}`
              }
            />

            <Line
              type="monotone"
              dataKey="price"
              stroke="#f97316"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}