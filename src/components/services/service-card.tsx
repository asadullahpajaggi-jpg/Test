import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightIcon } from "@/components/ui/icons";
import type { Service } from "@/types";

type ServiceCardProps = {
  service: Service;
  href: string;
  actionLabel?: string;
};

/**
 * Reusable service card. Takes a plain `Service`, so it works the same
 * with placeholder data now and database rows later (and will be reused
 * on the future Services page). The whole card is clickable via the
 * stretched link; the visible action stays a real, focusable link.
 */
export function ServiceCard({ service, href, actionLabel = "Learn more" }: ServiceCardProps) {
  return (
    <Card className="group relative flex h-full flex-col transition-[border-color,box-shadow] duration-200 hover:border-[var(--accent)] hover:shadow-[var(--shadow-md)] has-[a:focus-visible]:border-[var(--accent)] has-[a:focus-visible]:shadow-[var(--shadow-md)]">
      <span aria-hidden="true" className="mb-5 block h-1 w-8 rounded-full bg-[var(--accent)]" />
      <CardHeader className="mb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle>{service.title}</CardTitle>
          {service.isPlaceholder ? <Badge>Sample</Badge> : null}
        </div>
      </CardHeader>
      <CardContent className="flex-1 text-[var(--foreground-muted)]">
        <p>{service.summary}</p>
      </CardContent>
      <CardFooter className="mt-6">
        <Link
          href={href}
          className="link inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-text)] after:absolute after:inset-0 after:content-['']"
        >
          {actionLabel}
          <span className="sr-only"> about {service.title}</span>
          <ArrowRightIcon
            width={16}
            height={16}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </CardFooter>
    </Card>
  );
}
