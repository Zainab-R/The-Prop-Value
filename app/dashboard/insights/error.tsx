"use client";

import RouteErrorFallback from "@/components/shared/RouteErrorFallback";

export default function InsightsError({
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
      title="Couldn't load market insights"
      description="We couldn't load current market rates. Please try again."
    />
  );
}
