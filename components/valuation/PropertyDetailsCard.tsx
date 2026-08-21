import { Building2, MapPin, Ruler, Home, Gem } from "lucide-react";

export interface PropertyDetailsData {
  propertyType: string;
  sector: string;
  propertySize: string;
  villaType?: string | null;
  luxuryLevel?: string | null;
  constructionStatus?: string | null;
  roadType?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  furnished?: boolean | null;
}

export default function PropertyDetailsCard({
  estimate,
  className = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
}: {
  estimate: PropertyDetailsData;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="mb-5 font-semibold text-primary">Property Details</h3>

      <dl className="space-y-4 text-sm">
        <div className="flex items-center justify-between">
          <dt className="flex items-center gap-2 text-slate-500">
            <Building2 size={16} /> Property Type
          </dt>
          <dd className="font-medium text-slate-900">{estimate.propertyType}</dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="flex items-center gap-2 text-slate-500">
            <MapPin size={16} /> Sector
          </dt>
          <dd className="font-medium text-slate-900">{estimate.sector}</dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="flex items-center gap-2 text-slate-500">
            <Ruler size={16} /> Size
          </dt>
          <dd className="font-medium text-slate-900">{estimate.propertySize}</dd>
        </div>

        {estimate.villaType && (
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-slate-500">
              <Home size={16} /> Housing Society
            </dt>
            <dd className="font-medium text-slate-900">{estimate.villaType}</dd>
          </div>
        )}

        {estimate.luxuryLevel && (
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-slate-500">
              <Gem size={16} /> Luxury Level
            </dt>
            <dd className="font-medium text-slate-900">{estimate.luxuryLevel}</dd>
          </div>
        )}

        {estimate.constructionStatus && (
          <div className="flex items-center justify-between">
            <dt className="text-slate-500">Construction Status</dt>
            <dd className="font-medium text-slate-900">{estimate.constructionStatus}</dd>
          </div>
        )}

        {estimate.roadType && (
          <div className="flex items-center justify-between">
            <dt className="text-slate-500">Road Type</dt>
            <dd className="font-medium text-slate-900">{estimate.roadType}</dd>
          </div>
        )}

        {(estimate.bedrooms != null || estimate.bathrooms != null) && (
          <div className="flex items-center justify-between">
            <dt className="text-slate-500">Bedrooms / Bathrooms</dt>
            <dd className="font-medium text-slate-900">
              {estimate.bedrooms ?? "-"} / {estimate.bathrooms ?? "-"}
            </dd>
          </div>
        )}

        {estimate.propertyType === "House" && (
          <div className="flex items-center justify-between">
            <dt className="text-slate-500">Furnished</dt>
            <dd className="font-medium text-slate-900">
              {estimate.furnished ? "Yes" : "No"}
            </dd>
          </div>
        )}
      </dl>

      <p className="mt-5 text-xs text-slate-400">
        Bedrooms, bathrooms, and furnishing are recorded for reference and
        don&apos;t currently affect the estimated value.
      </p>
    </div>
  );
}
