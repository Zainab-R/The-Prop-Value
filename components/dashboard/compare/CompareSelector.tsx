"use client";
import DifferenceCards from "./DifferenceCards";

import { useState } from "react";
import ComparisonTable from "./ComparisonTable";

import PriceChart from "./PriceChart";

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
        <select
          value={firstId}
          onChange={(e) => setFirstId(e.target.value)}
          className="rounded-xl border p-3"
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

        <select
          value={secondId}
          onChange={(e) => setSecondId(e.target.value)}
          className="rounded-xl border p-3"
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