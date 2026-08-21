"use client";
import DifferenceCards from "./DifferenceCards";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Plus, X } from "lucide-react";
import ComparisonTable from "./ComparisonTable";
import ChartSkeleton from "@/components/shared/ChartSkeleton";

const PriceChart = dynamic(() => import("./PriceChart"), {
  loading: () => <ChartSkeleton height={280} />,
  ssr: false,
});

const MIN_SLOTS = 2;
const MAX_SLOTS = 4;

interface Estimate {
  id: string;
  sector: string;
  propertyType: string;
  propertySize: string;
  estimatedMin: string;
  estimatedMax: string;
}

interface Props {
  estimates: Estimate[];
}

export default function CompareSelector({ estimates }: Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>(["", ""]);

  function handleSelect(index: number, id: string) {
    setSelectedIds((prev) => {
      const next = [...prev];
      next[index] = id;
      return next;
    });
  }

  function addSlot() {
    if (selectedIds.length >= MAX_SLOTS) return;
    setSelectedIds((prev) => [...prev, ""]);
  }

  function removeSlot(index: number) {
    if (selectedIds.length <= MIN_SLOTS) return;
    setSelectedIds((prev) => prev.filter((_, i) => i !== index));
  }

  const selectedEstimates = selectedIds
    .map((id) => estimates.find((estimate) => estimate.id === id))
    .filter((estimate): estimate is Estimate => Boolean(estimate))
    .map((estimate) => ({
      ...estimate,
      label: `${estimate.sector} • ${estimate.propertyType} • ${estimate.propertySize}`,
    }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {selectedIds.map((selectedId, index) => (
          <div key={index}>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor={`compare-${index}`}
                className="block text-sm font-medium text-slate-700"
              >
                Property {index + 1}
              </label>

              {selectedIds.length > MIN_SLOTS && (
                <button
                  type="button"
                  onClick={() => removeSlot(index)}
                  aria-label={`Remove property ${index + 1}`}
                  className="text-slate-400 hover:text-red-500"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <select
              id={`compare-${index}`}
              value={selectedId}
              onChange={(e) => handleSelect(index, e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option value="">Select Property</option>

              {estimates
                .filter(
                  (estimate) =>
                    estimate.id === selectedId || !selectedIds.includes(estimate.id)
                )
                .map((estimate) => (
                  <option key={estimate.id} value={estimate.id}>
                    {estimate.sector} • {estimate.propertyType} •{" "}
                    {estimate.propertySize}
                  </option>
                ))}
            </select>
          </div>
        ))}

        {selectedIds.length < MAX_SLOTS && (
          <div className="flex items-end">
            <button
              type="button"
              onClick={addSlot}
              className="btn-anim flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 p-3 text-sm font-medium text-slate-500 hover:border-accent hover:text-accent"
            >
              <Plus size={16} />
              Add Property
            </button>
          </div>
        )}
      </div>

      {selectedEstimates.length >= 2 && (
        <div className="space-y-6">
          <DifferenceCards estimates={selectedEstimates} />

          <PriceChart estimates={selectedEstimates} />

          <ComparisonTable estimates={selectedEstimates} />
        </div>
      )}
    </div>
  );
}
