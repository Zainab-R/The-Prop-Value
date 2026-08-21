"use client";

import RouteErrorFallback from "@/components/shared/RouteErrorFallback";

export default function EstimatesError({
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
      accent="primary"
      title="Couldn't load estimates"
      description="We couldn't load the estimates list. Please try again."
    />
  );
}
