import { cn } from "@/lib/utils";

type HeadingTag = "h1" | "h2" | "h3" | "h4";

const headingSizes: Record<HeadingTag, string> = {
  h1: "text-4xl md:text-5xl",
  h2: "text-3xl md:text-4xl",
  h3: "text-2xl md:text-3xl",
  h4: "text-xl md:text-2xl",
};

type HeadingProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, "className"> & {
  className?: string;
  /** Which heading level to render and which size from the scale to use. Defaults to h2. */
  as?: HeadingTag;
};

/**
 * Consistent heading scale so every page pulls from the same sizes
 * instead of picking one-off `text-*` values per section.
 */
export function Heading({ as = "h2", className, ...props }: HeadingProps) {
  const Tag = as;
  return (
    <Tag
      className={cn(headingSizes[as], "text-[var(--foreground)]", className)}
      {...props}
    />
  );
}

/**
 * Supporting copy under a Heading — kept muted and line-length limited
 * (`max-w-prose`) for readability.
 */
export function Subtitle({
  className,
  ...props
}: Omit<React.HTMLAttributes<HTMLParagraphElement>, "className"> & {
  className?: string;
}) {
  return (
    <p
      className={cn("max-w-prose text-lg text-[var(--foreground-muted)]", className)}
      {...props}
    />
  );
}
