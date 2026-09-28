/**
 * Shared domain types.
 *
 * These are intentionally minimal placeholders that describe the shape
 * of content the admin dashboard will manage later (services, projects,
 * pricing, testimonials, inquiries). Keeping them here — rather than
 * inline in components — means the database schema, the admin forms,
 * and the public pages can all import the same contract instead of
 * drifting apart.
 */

export type NavItem = {
  label: string;
  href: string;
};

/** Placeholder shape for a future "Service" entity. Not wired up yet. */
export type Service = {
  id: string;
  title: string;
  summary: string;
  slug: string;
  /** True for sample content shown until real, admin-managed services exist. */
  isPlaceholder?: boolean;
};

/** Placeholder shape for a future "Project"/case-study entity. */
export type Project = {
  id: string;
  title: string;
  category: string;
  summary: string;
  slug: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  /** True for sample content shown until real, admin-managed projects exist. */
  isPlaceholder?: boolean;
};

/** Placeholder shape for a future client inquiry submitted via the contact form. */
export type Inquiry = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};
