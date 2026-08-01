"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const estimates = [
  {
    id: 1,
    sector: "Sector R",
    type: "Residential",
    size: "10 Marla",
    value: "PKR 2.35 Cr",
    date: "Today",
    status: "Completed",
  },
  {
    id: 2,
    sector: "Sector X",
    type: "Commercial",
    size: "5 Marla",
    value: "PKR 3.90 Cr",
    date: "Yesterday",
    status: "Completed",
  },
  {
    id: 3,
    sector: "Sector D",
    type: "Residential",
    size: "1 Kanal",
    value: "PKR 5.20 Cr",
    date: "28 Jul",
    status: "Completed",
  },
];

export default function RecentEstimates() {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Recent Estimates
          </h2>

          <p className="text-sm text-gray-500">
            Your latest property valuations
          </p>
        </div>

        <Link
          href="/dashboard/history"
          className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 text-left text-sm text-gray-500">
              <th className="pb-3">Sector</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Size</th>
              <th className="pb-3">Estimated Value</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {estimates.map((estimate) => (
              <tr
                key={estimate.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="py-4 font-medium">{estimate.sector}</td>

                <td className="py-4 text-gray-600">
                  {estimate.type}
                </td>

                <td className="py-4 text-gray-600">
                  {estimate.size}
                </td>

                <td className="py-4 font-semibold text-blue-600">
                  {estimate.value}
                </td>

                <td className="py-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    {estimate.status}
                  </span>
                </td>

                <td className="py-4 text-gray-500">
                  {estimate.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}