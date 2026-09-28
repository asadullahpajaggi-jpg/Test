"use client";

import { useTheme } from "@/components/providers/theme-provider";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Reuses the Phase 1 ThemeProvider/useTheme — no new theme system.
 * Shows the icon of the theme a click will switch *to* (sun while
 * dark, moon while light). The icon swap is done in CSS via the `dark`
 * variant (driven by the class the no-flash script sets on <html>), so
 * it is correct on first paint instead of waiting for React state.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(buttonStyles({ variant: "ghost", size: "icon" }), className)}
    >
      {/* Sun: visible in dark mode */}
      <svg
        className="hidden dark:block"
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 1.5v2M10 16.5v2M2.6 10h2M15.4 10h2M4.5 4.5l1.4 1.4M14.1 14.1l1.4 1.4M4.5 15.5l1.4-1.4M14.1 5.9l1.4-1.4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      {/* Moon: visible in light mode */}
      <svg
        className="block dark:hidden"
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M17 12.1A7 7 0 0 1 7.9 3a7 7 0 1 0 9.1 9.1Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
