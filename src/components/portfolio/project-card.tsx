import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRightIcon } from "@/components/ui/icons";
import type { Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  href: string;
  actionLabel?: string;
};

/** Neutral wireframe shown when a project has no cover image yet. */
function CoverPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-4 flex flex-col overflow-hidden rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-xs)]"
    >
      <div className="flex items-center gap-1.5 border-b border-[var(--border)] px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--border)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--border)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--border)]" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <span className="h-2.5 w-1/2 rounded-full bg-[var(--accent-muted)]" />
        <span className="h-2 w-full rounded-full bg-[var(--surface-muted)]" />
        <span className="h-2 w-4/5 rounded-full bg-[var(--surface-muted)]" />
        <span className="mt-1 flex-1 rounded-[var(--radius-xs)] bg-[var(--surface-muted)]" />
      </div>
    </div>
  );
}

/**
 * Reusable project card (also intended for the future Portfolio page).
 * Accepts a plain `Project`; `coverImageUrl` is optional so it works
 * before any real images exist.
 */
export function ProjectCard({ project, href, actionLabel = "View project" }: ProjectCardProps) {
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden p-0 transition-[border-color,box-shadow] duration-200 hover:border-[var(--accent)] hover:shadow-[var(--shadow-md)] has-[a:focus-visible]:border-[var(--accent)] has-[a:focus-visible]:shadow-[var(--shadow-md)]">
      <div className="relative aspect-[16/10] border-b border-[var(--border)] bg-[var(--surface-muted)]">
        {project.coverImageUrl ? (
          <Image
            src={project.coverImageUrl}
            alt={project.coverImageAlt ?? project.title}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
            unoptimized
          />
        ) : (
          <CoverPlaceholder />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-[var(--accent-text)]">{project.category}</p>
          {project.isPlaceholder ? <Badge>Sample</Badge> : null}
        </div>
        <h3 className="text-xl font-medium text-[var(--foreground)]">{project.title}</h3>
        <p className="flex-1 text-sm text-[var(--foreground-muted)]">{project.summary}</p>
        <Link
          href={href}
          className="link mt-2 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[var(--accent-text)] after:absolute after:inset-0 after:content-['']"
        >
          {actionLabel}
          <span className="sr-only">: {project.title}</span>
          <ArrowRightIcon
            width={16}
            height={16}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </Card>
  );
}
