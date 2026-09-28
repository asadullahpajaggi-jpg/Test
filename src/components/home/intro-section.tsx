import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";
import type { HomeContent } from "@/types/home";

export function IntroSection({ content }: { content: HomeContent["intro"] }) {
  return (
    <Section
      aria-labelledby="intro-heading"
      className="border-y border-[var(--border)] bg-[var(--surface-muted)]"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-start gap-5">
          <Heading as="h2" id="intro-heading" className="text-balance">
            {content.title}
          </Heading>
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph} className="max-w-prose text-[var(--foreground-muted)]">
              {paragraph}
            </p>
          ))}
          <Link
            href={content.link.href}
            className="link group inline-flex items-center gap-1.5 font-medium text-[var(--accent-text)]"
          >
            {content.link.label}
            <ArrowRightIcon
              width={16}
              height={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <Card className="border-l-4 border-l-[var(--accent)] p-8 md:p-10">
          <p className="font-[family-name:var(--font-display)] text-2xl text-balance text-[var(--foreground)] md:text-3xl">
            {content.principle.text}
          </p>
          <p className="mt-5 text-sm text-[var(--foreground-muted)]">{content.principle.label}</p>
        </Card>
      </div>
    </Section>
  );
}
