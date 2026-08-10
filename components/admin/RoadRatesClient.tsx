"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, SquarePen, Trash2, Route } from "lucide-react";
import toast from "react-hot-toast";

import {
  createRoadRate,
  updateRoadRate,
  deleteRoadRate,
} from "@/app/admin/road-rates/actions";

interface RoadRate {
  id: string;
  roadType: string;
  multiplier: number;
}

interface RoadRatesClientProps {
  rates: RoadRate[];
}

export default function RoadRatesClient({
  rates,
}: RoadRatesClientProps) {
  const router = useRouter();

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedRate, setSelectedRate] =
    useState<RoadRate | null>(null);

  const [roadType, setRoadType] = useState("");
  const [multiplier, setMultiplier] = useState("");

  const [loading, setLoading] = useState(false);

  // =========================
  // ADD ROAD RATE
  // =========================
  const handleAdd = async () => {
    const name = roadType.trim();
    const value = Number(multiplier);

    if (!name) {
      toast.error("Road type is required.");
      return;
    }

    if (!multiplier.trim()) {
      toast.error("Multiplier is required.");
      return;
    }

    if (!Number.isFinite(value) || value <= 0) {
      toast.error("Multiplier must be greater than 0.");
      return;
    }

    try {
      setLoading(true);

      await createRoadRate(name, value);

      toast.success("Road rate added successfully.");

      setRoadType("");
      setMultiplier("");
      setAddOpen(false);

      router.refresh();
    } catch (error) {
      console.error("Add road rate error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to add road rate."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // OPEN EDIT
  // =========================
  const openEdit = (rate: RoadRate) => {
    setSelectedRate(rate);
    setRoadType(rate.roadType);
    setMultiplier(rate.multiplier.toString());
    setEditOpen(true);
  };

  // =========================
  // UPDATE ROAD RATE
  // =========================
  const handleEdit = async () => {
    if (!selectedRate) return;

    const name = roadType.trim();
    const value = Number(multiplier);

    if (!name) {
      toast.error("Road type is required.");
      return;
    }

    if (!multiplier.trim()) {
      toast.error("Multiplier is required.");
      return;
    }

    if (!Number.isFinite(value) || value <= 0) {
      toast.error("Multiplier must be greater than 0.");
      return;
    }

    try {
      setLoading(true);

      await updateRoadRate(
        selectedRate.id,
        name,
        value
      );

      toast.success("Road rate updated successfully.");

      setEditOpen(false);
      setSelectedRate(null);
      setRoadType("");
      setMultiplier("");

      router.refresh();
    } catch (error) {
      console.error("Update road rate error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update road rate."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // OPEN DELETE
  // =========================
  const openDelete = (rate: RoadRate) => {
    setSelectedRate(rate);
    setDeleteOpen(true);
  };

  // =========================
  // DELETE ROAD RATE
  // =========================
  const handleDelete = async () => {
    if (!selectedRate) return;

    try {
      setLoading(true);

      await deleteRoadRate(selectedRate.id);

      toast.success("Road rate deleted successfully.");

      setDeleteOpen(false);
      setSelectedRate(null);

      router.refresh();
    } catch (error) {
      console.error("Delete road rate error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete road rate."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CLOSE MODALS
  // =========================
  const closeAdd = () => {
    if (loading) return;

    setAddOpen(false);
    setRoadType("");
    setMultiplier("");
  };

  const closeEdit = () => {
    if (loading) return;

    setEditOpen(false);
    setSelectedRate(null);
    setRoadType("");
    setMultiplier("");
  };

  const closeDelete = () => {
    if (loading) return;

    setDeleteOpen(false);
    setSelectedRate(null);
  };

  return (
    <div className="w-full">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}
      <div className="mb-8 overflow-hidden rounded-[30px] bg-gradient-to-r from-[#17477F] to-[#2864AA] px-10 py-10 text-white shadow-xl">

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

          <div>

            {/* Icon + Heading */}
            <div className="flex items-center gap-4">

              <Route
                className="h-11 w-11 text-yellow-300"
                strokeWidth={2.2}
              />

              <h1 className="text-4xl font-bold tracking-tight">
                Road Rates
              </h1>

            </div>

            {/* Description */}
            <p className="mt-4 max-w-2xl text-lg text-blue-100">
              Configure road type multipliers used during
              property valuation.
            </p>

            {/* Count */}
            <div className="mt-7 inline-flex rounded-full bg-white/20 px-5 py-3 text-base font-semibold backdrop-blur-sm">
              {rates.length}{" "}
              {rates.length === 1
                ? "Road Rate"
                : "Road Rates"}{" "}
              Configured
            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          ROAD RATES CARD
      ===================================================== */}
      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">

        {/* Card Header */}
        <div className="flex flex-col gap-4 border-b border-slate-200 px-7 py-6 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Road Rate Configuration
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage road-based rate adjustments used for
              property valuation.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="flex w-fit items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-orange-600 hover:shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Add Road Rate
          </button>

        </div>

        {/* =================================================
            TABLE
        ================================================= */}
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-7 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Road
                </th>

                <th className="px-7 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Rate
                </th>

                <th className="px-7 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {rates.length === 0 ? (

                <tr>

                  <td colSpan={3}>

                    <div className="px-6 py-16 text-center">

                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
                        <Route className="h-7 w-7 text-blue-600" />
                      </div>

                      <h2 className="mt-4 text-lg font-semibold text-slate-800">
                        No Road Rates Found
                      </h2>

                      <p className="mt-2 text-sm text-slate-500">
                        Click{" "}
                        <strong className="text-slate-700">
                          Add Road Rate
                        </strong>{" "}
                        to create your first road rate.
                      </p>

                      <button
                        type="button"
                        onClick={() => setAddOpen(true)}
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-orange-600"
                      >
                        <Plus className="h-4 w-4" />
                        Add Road Rate
                      </button>

                    </div>

                  </td>

                </tr>

              ) : (

                rates.map((rate) => (

                  <tr
                    key={rate.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50 last:border-none"
                  >

                    {/* Road */}
                    <td className="px-7 py-5">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                          <Route className="h-5 w-5 text-blue-600" />
                        </div>

                        <span className="font-medium text-slate-700">
                          {rate.roadType}
                        </span>

                      </div>

                    </td>

                    {/* Rate */}
                    <td className="px-7 py-5">

                      <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                        {rate.multiplier.toFixed(2)}×
                      </span>

                    </td>

                    {/* Actions */}
                    <td className="px-7 py-5">

                      <div className="flex justify-end gap-2">

                        <button
                          type="button"
                          onClick={() => openEdit(rate)}
                          className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-100"
                          title="Edit"
                        >
                          <SquarePen className="h-5 w-5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => openDelete(rate)}
                          className="rounded-lg p-2 text-red-600 transition hover:bg-red-100"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =====================================================
          ADD MODAL
      ===================================================== */}
      {addOpen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Add Road Rate
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add a new road-based multiplier.
                </p>
              </div>

              <button
                type="button"
                onClick={closeAdd}
                disabled={loading}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            <div className="space-y-5 px-6 py-6">

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Road Type
                </label>

                <input
                  type="text"
                  value={roadType}
                  onChange={(e) => setRoadType(e.target.value)}
                  placeholder="e.g. Main Boulevard"
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Multiplier
                </label>

                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={multiplier}
                  onChange={(e) => setMultiplier(e.target.value)}
                  placeholder="e.g. 1.25"
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">

              <button
                type="button"
                onClick={closeAdd}
                disabled={loading}
                className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleAdd}
                disabled={loading}
                className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60"
              >
                {loading ? "Adding..." : "Add Road Rate"}
              </button>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          EDIT MODAL
      ===================================================== */}
      {editOpen && selectedRate && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Edit Road Rate
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update the road rate configuration.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEdit}
                disabled={loading}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            <div className="space-y-5 px-6 py-6">

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Road Type
                </label>

                <input
                  type="text"
                  value={roadType}
                  onChange={(e) => setRoadType(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Multiplier
                </label>

                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={multiplier}
                  onChange={(e) => setMultiplier(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">

              <button
                type="button"
                onClick={closeEdit}
                disabled={loading}
                className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleEdit}
                disabled={loading}
                className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}
      {deleteOpen && selectedRate && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

            <div className="px-6 py-6">

              <h2 className="text-lg font-semibold text-slate-900">
                Delete Road Rate
              </h2>

              <p className="mt-3 text-sm text-slate-600">
                Are you sure you want to delete{" "}
                <strong>{selectedRate.roadType}</strong>?
              </p>

              <p className="mt-2 text-sm text-slate-500">
                This action cannot be undone.
              </p>

              <div className="mt-6 flex justify-end gap-3">

                <button
                  type="button"
                  onClick={closeDelete}
                  disabled={loading}
                  className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}