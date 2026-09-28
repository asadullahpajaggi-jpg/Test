import { ChatIcon, ClockIcon, ShieldCheckIcon, TargetIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Heading } from "@/components/ui/typography";
import type { HomeContent, ValuePropIcon } from "@/types/home";

const icons: Record<ValuePropIcon, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  communication: ChatIcon,
  tailored: TargetIcon,
  quality: ShieldCheckIcon,
  delivery: ClockIcon,
};

export function WhyWorkWithMe({ content }: { content: HomeContent["whyWorkWithMe"] }) {
  return (
    <Section aria-labelledby="why-heading">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          id="why-heading"
          title={content.title}
          description={content.description}
          className="lg:sticky lg:top-28 lg:self-start"
        />
        <ul role="list" className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {content.items.map((item) => {
            const IconComponent = icons[item.icon];
            return (
              <li key={item.id} className="flex flex-col items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent-muted)] text-[var(--accent-text)]">
                  <IconComponent width={22} height={22} />
                </span>
                <Heading as="h3" className="text-xl md:text-xl">
                  {item.title}
                </Heading>
                <p className="text-[var(--foreground-muted)]">{item.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
