"use client";

import {
  FileText,
  CalendarClock,
  DollarSign,
  MapPinned,
} from "lucide-react";

interface Stats {
  totalEstimates: number;
  estimatesThisMonth: number;
  averageValue: number;
  sectorsExplored: number;
}

export default function StatsCards({ stats }: { stats: Stats }) {
  const items = [
    {
      title: "Total Estimates",
      value: stats.totalEstimates.toString(),
      change: "All time",
      icon: FileText,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "This Month",
      value: stats.estimatesThisMonth.toString(),
      change: "New estimates",
      icon: CalendarClock,
      bg: "bg-orange-100",
      color: "text-orange-500",
    },
    {
      title: "Average Value",
      value:
        stats.averageValue > 0
          ? `PKR ${(stats.averageValue / 10000000).toFixed(2)} Cr`
          : "—",
      change: "Across your estimates",
      icon: DollarSign,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Sectors Explored",
      value: stats.sectorsExplored.toString(),
      change: "Distinct sectors",
      icon: MapPinned,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
  ];

  return (
    <section className="grid gap-6 mt-8 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="group rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  {item.value}
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  {item.change}
                </p>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
              >
                <Icon
                  className={`${item.color} transition group-hover:scale-110`}
                  size={28}
                />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
