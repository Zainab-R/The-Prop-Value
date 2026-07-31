"use client";

import { useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import HistoryCard from "./HistoryCard";

interface Estimate {
  id: string;
  sector: string;
  propertyType: string;
  propertySize: string;
  estimatedMin: string;
  estimatedMax: string;
  createdAt: string;
}

interface HistoryListProps {
  estimates: Estimate[];
}

export default function HistoryList({
  estimates,
}: HistoryListProps) {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [sort, setSort] = useState("newest");

  const sectors = [...new Set(estimates.map((e) => e.sector))];
  const propertyTypes = [
    ...new Set(estimates.map((e) => e.propertyType)),
  ];

  const filteredEstimates = useMemo(() => {
    const query = search.toLowerCase();

    let data = estimates.filter((estimate) => {
      const matchesSearch =
        estimate.sector.toLowerCase().includes(query) ||
        estimate.propertyType.toLowerCase().includes(query) ||
        estimate.propertySize.toLowerCase().includes(query);

      const matchesSector =
        !sector || estimate.sector === sector;

      const matchesProperty =
        !propertyType ||
        estimate.propertyType === propertyType;

      return (
        matchesSearch &&
        matchesSector &&
        matchesProperty
      );
    });

    data.sort((a, b) => {
      const first = new Date(a.createdAt).getTime();
      const second = new Date(b.createdAt).getTime();

      return sort === "newest"
        ? second - first
        : first - second;
    });

    return data;
  }, [search, sector, propertyType, sort, estimates]);

  return (
    <>
      <SearchBar
        value={search}
        onChange={setSearch}
      />

      <FilterBar
        sector={sector}
        propertyType={propertyType}
        sort={sort}
        onSectorChange={setSector}
        onPropertyTypeChange={setPropertyType}
        onSortChange={setSort}
        sectors={sectors}
        propertyTypes={propertyTypes}
      />

      <div className="grid gap-6">
        {filteredEstimates.map((estimate) => (
          <HistoryCard
  key={estimate.id}
  id={estimate.id}
  sector={estimate.sector}
  propertyType={estimate.propertyType}
  propertySize={estimate.propertySize}
  estimatedMin={estimate.estimatedMin}
  estimatedMax={estimate.estimatedMax}
  createdAt={new Date(estimate.createdAt)}
/>
        ))}
      </div>
    </>
  );
}