import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/portfolio/project-card";
import type { HomeContent } from "@/types/home";

export function FeaturedWork({ content }: { content: HomeContent["featuredWork"] }) {
  return (
    <Section
      aria-labelledby="work-heading"
      className="border-y border-[var(--border)] bg-[var(--surface-muted)]"
    >
      <div className="flex flex-col gap-10 md:gap-14">
        <SectionHeading
          id="work-heading"
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
          {content.items.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} href={content.viewAll.href} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
