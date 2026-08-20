"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import SearchBar from "@/components/admin/SearchBar";
import LuxuryRatesTable from "@/components/admin/LuxuryRatesTable";
import AddLuxuryRateModal from "@/components/admin/AddLuxuryRateModal";

interface LuxuryRate {
  id: string;
  level: string;
  multiplier: number;
}

interface LuxuryRatesClientProps {
  rates: LuxuryRate[];
}

export default function LuxuryRatesClient({
  rates,
}: LuxuryRatesClientProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredRates = rates.filter((rate) =>
    rate.level.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:max-w-md">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search luxury level..."
          />
        </div>

        <div className="flex gap-3">
          <button className="rounded-xl border bg-white px-5 py-2.5 text-sm font-medium shadow-sm hover:bg-slate-50">
            Sort A–Z
          </button>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-white transition hover:bg-[#0F315D]"
          >
            <Plus className="h-5 w-5" />
            Add Luxury Rate
          </button>
        </div>
      </div>

      <LuxuryRatesTable rates={filteredRates} />

      <AddLuxuryRateModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}