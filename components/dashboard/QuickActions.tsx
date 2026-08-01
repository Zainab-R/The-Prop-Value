"use client";

import Link from "next/link";
import {
  Calculator,
  GitCompareArrows,
  History,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    title: "New Estimate",
    description: "Estimate a property's market value",
    href: "/dashboard/estimate",
    icon: Calculator,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    title: "Compare Properties",
    description: "Compare values across sectors",
    href: "/dashboard/compare",
    icon: GitCompareArrows,
    bg: "bg-orange-100",
    color: "text-orange-600",
  },
  {
    title: "Estimate History",
    description: "Review previous estimates",
    href: "/dashboard/history",
    icon: History,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    title: "Market Insights",
    description: "View latest DHA Multan trends",
    href: "/dashboard/insights",
    icon: TrendingUp,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
];

export default function QuickActions() {
  return (
    <section className="mt-10">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Quick Actions
          </h2>

          <p className="text-sm text-gray-500">
            Access the most frequently used features.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${action.bg}`}
              >
                <Icon
                  size={28}
                  className={`${action.color} transition-transform duration-300 group-hover:scale-110`}
                />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-gray-900">
                {action.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {action.description}
              </p>

              <div className="mt-6 flex items-center font-medium text-blue-600">
                Open

                <ArrowRight
                  size={18}
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}