"use client";

interface MarketFiltersProps {
  sectors: string[];
  propertyTypes: string[];
  selectedSector: string;
  selectedPropertyType: string;
  onSectorChange: (value: string) => void;
  onPropertyTypeChange: (value: string) => void;
}

export default function MarketFilters({
  sectors,
  propertyTypes,
  selectedSector,
  selectedPropertyType,
  onSectorChange,
  onPropertyTypeChange,
}: MarketFiltersProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">
        Filter Market Rates
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <select
          value={selectedSector}
          onChange={(e) => onSectorChange(e.target.value)}
          className="rounded-lg border p-3"
        >
          <option value="">All Sectors</option>

          {sectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>

        <select
          value={selectedPropertyType}
          onChange={(e) => onPropertyTypeChange(e.target.value)}
          className="rounded-lg border p-3"
        >
          <option value="">All Property Types</option>

          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}