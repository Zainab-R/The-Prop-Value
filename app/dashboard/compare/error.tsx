"use client";

import RouteErrorFallback from "@/components/shared/RouteErrorFallback";

export default function CompareError({
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
      title="Couldn't load comparison"
      description="We couldn't load your saved estimates for comparison. Please try again."
    />
  );
}
