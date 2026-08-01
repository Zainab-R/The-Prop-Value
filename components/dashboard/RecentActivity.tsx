"use client";

import {
  Clock3,
  Calculator,
  History,
  CheckCircle2,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "New estimate created",
    description: "Residential • Sector R • 10 Marla",
    time: "2 hours ago",
    icon: Calculator,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "Estimate viewed",
    description: "Commercial • Sector X",
    time: "Yesterday",
    icon: History,
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 3,
    title: "Property comparison completed",
    description: "Sector D vs Sector R",
    time: "2 days ago",
    icon: CheckCircle2,
    color: "bg-green-100 text-green-600",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm h-full">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Recent Activity
          </h2>

          <p className="text-sm text-gray-500">
            Your latest dashboard activity
          </p>
        </div>

        <Clock3 className="text-gray-400" size={22} />
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="relative flex gap-4"
            >
              {/* Vertical Line */}
              {index !== activities.length - 1 && (
                <div className="absolute left-6 top-12 h-10 w-px bg-gray-200"></div>
              )}

              {/* Icon */}
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${activity.color}`}
              >
                <Icon size={22} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {activity.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {activity.description}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}