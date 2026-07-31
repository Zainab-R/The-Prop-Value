"use client";

interface FilterBarProps {
  sector: string;
  propertyType: string;
  sort: string;

  onSectorChange: (value: string) => void;
  onPropertyTypeChange: (value: string) => void;
  onSortChange: (value: string) => void;

  sectors: string[];
  propertyTypes: string[];
}

export default function FilterBar({
  sector,
  propertyType,
  sort,
  onSectorChange,
  onPropertyTypeChange,
  onSortChange,
  sectors,
  propertyTypes,
}: FilterBarProps) {
  return (
    <div className="mb-6 grid gap-4 md:grid-cols-3">
      <select
        value={sector}
        onChange={(e) => onSectorChange(e.target.value)}
        className="rounded-xl border border-gray-200 p-3"
      >
        <option value="">All Sectors</option>

        {sectors.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={propertyType}
        onChange={(e) => onPropertyTypeChange(e.target.value)}
        className="rounded-xl border border-gray-200 p-3"
      >
        <option value="">All Property Types</option>

        {propertyTypes.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded-xl border border-gray-200 p-3"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
}