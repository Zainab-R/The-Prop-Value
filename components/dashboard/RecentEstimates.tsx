"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Estimate {
  id: string;
  sector: string;
  propertyType: string;
  propertySize: string;
  estimatedMin: number;
  estimatedMax: number;
  createdAt: string;
}

export default function RecentEstimates({
  estimates,
}: {
  estimates: Estimate[];
}) {
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
          className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {estimates.length === 0 ? (
        <p className="py-10 text-center text-sm text-gray-500">
          You haven&apos;t created any estimates yet.{" "}
          <Link href="/dashboard/estimate" className="font-medium text-accent hover:underline">
            Create your first one
          </Link>
          .
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-left text-sm text-gray-500">
                <th className="pb-3">Sector</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Size</th>
                <th className="pb-3">Estimated Value</th>
                <th className="pb-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {estimates.map((estimate) => (
                <tr
                  key={estimate.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-4 font-medium">
                    <Link href={`/dashboard/result?id=${estimate.id}`}>
                      {estimate.sector}
                    </Link>
                  </td>

                  <td className="py-4 text-gray-600">
                    {estimate.propertyType}
                  </td>

                  <td className="py-4 text-gray-600">
                    {estimate.propertySize}
                  </td>

                  <td className="py-4 font-semibold text-primary">
                    Rs. {estimate.estimatedMin.toLocaleString()} – {estimate.estimatedMax.toLocaleString()}
                  </td>

                  <td className="py-4 text-gray-500">
                    {new Date(estimate.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
