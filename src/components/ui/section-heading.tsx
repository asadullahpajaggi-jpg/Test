import { Heading, Subtitle } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Used for the heading `id`; pair with `aria-labelledby` on the section. */
  id: string;
  title: string;
  description?: string;
  /** Optional right-aligned action (e.g. a "View all" button) on wider screens. */
  action?: React.ReactNode;
  className?: string;
};

/** Consistent heading + subtitle (+ optional action) block for page sections. */
export function SectionHeading({
  id,
  title,
  description,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="flex max-w-2xl flex-col gap-4">
        <Heading as="h2" id={id} className="text-balance">
          {title}
        </Heading>
        {description ? <Subtitle>{description}</Subtitle> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
