import type { NavItem, Project, Service } from "@/types";

/** A labelled link/button target. */
export type CtaLink = NavItem;

export type ValuePropIcon = "communication" | "tailored" | "quality" | "delivery";

/**
 * Everything the Home page renders, in one typed shape. Today it's
 * filled from `src/content/home.ts`; later `getHomeContent()` can
 * assemble the same shape from the database / admin settings without
 * touching any component.
 */
export type HomeContent = {
  hero: {
    headline: string;
    description: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
    profile: {
      /** Falls back to siteConfig.name. */
      name?: string;
      /** When absent, a neutral placeholder visual is shown. */
      imageUrl?: string;
      imageAlt?: string;
    };
  };
  intro: {
    title: string;
    paragraphs: string[];
    principle: { text: string; label: string };
    link: CtaLink;
  };
  services: {
    title: string;
    description: string;
    items: Service[];
    viewAll: CtaLink;
  };
  featuredWork: {
    title: string;
    description: string;
    items: Project[];
    viewAll: CtaLink;
  };
  whyWorkWithMe: {
    title: string;
    description: string;
    items: { id: string; title: string; description: string; icon: ValuePropIcon }[];
  };
  process: {
    title: string;
    description: string;
    steps: { id: string; title: string; description: string }[];
  };
  finalCta: {
    title: string;
    description: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
  };
};
