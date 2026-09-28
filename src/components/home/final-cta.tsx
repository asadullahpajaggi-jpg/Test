import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";
import type { HomeContent } from "@/types/home";

/** Closing call-to-action. Uses an inverted surface so it reads clearly in both themes. */
export function FinalCta({ content }: { content: HomeContent["finalCta"] }) {
  return (
    <Section aria-labelledby="cta-heading">
      <div className="relative isolate overflow-hidden rounded-[var(--radius-xl)] bg-[var(--foreground)] px-6 py-14 text-center md:px-14 md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-1/2 -z-10 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-25 blur-3xl"
        />
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5">
          <Heading as="h2" id="cta-heading" className="text-balance text-[var(--background)]">
            {content.title}
          </Heading>
          <p className="max-w-prose text-lg text-[var(--background)]/80">{content.description}</p>
          <div className="mt-3 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Button href={content.primaryCta.href} size="lg">
              {content.primaryCta.label}
              <ArrowRightIcon width={18} height={18} />
            </Button>
            <Button
              href={content.secondaryCta.href}
              size="lg"
              variant="outline"
              className="border-[var(--background)]/30 text-[var(--background)] hover:bg-[var(--background)]/10"
            >
              {content.secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
