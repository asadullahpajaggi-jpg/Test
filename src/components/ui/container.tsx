import { cn } from "@/lib/utils";

type ContainerTag = "div" | "section" | "header" | "footer" | "nav" | "main" | "article";

type ContainerProps = React.HTMLAttributes<HTMLElement> & {
  /** "content" (1152px) for prose/sections, "wide" (1440px) for full-bleed sections. */
  width?: "content" | "wide";
  as?: ContainerTag;
};

export function Container({
  width = "content",
  as: Tag = "div",
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        width === "content" ? "container-content" : "container-wide",
        className,
      )}
      {...props}
    />
  );
}
