"use client";

import { useState } from "react";
import {
  CalendarDays,
  Building2,
  Ruler,
  Wallet,
  Trash2,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface HistoryCardProps {
  id: string;
  sector: string;
  propertyType: string;
  propertySize: string;
  estimatedMin: string;
  estimatedMax: string;
  createdAt: Date;
  isSaved?: boolean;
}

export default function HistoryCard({
  id,
  sector,
  propertyType,
  propertySize,
  estimatedMin,
  estimatedMax,
  createdAt,
  isSaved = false,
}: HistoryCardProps) {
  const router = useRouter();
  const [saved, setSaved] = useState(isSaved);
  const [savePending, setSavePending] = useState(false);

  const formatPrice = (value: string) =>
    new Intl.NumberFormat("en-PK").format(Number(value));

  const handleToggleSave = async () => {
    const next = !saved;

    try {
      setSavePending(true);

      const response = await fetch(`/api/history/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isSaved: next }),
      });

      if (!response.ok) throw new Error();

      setSaved(next);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update saved status.");
    } finally {
      setSavePending(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this estimate?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/history/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete estimate.");
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600">
            {propertyType}
          </span>

          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Sector {sector}
          </h2>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <CalendarDays size={18} />
          <span>
  {createdAt.toISOString().split("T")[0]}
</span>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-gray-50 p-4">
          <Building2
            className="mb-2 text-orange-500"
            size={22}
          />
          <p className="text-sm text-gray-500">
            Property Type
          </p>
          <p className="font-semibold">{propertyType}</p>
        </div>

        <div className="rounded-xl bg-gray-50 p-4">
          <Ruler
            className="mb-2 text-orange-500"
            size={22}
          />
          <p className="text-sm text-gray-500">
            Property Size
          </p>
          <p className="font-semibold">{propertySize}</p>
        </div>

        <div className="rounded-xl bg-orange-50 p-4">
          <Wallet
            className="mb-2 text-orange-500"
            size={22}
          />
          <p className="text-sm text-gray-500">
            Estimated Price
          </p>

          <p className="text-xl font-bold text-orange-600">
            PKR {formatPrice(estimatedMin)} -{" "}
            {formatPrice(estimatedMax)}
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={handleToggleSave}
          disabled={savePending}
          className={`flex items-center gap-2 rounded-lg border px-4 py-2 transition disabled:cursor-not-allowed disabled:opacity-60 ${
            saved
              ? "border-accent bg-accent/10 text-accent"
              : "border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          {saved ? "Saved" : "Save"}
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-red-600 transition hover:bg-red-50"
        >
          <Trash2 size={18} />
          Delete
        </button>
      </div>
    </div>
  );
}