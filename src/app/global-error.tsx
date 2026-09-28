"use client";

import { useEffect } from "react";

/**
 * Catches errors thrown by the root layout itself, which error.tsx
 * cannot do. Must render its own <html>/<body> since the root layout
 * is what failed. Kept dependency-free and inline-styled on purpose —
 * it cannot assume globals.css or fonts loaded successfully.
 */
export default function GlobalError({
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
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 500 }}>
          Something went wrong
        </h1>
        <p style={{ color: "#64676f", maxWidth: "28rem" }}>
          A critical error occurred while loading the site.
        </p>
        <button
          onClick={reset}
          style={{
            height: "2.75rem",
            padding: "0 1.25rem",
            borderRadius: "0.5rem",
            border: "1px solid #dcdde0",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
