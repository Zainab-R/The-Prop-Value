"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getEstimateDetail } from "@/app/admin/estimates/actions";

interface Props {
  estimateId: string;
  onClose: () => void;
}

interface EstimateDetail {
  sector: string;
  propertyType: string;
  propertySize: string;
  villaType: string | null;
  constructionStatus: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  furnished: boolean | null;
  luxuryLevel: string | null;
  cornerPlot: boolean;
  mainBoulevard: boolean;
  parkFacing: boolean;
  amenities: unknown;
  estimatedMin: number;
  estimatedMax: number;
  createdAt: Date;
  user: { name: string | null; email: string };
}

export default function EstimateDetailModal({ estimateId, onClose }: Props) {
  const [estimate, setEstimate] = useState<EstimateDetail | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getEstimateDetail(estimateId)
      .then((data) => setEstimate(data as unknown as EstimateDetail))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load estimate.")
      );
  }, [estimateId]);

  const amenities = Array.isArray(estimate?.amenities)
    ? (estimate.amenities as string[])
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-semibold text-primary">
            Estimate Details
          </h2>
          <button onClick={onClose} aria-label="Close">
            <X />
          </button>
        </div>

        <div className="max-h-[70vh] space-y-4 overflow-y-auto p-6">
          {error && <p className="text-sm text-red-600">{error}</p>}

          {!estimate && !error && (
            <div className="space-y-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-5 animate-pulse rounded bg-slate-100" />
              ))}
            </div>
          )}

          {estimate && (
            <>
              <div>
                <p className="text-sm text-slate-500">Requested by</p>
                <p className="font-semibold text-primary">
                  {estimate.user.name || "Unnamed"} ({estimate.user.email})
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Sector</p>
                  <p className="font-medium">{estimate.sector}</p>
                </div>
                <div>
                  <p className="text-slate-500">Property Type</p>
                  <p className="font-medium">{estimate.propertyType}</p>
                </div>
                <div>
                  <p className="text-slate-500">Size</p>
                  <p className="font-medium">{estimate.propertySize}</p>
                </div>
                {estimate.villaType && (
                  <div>
                    <p className="text-slate-500">Housing Society</p>
                    <p className="font-medium">{estimate.villaType}</p>
                  </div>
                )}
                <div>
                  <p className="text-slate-500">Luxury Level</p>
                  <p className="font-medium">{estimate.luxuryLevel || "-"}</p>
                </div>
                {estimate.bedrooms != null && (
                  <div>
                    <p className="text-slate-500">Bedrooms</p>
                    <p className="font-medium">{estimate.bedrooms}</p>
                  </div>
                )}
                {estimate.bathrooms != null && (
                  <div>
                    <p className="text-slate-500">Bathrooms</p>
                    <p className="font-medium">{estimate.bathrooms}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                {estimate.cornerPlot && (
                  <span className="rounded-full bg-slate-100 px-3 py-1">Corner Plot</span>
                )}
                {estimate.parkFacing && (
                  <span className="rounded-full bg-slate-100 px-3 py-1">Park Facing</span>
                )}
                {estimate.mainBoulevard && (
                  <span className="rounded-full bg-slate-100 px-3 py-1">Main Boulevard</span>
                )}
                {amenities.map((a) => (
                  <span key={a} className="rounded-full bg-orange-50 px-3 py-1 text-orange-600">
                    {a}
                  </span>
                ))}
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Estimated Range</p>
                <p className="text-lg font-bold text-primary">
                  Rs. {estimate.estimatedMin.toLocaleString()} – Rs.{" "}
                  {estimate.estimatedMax.toLocaleString()}
                </p>
              </div>

              <p className="text-xs text-slate-400">
                Requested on {new Date(estimate.createdAt).toLocaleDateString()}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
