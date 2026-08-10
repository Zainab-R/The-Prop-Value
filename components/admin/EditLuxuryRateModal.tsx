"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import { updateLuxuryRate } from "@/app/admin/luxury-rates/actions";

interface LuxuryRate {
  id: string;
  level: string;
  multiplier: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  rate: LuxuryRate | null;
}

export default function EditLuxuryRateModal({
  open,
  onClose,
  rate,
}: Props) {
    if (!open || !rate) return null;
  const router = useRouter();

  const [level, setLevel] = useState("");
  const [multiplier, setMultiplier] = useState("");

  const [error, setError] = useState("");

  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (rate) {
      setLevel(rate.level);
      setMultiplier(rate.multiplier.toString());
    }
  }, [rate]);

  if (!open || !rate) return null;

  function handleUpdate() {
    setError("");

    startTransition(async () => {
      try {
        await updateLuxuryRate(
          rate!.id,
          level,
          Number(multiplier)
        );

        onClose();
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      }
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-semibold text-[#123A6D]">
            Edit Luxury Rate
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-5 p-6">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Luxury Level
            </label>

            <input
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Multiplier
            </label>

            <input
              type="number"
              step="0.01"
              value={multiplier}
              onChange={(e) => setMultiplier(e.target.value)}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

        </div>

        <div className="flex justify-end gap-3 border-t p-5">

          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-2"
          >
            Cancel
          </button>

          <button
            disabled={pending}
            onClick={handleUpdate}
            className="rounded-xl bg-[#123A6D] px-5 py-2 text-white disabled:opacity-50"
          >
            {pending ? "Updating..." : "Update"}
          </button>

        </div>

      </div>
    </div>
  );
}