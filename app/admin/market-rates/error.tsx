"use client";

import RouteErrorFallback from "@/components/shared/RouteErrorFallback";

export default function MarketRatesError({
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
      title="Couldn't load market rates"
      description="We couldn't load the market rates table. Please try again."
    />
  );
}
