"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

interface RouteErrorFallbackProps {
  error: Error & { digest?: string };
  reset: () => void;
  title?: string;
  description?: string;
  accent?: "primary" | "orange";
}

export default function RouteErrorFallback({
  error,
  reset,
  title = "Something went wrong",
  description = "This page failed to load. Please try again.",
  accent = "orange",
}: RouteErrorFallbackProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
        <AlertTriangle className="h-7 w-7 text-red-500" />
      </div>

      <h2 className="text-xl font-semibold text-primary">{title}</h2>

      <p className="mt-2 max-w-md text-slate-500">{description}</p>

      <button
        onClick={reset}
        className={`btn-anim mt-6 rounded-xl px-6 py-3 font-semibold text-white ${
          accent === "primary" ? "bg-primary hover:bg-[#0F2E56]" : "bg-orange-500 hover:bg-orange-600"
        }`}
      >
        Try again
      </button>
    </div>
  );
}
