"use client";

import RouteErrorFallback from "@/components/shared/RouteErrorFallback";

export default function HistoryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteErrorFallback
      error={error}
      reset={reset}
      title="Couldn't load your history"
      description="We couldn't load your estimate history. Please try again."
    />
  );
}
