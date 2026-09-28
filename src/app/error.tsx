"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/**
 * Route-level error boundary. Next.js renders this in place of a
 * segment when that segment (or its children) throws during render.
 * It does not catch errors from the root layout — see global-error.tsx
 * for that case.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Centralized place to wire up error reporting (e.g. Sentry) later.
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-medium">Something went wrong</h1>
      <p className="max-w-md text-[var(--foreground-muted)]">
        The page ran into an unexpected error. You can try again, or head
        back to the homepage.
      </p>
      <div className="mt-2 flex gap-3">
        <Button onClick={reset} variant="primary">
          Try again
        </Button>
        <Button href="/" variant="outline">
          Back to home
        </Button>
      </div>
    </Container>
  );
}
