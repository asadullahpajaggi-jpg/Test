import Link from "next/link";
import { Container } from "@/components/ui/container";
import { navItems, siteConfig } from "@/config/site";

const headingClass =
  "font-[family-name:var(--font-sans)] text-sm font-medium tracking-normal text-[var(--foreground)]";
const mutedTextClass = "text-sm text-[var(--foreground-muted)]";
const linkClass = "link w-fit text-sm text-[var(--foreground-muted)]";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { email, ...profiles } = siteConfig.social;
  const socialLinks = Object.entries(profiles).filter(
    (entry): entry is [string, string] => Boolean(entry[1]),
  );

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface-muted)]">
      <Container
        width="wide"
        className="grid gap-10 py-[var(--spacing-section-sm)] sm:grid-cols-2 lg:grid-cols-5"
      >
        <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
          <Link
            href="/"
            className="w-fit font-[family-name:var(--font-display)] text-lg font-medium text-[var(--foreground)]"
          >
            {siteConfig.name}
          </Link>
          <p className={`max-w-xs ${mutedTextClass}`}>{siteConfig.description}</p>
        </div>

        <nav aria-labelledby="footer-nav-heading" className="flex flex-col gap-2.5">
          <h2 id="footer-nav-heading" className={headingClass}>
            Navigate
          </h2>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        <section aria-labelledby="footer-services-heading" className="flex flex-col gap-2.5">
          <h2 id="footer-services-heading" className={headingClass}>
            Services
          </h2>
          <p className={mutedTextClass}>
            A full list of services will appear here once that page is built.
          </p>
          <Link href="/services" className={linkClass}>
            View services
          </Link>
        </section>

        <section aria-labelledby="footer-contact-heading" className="flex flex-col gap-2.5">
          <h2 id="footer-contact-heading" className={headingClass}>
            Contact
          </h2>
          <p className={mutedTextClass}>
            Have a project in mind? Reach out and let&apos;s talk about it.
          </p>
          {email ? (
            <a href={`mailto:${email}`} className={`${linkClass} break-all`}>
              {email}
            </a>
          ) : null}
          <Link href={siteConfig.ctaHref} className={linkClass}>
            {siteConfig.ctaLabel}
          </Link>
        </section>

        <section aria-labelledby="footer-social-heading" className="flex flex-col gap-2.5">
          <h2 id="footer-social-heading" className={headingClass}>
            Social
          </h2>
          {socialLinks.length > 0 ? (
            <ul className="flex flex-col gap-2.5">
              {socialLinks.map(([platform, url]) => (
                <li key={platform}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={`${linkClass} capitalize`}
                  >
                    {platform}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className={mutedTextClass}>Social links coming soon.</p>
          )}
        </section>
      </Container>

      <div className="border-t border-[var(--border)]">
        <Container width="wide" className="py-5 text-sm text-[var(--foreground-muted)]">
          © {year} {siteConfig.name}. All rights reserved.
        </Container>
      </div>
    </footer>
  );
}
