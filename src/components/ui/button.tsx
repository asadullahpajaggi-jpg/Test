import { type VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Button foundation: defines *how* a button can look, independent of any
 * page copy. Exported so non-<Button> elements (e.g. the menu toggle)
 * can share exactly the same styling.
 */
export const buttonStyles = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-[var(--radius-sm)] text-sm font-medium",
    "transition-colors duration-150 ease-[var(--ease-out-soft)]",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        // --accent-text (not --accent) so label text meets AA contrast in light mode.
        primary:
          "bg-[var(--accent-text)] text-[var(--accent-foreground)] hover:opacity-90",
        secondary:
          "bg-[var(--surface-muted)] text-[var(--foreground)] hover:bg-[var(--border)]",
        outline:
          "border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface-muted)]",
        ghost: "text-[var(--foreground)] hover:bg-[var(--surface-muted)]",
      },
      size: {
        sm: "h-9 px-3.5",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10 shrink-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonStyles> & {
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Renders a <button> by default, or a Next.js <Link> when given an
 * `href` — one component covers both cases so call sites never have to
 * choose between "Button" and "LinkButton".
 */
export function Button({ className, variant, size, ...props }: ButtonProps) {
  const classes = cn(buttonStyles({ variant, size }), className);

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;
    return <Link href={href} className={classes} {...anchorProps} />;
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return <button type="button" className={classes} {...buttonProps} />;
}
