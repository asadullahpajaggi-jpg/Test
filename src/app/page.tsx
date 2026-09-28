import { FinalCta } from "@/components/home/final-cta";
import { FeaturedWork } from "@/components/home/featured-work";
import { HeroSection } from "@/components/home/hero-section";
import { IntroSection } from "@/components/home/intro-section";
import { ProcessSection } from "@/components/home/process-section";
import { ServicesPreview } from "@/components/home/services-preview";
import { WhyWorkWithMe } from "@/components/home/why-work-with-me";
import { PublicLayout } from "@/components/layout/public-layout";
import { getHomeContent } from "@/content/home";

/**
 * Public Home page. All copy/data comes from `getHomeContent()`, so
 * moving to database/admin-managed content later only changes that
 * function, not this page or its section components.
 */
export default async function Home() {
  const content = await getHomeContent();

  return (
    <PublicLayout>
      <HeroSection content={content.hero} />
      <IntroSection content={content.intro} />
      <ServicesPreview content={content.services} />
      <FeaturedWork content={content.featuredWork} />
      <WhyWorkWithMe content={content.whyWorkWithMe} />
      <ProcessSection content={content.process} />
      <FinalCta content={content.finalCta} />
    </PublicLayout>
  );
}
