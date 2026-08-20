"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, Trash2 } from "lucide-react";

import { deleteEstimateAsAdmin } from "@/app/admin/estimates/actions";
import DeleteDialog from "./DeleteDialog";
import EstimateDetailModal from "./EstimateDetailModal";
import RowActionsMenu from "@/components/shared/RowActionsMenu";

interface Estimate {
  id: string;
  sector: string;
  propertyType: string;
  propertySize: string;
  estimatedMax: unknown;
  createdAt: Date;
  user: {
    name: string | null;
    email: string;
  };
}

interface Props {
  estimates: Estimate[];
  showViewAllLink?: boolean;
  title?: string;
  subtitle?: string;
}

export default function RecentEstimatesTable({
  estimates,
  showViewAllLink = true,
  title = "Recent Estimates",
  subtitle = "Latest property valuation requests.",
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Estimate | null>(null);

  function handleDelete() {
    if (!deleteTarget) return;

    const id = deleteTarget.id;
    setDeleteTarget(null);

    startTransition(async () => {
      try {
        await deleteEstimateAsAdmin(id);
        toast.success("Estimate deleted.");
        router.refresh();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to delete estimate."
        );
      }
    });
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b p-6">
        <div>
          <h2 className="text-xl font-bold text-primary">{title}</h2>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>

        {showViewAllLink && (
          <Link
            href="/admin/estimates"
            className="font-medium text-primary hover:underline"
          >
            View All
          </Link>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Sector</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Size</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Estimated</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {estimates.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-500">
                  No estimates yet.
                </td>
              </tr>
            ) : (
              estimates.map((estimate) => (
                <tr key={estimate.id} className="border-t hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <p className="font-medium">{estimate.user.name || "Unknown"}</p>
                    <p className="text-xs text-slate-500">{estimate.user.email}</p>
                  </td>

                  <td className="px-6 py-4">{estimate.sector}</td>
                  <td className="px-6 py-4">{estimate.propertyType}</td>
                  <td className="px-6 py-4">{estimate.propertySize}</td>

                  <td className="px-6 py-4 font-semibold text-primary">
                    Rs. {Number(estimate.estimatedMax).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(estimate.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <RowActionsMenu
                      ariaLabel="Estimate actions"
                      actions={[
                        {
                          label: "View Details",
                          icon: Eye,
                          onClick: () => setViewingId(estimate.id),
                        },
                        {
                          label: "Delete",
                          icon: Trash2,
                          variant: "destructive",
                          disabled: pending,
                          onClick: () => setDeleteTarget(estimate),
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {viewingId && (
        <EstimateDetailModal
          estimateId={viewingId}
          onClose={() => setViewingId(null)}
        />
      )}

      <DeleteDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete estimate"
        description="This will permanently delete this property valuation. This action cannot be undone."
      />
    </div>
  );
}
