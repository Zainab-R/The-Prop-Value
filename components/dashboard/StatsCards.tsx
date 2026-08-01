"use client";

import {
  FileText,
  Heart,
  TrendingUp,
  DollarSign,
} from "lucide-react";

const stats = [
  {
    title: "Total Estimates",
    value: "24",
    change: "+5 this month",
    icon: FileText,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    title: "Saved Estimates",
    value: "8",
    change: "Recently Saved",
    icon: Heart,
    bg: "bg-red-100",
    color: "text-red-500",
  },
  {
    title: "Average Value",
    value: "PKR 2.45 Cr",
    change: "Current Average",
    icon: DollarSign,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    title: "Market Growth",
    value: "+4.2%",
    change: "Last 30 Days",
    icon: TrendingUp,
    bg: "bg-orange-100",
    color: "text-orange-500",
  },
];

export default function StatsCards() {
  return (
    <section className="grid gap-6 mt-8 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
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