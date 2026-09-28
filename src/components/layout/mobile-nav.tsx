"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { isActiveRoute, navItems, siteConfig } from "@/config/site";

type MobileNavProps = {
  id: string;
  isOpen: boolean;
  onNavigate: () => void;
};

/**
 * Slides open below the header on small screens (hidden from `lg` up,
 * where the desktop nav takes over). Uses the CSS grid-template-rows
 * 0fr/1fr technique so the height animates smoothly without measuring
 * pixel heights in JS, and respects prefers-reduced-motion via the
 * global rule in globals.css. While closed it is `inert`, so its links
 * are removed from the tab order and the accessibility tree.
 */
export function MobileNav({ id, isOpen, onNavigate }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <div
      id={id}
      inert={!isOpen}
      className={cn(
        "grid overflow-hidden border-[var(--border)] transition-[grid-template-rows] duration-300 ease-[var(--ease-out-soft)] lg:hidden",
        isOpen ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr] border-t-0",
      )}
    >
      <div className="min-h-0">
        <Container width="wide">
          {/* Long menus scroll inside the panel instead of running off-screen. */}
          <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto">
            <nav aria-label="Primary" className="flex flex-col py-2">
              {navItems.map((item) => {
                const isActive = isActiveRoute(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between border-b border-[var(--border)] py-3.5 text-base font-medium transition-colors last:border-b-0",
                      isActive
                        ? "text-[var(--accent-text)]"
                        : "text-[var(--foreground)] hover:text-[var(--accent-text)]",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex flex-col gap-4 border-t border-[var(--border)] py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--foreground-muted)]">Theme</span>
                <ThemeToggle />
              </div>
              <Button href={siteConfig.ctaHref} onClick={onNavigate} size="lg" className="w-full">
                {siteConfig.ctaLabel}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
