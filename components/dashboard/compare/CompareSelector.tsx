"use client";
import DifferenceCards from "./DifferenceCards";

import { useState } from "react";
import dynamic from "next/dynamic";
import ComparisonTable from "./ComparisonTable";
import ChartSkeleton from "@/components/shared/ChartSkeleton";

const PriceChart = dynamic(() => import("./PriceChart"), {
  loading: () => <ChartSkeleton height={280} />,
  ssr: false,
});

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

export default function CompareSelector({
  estimates,
}: Props) {
  const [firstId, setFirstId] = useState("");
  const [secondId, setSecondId] = useState("");

  const firstProperty = estimates.find(
    (estimate) => estimate.id === firstId
  );

  const secondProperty = estimates.find(
    (estimate) => estimate.id === secondId
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="compare-first" className="mb-2 block text-sm font-medium text-slate-700">
            First Property
          </label>
          <select
            id="compare-first"
            value={firstId}
            onChange={(e) => setFirstId(e.target.value)}
            className="w-full rounded-xl border p-3"
          >
            <option value="">Select First Property</option>

            {estimates.map((estimate) => (
              <option
                key={estimate.id}
                value={estimate.id}
              >
                {estimate.sector} • {estimate.propertyType} •{" "}
                {estimate.propertySize}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="compare-second" className="mb-2 block text-sm font-medium text-slate-700">
            Second Property
          </label>
          <select
            id="compare-second"
            value={secondId}
            onChange={(e) => setSecondId(e.target.value)}
            className="w-full rounded-xl border p-3"
          >
            <option value="">Select Second Property</option>

            {estimates.map((estimate) => (
              <option
                key={estimate.id}
                value={estimate.id}
              >
                {estimate.sector} • {estimate.propertyType} •{" "}
                {estimate.propertySize}
              </option>
            ))}
          </select>
        </div>
      </div>

     {firstProperty && secondProperty && (
  <div className="space-y-6">
  <DifferenceCards
    first={firstProperty}
    second={secondProperty}
  />

  <PriceChart
    first={firstProperty}
    second={secondProperty}
  />

  <ComparisonTable
    first={firstProperty}
    second={secondProperty}
  />
</div>
)}
    </div>
  );
}