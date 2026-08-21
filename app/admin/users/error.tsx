"use client";

import RouteErrorFallback from "@/components/shared/RouteErrorFallback";

export default function UsersError({
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
      title="Couldn't load users"
      description="We couldn't load the users list. Please try again."
    />
  );
}
