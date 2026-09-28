import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/services/service-card";
import type { HomeContent } from "@/types/home";

export function ServicesPreview({ content }: { content: HomeContent["services"] }) {
  return (
    <Section aria-labelledby="services-heading">
      <div className="flex flex-col gap-10 md:gap-14">
        <SectionHeading
          id="services-heading"
          title={content.title}
          description={content.description}
          action={
            <Button href={content.viewAll.href} variant="outline">
              {content.viewAll.label}
              <ArrowRightIcon width={16} height={16} />
            </Button>
          }
        />
        <ul role="list" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((service) => (
            <li key={service.id}>
              <ServiceCard service={service} href={content.viewAll.href} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
