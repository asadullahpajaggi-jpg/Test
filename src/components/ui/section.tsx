import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type SectionProps = Omit<React.HTMLAttributes<HTMLElement>, "className"> & {
  className?: string;
  /** Passed through to the inner Container. */
  containerWidth?: "content" | "wide";
  /** Render as <section> (default) or a plain <div> when nesting inside another section. */
  as?: "section" | "div";
};

/**
 * Consistent section rhythm: every section on the site should use this
 * (rather than one-off `py-*` values) so vertical spacing stays uniform
 * as more pages are added.
 */
export function Section({
  containerWidth = "content",
  as: Tag = "section",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "py-[var(--spacing-section-sm)] md:py-[var(--spacing-section)]",
        className,
      )}
      {...props}
    >
      <Container width={containerWidth}>{children}</Container>
    </Tag>
  );
}
