import { siteConfig } from "@/config/site";
import type { HomeContent } from "@/types/home";

/**
 * PLACEHOLDER CONTENT for the Home page.
 *
 * Nothing here is a factual claim about a real person or business: no
 * years of experience, clients, statistics, awards, or results. Copy is
 * written as general working approach and should be reviewed/replaced
 * when real profile information exists.
 *
 * Items flagged `isPlaceholder: true` render a visible "Sample" badge so
 * sample services/projects can never be mistaken for real ones.
 */
const homeContent: HomeContent = {
  hero: {
    headline: "Digital solutions that solve real business problems.",
    description:
      "From first conversation to final delivery, I help clients plan, build, and launch digital work that fits their goals, with clear communication at every step.",
    primaryCta: { label: siteConfig.ctaLabel, href: siteConfig.ctaHref },
    secondaryCta: { label: "View My Work", href: "/portfolio" },
    profile: {},
  },

  intro: {
    title: "A direct line to the person doing the work",
    paragraphs: [
      "I'm an independent freelancer working with businesses and individuals on digital projects. My focus is understanding the problem first, then choosing the simplest solution that solves it well.",
      "Whether you need a new website, a refreshed design, or help untangling a technical challenge, you can expect honest advice and a clear plan before any work begins.",
    ],
    principle: {
      text: "Understand the problem first. Then choose the simplest solution that works.",
      label: "My approach",
    },
    link: { label: "More about me", href: "/about" },
  },

  services: {
    title: "How I can help",
    description:
      "A preview of the kinds of work I take on. Each project is scoped around your goals, not a fixed package.",
    viewAll: { label: "All services", href: "/services" },
    items: [
      {
        id: "sample-service-web",
        slug: "website-design-development",
        title: "Website Design & Development",
        summary:
          "Modern, responsive websites designed around your goals and built to be easy to maintain.",
        isPlaceholder: true,
      },
      {
        id: "sample-service-design",
        slug: "ui-ux-brand-design",
        title: "UI/UX & Brand Design",
        summary:
          "Clean interfaces and a consistent visual identity that make your business easier to understand.",
        isPlaceholder: true,
      },
      {
        id: "sample-service-apps",
        slug: "custom-web-applications",
        title: "Custom Web Applications",
        summary:
          "Tailored tools and dashboards that simplify how your business handles day-to-day work.",
        isPlaceholder: true,
      },
    ],
  },

  featuredWork: {
    title: "Featured work",
    description:
      "A selection of projects will appear here. The cards below are sample placeholders until real case studies are added.",
    viewAll: { label: "View all work", href: "/portfolio" },
    items: [
      {
        id: "sample-project-1",
        slug: "sample-business-website",
        title: "Sample project: Business website",
        category: "Web Design",
        summary:
          "Placeholder. Replace with a short summary of the project's goal and your role.",
        isPlaceholder: true,
      },
      {
        id: "sample-project-2",
        slug: "sample-web-application",
        title: "Sample project: Web application",
        category: "Development",
        summary:
          "Placeholder. Replace with a short summary of the problem that was solved.",
        isPlaceholder: true,
      },
      {
        id: "sample-project-3",
        slug: "sample-brand-ui",
        title: "Sample project: Brand & UI design",
        category: "Design",
        summary:
          "Placeholder. Replace with a short summary of the approach and deliverables.",
        isPlaceholder: true,
      },
    ],
  },

  whyWorkWithMe: {
    title: "Why work with me",
    description:
      "The principles I aim to bring to every project, whatever its size.",
    items: [
      {
        id: "communication",
        icon: "communication",
        title: "Clear communication",
        description:
          "You'll know what's happening at each stage, with straightforward updates and no unnecessary jargon.",
      },
      {
        id: "tailored",
        icon: "tailored",
        title: "Tailored solutions",
        description:
          "Every project starts from your goals, so the result fits your business rather than a one-size-fits-all template.",
      },
      {
        id: "quality",
        icon: "quality",
        title: "Quality-focused work",
        description:
          "Careful attention to detail, from design to code, so what's delivered is polished and dependable.",
      },
      {
        id: "delivery",
        icon: "delivery",
        title: "Reliable delivery",
        description:
          "Realistic timelines agreed up front, and honest updates if anything changes along the way.",
      },
    ],
  },

  process: {
    title: "A simple, transparent process",
    description: "Four clear steps, so you always know what comes next.",
    steps: [
      {
        id: "discuss",
        title: "Discuss",
        description:
          "We talk through your goals, requirements, and timeline so the project starts with a shared understanding.",
      },
      {
        id: "plan",
        title: "Plan",
        description:
          "I outline the scope, approach, and milestones so you know what to expect before work begins.",
      },
      {
        id: "build",
        title: "Build",
        description:
          "The work happens in clear stages, with check-ins so you can give feedback along the way.",
      },
      {
        id: "deliver",
        title: "Deliver",
        description:
          "Final review, launch, and handover, with the guidance you need to use what was built.",
      },
    ],
  },

  finalCta: {
    title: "Have a project in mind?",
    description:
      "Tell me what you're working on and what you need. I'll get back to you to talk through the next steps.",
    primaryCta: { label: siteConfig.ctaLabel, href: siteConfig.ctaHref },
    secondaryCta: { label: "View My Work", href: "/portfolio" },
  },
};

/**
 * Single data-access point for the Home page. Async on purpose: when
 * the database/admin phase lands, replace the body with real queries
 * (falling back to the defaults above) and no component changes.
 */
export async function getHomeContent(): Promise<HomeContent> {
  return homeContent;
}
