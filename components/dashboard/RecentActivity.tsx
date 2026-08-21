import Link from "next/link";
import { Clock3, Calculator } from "lucide-react";

interface Estimate {
  id: string;
  sector: string;
  propertyType: string;
  propertySize: string;
  createdAt: string;
}

function timeAgo(dateStr: string) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diffMs / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;

  return new Date(dateStr).toLocaleDateString();
}

export default function RecentActivity({
  estimates,
}: {
  estimates: Estimate[];
}) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm h-full">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Recent Activity
          </h2>

          <p className="text-sm text-gray-500">
            Estimates you&apos;ve created recently
          </p>
        </div>

        <Clock3 className="text-gray-400" size={22} />
      </div>

      {estimates.length === 0 ? (
        <p className="text-sm text-gray-500">No activity yet.</p>
      ) : (
        <div className="space-y-6">
          {estimates.map((estimate, index) => (
            <Link
              key={estimate.id}
              href={`/dashboard/result?id=${estimate.id}`}
              className="relative flex gap-4"
            >
              {index !== estimates.length - 1 && (
                <div className="absolute left-6 top-12 h-10 w-px bg-gray-200" />
              )}

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Calculator size={22} />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  Estimate created
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {estimate.propertyType} • {estimate.sector} • {estimate.propertySize}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  {timeAgo(estimate.createdAt)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
