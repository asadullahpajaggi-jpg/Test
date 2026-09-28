/**
 * Route-level loading UI. Next.js renders this automatically while a
 * segment's data/server work is in flight. Kept intentionally quiet —
 * a single subtle pulse rather than a branded splash — since it can
 * appear on any page.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-[50vh] items-center justify-center"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />
    </div>
  );
}
