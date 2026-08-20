"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SquarePen, Trash2 } from "lucide-react";

import EditLuxuryRateModal from "@/components/admin/EditLuxuryRateModal";
import DeleteDialog from "@/components/admin/DeleteDialog";
import RowActionsMenu from "@/components/shared/RowActionsMenu";
import { deleteLuxuryRate } from "@/app/admin/luxury-rates/actions";

interface LuxuryRate {
  id: string;
  level: string;
  multiplier: number;
}

interface LuxuryRatesTableProps {
  rates: LuxuryRate[];
}

export default function LuxuryRatesTable({
  rates,
}: LuxuryRatesTableProps) {
  const router = useRouter();

  const [selectedRate, setSelectedRate] =
    useState<LuxuryRate | null>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!selectedRate) return;

    try {
      setDeleting(true);

      await deleteLuxuryRate(selectedRate.id);

      toast.success("Luxury rate deleted.");
      setDeleteOpen(false);
      setSelectedRate(null);

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete luxury rate."
      );
    } finally {
      setDeleting(false);
    }
  };

  if (rates.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <h3 className="text-lg font-semibold text-slate-800">
          No Luxury Rates Found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Click <strong>Add Luxury Rate</strong> to create your first
          luxury multiplier.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-600">
                  Luxury Level
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-600">
                  Multiplier
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wide text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {rates.map((rate) => (
                <tr
                  key={rate.id}
                  className="border-b last:border-none transition hover:bg-slate-50"
                >
                  <td className="px-6 py-5 font-medium text-slate-700">
                    {rate.level}
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                      {rate.multiplier.toFixed(2)}×
                    </span>
                  </td>

                  <td className="px-6 py-5 text-right">
                    <RowActionsMenu
                      ariaLabel="Luxury rate actions"
                      actions={[
                        {
                          label: "Edit",
                          icon: SquarePen,
                          onClick: () => {
                            setSelectedRate(rate);
                            setEditOpen(true);
                          },
                        },
                        {
                          label: "Delete",
                          icon: Trash2,
                          variant: "destructive",
                          onClick: () => {
                            setSelectedRate(rate);
                            setDeleteOpen(true);
                          },
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      <EditLuxuryRateModal
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelectedRate(null);
        }}
        rate={selectedRate}
      />

      {/* Delete Dialog */}
      <DeleteDialog
        open={deleteOpen}
        onClose={() => {
          if (!deleting) {
            setDeleteOpen(false);
            setSelectedRate(null);
          }
        }}
        onConfirm={handleDelete}
        title="Delete luxury rate"
        description={
          selectedRate
            ? `Are you sure you want to delete "${selectedRate.level}"? This action cannot be undone.`
            : undefined
        }
      />
    </>
  );
}