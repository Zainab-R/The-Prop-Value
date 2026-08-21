"use client";

import { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import toast from "react-hot-toast";

interface SaveToggleButtonProps {
  estimateId: string;
  initialSaved: boolean;
}

export default function SaveToggleButton({
  estimateId,
  initialSaved,
}: SaveToggleButtonProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [pending, setPending] = useState(false);

  async function handleToggle() {
    const next = !saved;

    try {
      setPending(true);

      const res = await fetch(`/api/history/${estimateId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isSaved: next }),
      });

      if (!res.ok) throw new Error();

      setSaved(next);
      toast.success(next ? "Saved to your properties." : "Removed from saved properties.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={pending}
      className={`btn-anim inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
        saved
          ? "border-accent bg-accent/10 text-accent"
          : "border-white/30 text-white hover:bg-white/10"
      }`}
    >
      {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
      {saved ? "Saved" : "Save Property"}
    </button>
  );
}
