"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
        <AlertTriangle className="h-7 w-7 text-red-500" />
      </div>

      <h2 className="text-xl font-semibold text-primary">
        Something went wrong
      </h2>

      <p className="mt-2 max-w-md text-slate-500">
        This admin page failed to load. Try again, or check the server
        logs if the problem persists.
      </p>

      <button
        onClick={reset}
        className="mt-6 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-[#0F2E56]"
      >
        Try again
      </button>
    </div>
  );
}
