import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface Estimate {
  id: string;
  sector: string;
  propertyType: string;
  propertySize: string;
  estimatedMax: any;
  createdAt: Date;
  user: {
    name: string | null;
    email: string;
  };
}

interface Props {
  estimates: Estimate[];
}

export default function RecentEstimatesTable({ estimates }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b p-6">
        <div>
          <h2 className="text-xl font-bold text-[#123A6D]">
            Recent Estimates
          </h2>

          <p className="text-sm text-slate-500">
            Latest property valuation requests.
          </p>
        </div>

        <Link
          href="/admin/estimates"
          className="font-medium text-[#123A6D] hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                User
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Sector
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Type
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Size
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Estimated
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Date
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {estimates.map((estimate) => (
              <tr
                key={estimate.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <p className="font-medium">
                    {estimate.user.name || "Unknown"}
                  </p>

                  <p className="text-xs text-slate-500">
                    {estimate.user.email}
                  </p>
                </td>

                <td className="px-6 py-4">
                  {estimate.sector}
                </td>

                <td className="px-6 py-4">
                  {estimate.propertyType}
                </td>

                <td className="px-6 py-4">
                  {estimate.propertySize}
                </td>

                <td className="px-6 py-4 font-semibold text-[#123A6D]">
                  Rs. {Number(estimate.estimatedMax).toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  {new Date(estimate.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye size={18} />
                    </button>

                    <button className="text-orange-500 hover:text-orange-700">
                      <Pencil size={18} />
                    </button>

                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}