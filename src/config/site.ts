import type { NavItem } from "@/types";

/**
 * Site-wide configuration.
 *
 * Placeholder values only — no real name, bio, or contact details have
 * been invented. Replace the TODOs when real content is provided, and
 * eventually move fields marked "future: admin-editable" into the
 * database so they can be changed from the admin dashboard instead of
 * committed to code.
 */
export const siteConfig = {
  // TODO: replace with the real business/freelancer name.
  name: "Freelancer Portfolio",
  // TODO: replace with a real one-line description for SEO/meta tags.
  description: "Professional services, portfolio, and client inquiries.",
  // TODO: replace with the production domain once deployed.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  // Label for the header/mobile-menu primary call-to-action.
  ctaLabel: "Get a Quote",
  ctaHref: "/contact",

  // future: admin-editable via the settings dashboard. Left empty on
  // purpose — no real accounts exist yet, so nothing is rendered until
  // real handles are added here (see components/layout/site-footer.tsx).
  social: {} as Partial<Record<"email" | "linkedin" | "github" | "twitter", string>>,
} as const;

/**
 * Primary site navigation, shared by the desktop header, the mobile
 * menu, and the footer so all three always stay in sync.
 *
 * Routes are placeholders — the pages they point to (About, Services,
 * Portfolio, Pricing, Contact) are not built yet and will 404 until
 * their respective phases land. That's expected for this phase.
 */
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

/**
 * Whether `href` should be highlighted for the current `pathname`.
 * "/" only matches exactly; other items also match nested routes
 * (e.g. /portfolio highlights on /portfolio/some-project).
 */
export function isActiveRoute(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
