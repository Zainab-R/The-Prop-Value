"use client";

import { useMemo, useState } from "react";

import MarketFilters from "./MarketFilters";
import MarketOverview from "./MarketOverview";
import MarketTable from "./MarketTable";
import SectorTrends from "./SectorTrends";
import TopSectors from "./TopSectors";

interface Rate {
  id: string;
  sector: string;
  propertyType: string;
  propertySize: string;
  basePrice: number;
}

interface Props {
  rates: Rate[];
}

export default function MarketContent({ rates }: Props) {
  const [sector, setSector] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const filteredRates = useMemo(() => {
    return rates.filter((rate) => {
      const matchesSector =
        !sector || rate.sector === sector;

      const matchesType =
        !propertyType ||
        rate.propertyType === propertyType;

      return matchesSector && matchesType;
    });
  }, [rates, sector, propertyType]);

  const sectors = [...new Set(rates.map((r) => r.sector))];

  const propertyTypes = [
    ...new Set(rates.map((r) => r.propertyType)),
  ];

  return (
    <div className="space-y-8">
      <MarketFilters
        sectors={sectors}
        propertyTypes={propertyTypes}
        selectedSector={sector}
        selectedPropertyType={propertyType}
        onSectorChange={setSector}
        onPropertyTypeChange={setPropertyType}
      />

      <MarketOverview rates={filteredRates} />

      <MarketTable rates={filteredRates} />

      <SectorTrends rates={filteredRates} />

      <TopSectors rates={filteredRates} />
    </div>
  );
}