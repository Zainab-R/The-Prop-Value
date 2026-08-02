"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Pencil, Trash2, Plus } from "lucide-react";

import {
  deleteMarketRate,
  updateMarketRate,
  createMarketRate,
} from "@/app/admin/market-rates/actions";

import EditMarketRateModal from "./EditMarketRateModal";
import AddMarketRateModal from "./AddMarketRateModal";

interface Rate {
  id: string;
  sector: string;
  propertyType: string;
  propertySize: string;
  basePrice: number;
  updatedAt: Date;
}

interface Props {
  rates: Rate[];
}

export default function MarketRatesTable({
  rates,
}: Props) {
  const [search, setSearch] = useState("");
  const [editingRate, setEditingRate] = useState<Rate | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const router = useRouter();

  const filteredRates = useMemo(() => {
    return rates.filter((rate) =>
      `${rate.sector} ${rate.propertyType} ${rate.propertySize}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [rates, search]);

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <input
          placeholder="Search market rates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 rounded-xl border border-slate-300 px-4 py-3 focus:border-[#123A6D] focus:outline-none"
        />

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-xl bg-[#123A6D] px-5 py-3 text-white transition hover:bg-[#F97316]"
        >
          <Plus size={18} />
          Add Market Rate
        </button>

      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-[#123A6D] text-white">
            <tr>
              <th className="px-6 py-4 text-left">Sector</th>
              <th className="px-6 py-4 text-left">Property Type</th>
              <th className="px-6 py-4 text-left">Size</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-left">Updated</th>
              <th className="px-6 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {filteredRates.map((rate) => (
              <tr
                key={rate.id}
                className="border-t transition hover:bg-orange-50"
              >
                <td className="px-6 py-4">
                  {rate.sector}
                </td>

                <td className="px-6 py-4">
                  {rate.propertyType}
                </td>

                <td className="px-6 py-4">
                  {rate.propertySize}
                </td>

                <td className="px-6 py-4 font-semibold text-[#123A6D]">
                  Rs. {rate.basePrice.toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  {new Date(rate.updatedAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => setEditingRate(rate)}
                      className="rounded-lg border border-[#123A6D] p-2 text-[#123A6D] transition hover:bg-[#123A6D] hover:text-white"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={async () => {
                        const confirmed = window.confirm(
                          "Are you sure you want to delete this market rate?"
                        );

                        if (!confirmed) return;

                        try {
                          await deleteMarketRate(rate.id);

                          toast.success("Market rate deleted successfully!");
                          router.refresh();           
                        } catch (error) {
                          console.error(error);
                          toast.error("Failed to delete market rate.");
                        }
                      }}
                      className="rounded-lg border border-red-500 p-2 text-red-500 transition hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {showAddModal && (
  <AddMarketRateModal
    onClose={() => setShowAddModal(false)}
    onSave={async (data) => {
      try {
        await createMarketRate(data);

        toast.success("Market rate created successfully!");

        setShowAddModal(false);

        router.refresh();
      } catch (error) {
        console.error(error);

        toast.error("Failed to create market rate.");
      }
    }}
  />
)}

      {editingRate && (
        <EditMarketRateModal
          rate={editingRate}
          onClose={() => setEditingRate(null)}
          onSave={async (updatedRate) => {
          try {
            await updateMarketRate(updatedRate);

            toast.success("Market rate updated successfully!");

            setEditingRate(null);

            router.refresh();
            } catch (error) {
            console.error(error);

            toast.error("Failed to update market rate.");
            }
          }} 
        />
      )}

    </div>
  );
}