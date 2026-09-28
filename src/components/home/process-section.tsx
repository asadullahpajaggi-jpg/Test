import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Heading } from "@/components/ui/typography";
import type { HomeContent } from "@/types/home";

export function ProcessSection({ content }: { content: HomeContent["process"] }) {
  return (
    <Section
      aria-labelledby="process-heading"
      className="border-y border-[var(--border)] bg-[var(--surface-muted)]"
    >
      <div className="flex flex-col gap-10 md:gap-14">
        <SectionHeading
          id="process-heading"
          title={content.title}
          description={content.description}
        />
        <ol role="list" className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step, index) => (
            <li
              key={step.id}
              className="relative flex gap-4 lg:flex-col lg:gap-5 lg:before:absolute lg:before:-right-4 lg:before:left-14 lg:before:top-5 lg:before:h-px lg:before:bg-[var(--border)] lg:before:content-[''] lg:last:before:hidden"
            >
              <span
                aria-hidden="true"
                className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--surface)] font-[family-name:var(--font-display)] text-sm text-[var(--accent-text)]"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2">
                <Heading as="h3" className="text-xl md:text-xl">
                  {step.title}
                </Heading>
                <p className="text-[var(--foreground-muted)]">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
