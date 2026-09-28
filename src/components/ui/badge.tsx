import { cn } from "@/lib/utils";

/** Small neutral pill, e.g. the "Sample" marker on placeholder content. */
export function Badge({
  className,
  ...props
}: Omit<React.HTMLAttributes<HTMLSpanElement>, "className"> & {
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-0.5 text-xs font-medium text-[var(--foreground-muted)]",
        className,
      )}
      {...props}
    />
  );
}
