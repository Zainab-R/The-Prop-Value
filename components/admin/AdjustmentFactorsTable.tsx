"use client";

import { useState } from "react";
import { SquarePen } from "lucide-react";

import EditAdjustmentFactorModal from "@/components/admin/EditAdjustmentFactorModal";
import RowActionsMenu from "@/components/shared/RowActionsMenu";

interface AdjustmentFactor {
  id: string;
  key: string;
  label: string;
  multiplier: number;
}

interface AdjustmentFactorsTableProps {
  factors: AdjustmentFactor[];
}

export default function AdjustmentFactorsTable({
  factors,
}: AdjustmentFactorsTableProps) {
  const [selectedFactor, setSelectedFactor] = useState<AdjustmentFactor | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  if (factors.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <h3 className="text-lg font-semibold text-slate-800">
          No Adjustment Factors Found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Run the latest database migration to seed the default factors.
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
                  Factor
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
              {factors.map((factor) => {
                const percent = Math.round((factor.multiplier - 1) * 100);

                return (
                  <tr
                    key={factor.id}
                    className="border-b last:border-none transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5 font-medium text-slate-700">
                      {factor.label}
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                        {factor.multiplier.toFixed(2)}× ({percent >= 0 ? "+" : ""}
                        {percent}%)
                      </span>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <RowActionsMenu
                        ariaLabel="Adjustment factor actions"
                        actions={[
                          {
                            label: "Edit",
                            icon: SquarePen,
                            onClick: () => {
                              setSelectedFactor(factor);
                              setEditOpen(true);
                            },
                          },
                        ]}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <EditAdjustmentFactorModal
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelectedFactor(null);
        }}
        factor={selectedFactor}
      />
    </>
  );
}
