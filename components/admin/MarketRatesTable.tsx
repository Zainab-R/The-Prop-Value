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
import DeleteDialog from "./DeleteDialog";
import RowActionsMenu from "@/components/shared/RowActionsMenu";

interface Rate {
  id: string;
  sector: string;
  propertyType: string;
  propertySize: string;
  basePrice: number;
  updatedAt: Date;
  villaType?: string | null;
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
  const [deleteTarget, setDeleteTarget] = useState<Rate | null>(null);
  const router = useRouter();

  function handleDelete() {
    if (!deleteTarget) return;

    const id = deleteTarget.id;
    setDeleteTarget(null);

    (async () => {
      try {
        await deleteMarketRate(id);
        toast.success("Market rate deleted successfully!");
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error ? error.message : "Failed to delete market rate."
        );
      }
    })();
  }

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
          className="w-80 rounded-xl border border-slate-300 px-4 py-3 focus:border-primary focus:outline-none"
        />

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-white transition hover:bg-[#F97316]"
        >
          <Plus size={18} />
          Add Market Rate
        </button>

      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-primary text-white">
            <tr>
              <th className="px-6 py-4 text-left">Sector</th>
              <th className="px-6 py-4 text-left">Housing Society</th>
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

                <td className="px-6 py-4 text-slate-500">
                  {rate.villaType || "-"}
                </td>

                <td className="px-6 py-4">
                  {rate.propertyType}
                </td>

                <td className="px-6 py-4">
                  {rate.propertySize}
                </td>

                <td className="px-6 py-4 font-semibold text-primary">
                  Rs. {rate.basePrice.toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  {new Date(rate.updatedAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-center">
                  <RowActionsMenu
                    ariaLabel="Market rate actions"
                    actions={[
                      {
                        label: "Edit",
                        icon: Pencil,
                        onClick: () => setEditingRate(rate),
                      },
                      {
                        label: "Delete",
                        icon: Trash2,
                        variant: "destructive",
                        onClick: () => setDeleteTarget(rate),
                      },
                    ]}
                  />
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

      <DeleteDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete market rate"
        description={
          deleteTarget
            ? `Are you sure you want to delete the rate for ${deleteTarget.propertyType} (${deleteTarget.propertySize}) in Sector ${deleteTarget.sector}? This action cannot be undone.`
            : undefined
        }
      />

    </div>
  );
}