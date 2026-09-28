import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

/**
 * Header → page content → footer, for every public-facing route.
 * Deliberately excludes not-found/error/loading, which stay minimal
 * (see src/app/not-found.tsx, error.tsx, global-error.tsx) rather than
 * being wrapped here, matching their existing Phase 1 behavior.
 */
export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[var(--radius-sm)] focus:bg-[var(--surface)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--foreground)] focus:shadow-[var(--shadow-md)]"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
