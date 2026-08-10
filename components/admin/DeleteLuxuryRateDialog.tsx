"use client";

interface LuxuryRate {
  id: string;
  level: string;
  multiplier: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  rate: LuxuryRate | null;
}

export default function DeleteLuxuryRateDialog({
  open,
  onClose,
  onDelete,
  rate,
}: Props) {
  if (!open || !rate) return null;

  const handleDelete = () => {
    onDelete(rate.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <h2 className="text-xl font-semibold text-slate-900">
          Delete Luxury Rate
        </h2>

        {/* Message */}
        <p className="mt-3 text-slate-600">
          Are you sure you want to delete{" "}
          <strong className="font-semibold text-slate-900">
            {rate.level}
          </strong>
          ?
        </p>

        <p className="mt-2 text-sm text-slate-500">
          This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}