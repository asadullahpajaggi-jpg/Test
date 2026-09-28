"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { isActiveRoute, navItems, siteConfig } from "@/config/site";
import { MobileNav } from "./mobile-nav";

const MOBILE_NAV_ID = "mobile-nav";
// Matches Tailwind's `lg` breakpoint, where the desktop nav takes over.
const DESKTOP_QUERY = "(min-width: 1024px)";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu on route change, so navigating never leaves
  // it open over the new page.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Escape closes the menu and returns focus to the button that opened it.
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  // If the viewport grows to the desktop layout while the menu is open,
  // close it so background scroll isn't left locked.
  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMenuOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/70">
      <Container width="wide">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link
            href="/"
            className="min-w-0 truncate rounded-[var(--radius-xs)] font-[family-name:var(--font-display)] text-lg font-medium tracking-tight text-[var(--foreground)]"
          >
            {siteConfig.name}
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-6 xl:gap-8">
            {navItems.map((item) => {
              const isActive = isActiveRoute(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "link text-sm font-medium",
                    isActive
                      ? "text-[var(--foreground)] [text-decoration-color:var(--accent-text)]"
                      : "text-[var(--foreground-muted)]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <ThemeToggle />
            <Button href={siteConfig.ctaHref} size="sm">
              {siteConfig.ctaLabel}
            </Button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls={MOBILE_NAV_ID}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className={cn(buttonStyles({ variant: "ghost", size: "icon" }), "lg:hidden")}
          >
            <MenuIcon open={isMenuOpen} />
          </button>
        </div>
      </Container>

      <MobileNav
        id={MOBILE_NAV_ID}
        isOpen={isMenuOpen}
        onNavigate={() => setIsMenuOpen(false)}
      />
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {open ? (
        <path
          d="M5 5l10 10M15 5L5 15"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M3 6h14M3 10h14M3 14h14"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
