"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";

import {
  createAmenity,
  updateAmenity,
  deleteAmenity,
} from "./actions";
import DeleteDialog from "@/components/admin/DeleteDialog";
import RowActionsMenu from "@/components/shared/RowActionsMenu";

type Amenity = {
  id: string;
  name: string;
  value: number;
};

type Props = {
  initialAmenities: Amenity[];
};

export default function AmenityManager({
  initialAmenities,
}: Props) {
  const [amenities, setAmenities] = useState(initialAmenities);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAmenity, setEditingAmenity] =
    useState<Amenity | null>(null);

  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Amenity | null>(null);

  const openAddModal = () => {
    setEditingAmenity(null);
    setName("");
    setValue("");
    setIsModalOpen(true);
  };

  const openEditModal = (amenity: Amenity) => {
    setEditingAmenity(amenity);
    setName(amenity.name);
    setValue(String(amenity.value));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSaving) return;

    setIsModalOpen(false);
    setEditingAmenity(null);
    setName("");
    setValue("");
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const numericValue = Number(value);

    if (!trimmedName) {
      toast.error("Please enter an amenity name.");
      return;
    }

    if (!value || !Number.isFinite(numericValue) || numericValue <= 0) {
      toast.error("Please enter a valid value greater than 0.");
      return;
    }

    setIsSaving(true);

    try {
      if (editingAmenity) {
        await updateAmenity(
          editingAmenity.id,
          trimmedName,
          numericValue
        );

        setAmenities((current) =>
          current.map((amenity) =>
            amenity.id === editingAmenity.id
              ? {
                  ...amenity,
                  name: trimmedName,
                  value: numericValue,
                }
              : amenity
          )
        );

        toast.success("Amenity updated successfully.");
      } else {
        const created = await createAmenity(
          trimmedName,
          numericValue
        );

        setAmenities((current) => [...current, created]);

        toast.success("Amenity added successfully.");
      }

      closeModal();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong.";

      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    const id = deleteTarget.id;
    setDeleteTarget(null);
    setDeletingId(id);

    try {
      await deleteAmenity(id);

      setAmenities((current) =>
        current.filter((amenity) => amenity.id !== id)
      );

      toast.success("Amenity deleted successfully.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to delete amenity.";

      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-end">
        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 font-medium text-white transition hover:bg-[#ea580c]"
        >
          <Plus size={20} />
          Add Amenity
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Amenity
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Value
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {amenities.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-12 text-center"
                  >
                    <div className="text-slate-500">
                      <p className="text-base font-medium">
                        No amenities found
                      </p>

                      <p className="mt-1 text-sm">
                        Add your first amenity to get started.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                amenities.map((amenity) => (
                  <tr
                    key={amenity.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <span className="font-medium text-[#173F73]">
                        {amenity.name}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-slate-700">
                      {amenity.value.toLocaleString()}
                    </td>

                    <td className="px-6 py-5 text-right">
                      <RowActionsMenu
                        ariaLabel="Amenity actions"
                        actions={[
                          {
                            label: "Edit",
                            icon: Pencil,
                            onClick: () => openEditModal(amenity),
                          },
                          {
                            label: "Delete",
                            icon: Trash2,
                            variant: "destructive",
                            disabled: deletingId === amenity.id,
                            onClick: () => setDeleteTarget(amenity),
                          },
                        ]}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#173F73]">
                  {editingAmenity
                    ? "Edit Amenity"
                    : "Add Amenity"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingAmenity
                    ? "Update the amenity details."
                    : "Add a new amenity rate."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={isSaving}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="amenity-name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Amenity Name
                </label>

                <input
                  id="amenity-name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="e.g. Park Facing"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#173F73] focus:ring-2 focus:ring-[#173F73]/10"
                  disabled={isSaving}
                />
              </div>

              <div>
                <label
                  htmlFor="amenity-value"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Value
                </label>

                <input
                  id="amenity-value"
                  type="number"
                  min="0"
                  step="0.01"
                  value={value}
                  onChange={(event) =>
                    setValue(event.target.value)
                  }
                  placeholder="e.g. 500000"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#173F73] focus:ring-2 focus:ring-[#173F73]/10"
                  disabled={isSaving}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isSaving}
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-xl bg-[#F97316] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#ea580c] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving
                    ? "Saving..."
                    : editingAmenity
                    ? "Update Amenity"
                    : "Add Amenity"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete amenity"
        description={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`
            : undefined
        }
      />
    </>
  );
}