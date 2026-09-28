import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Heading, Subtitle } from "@/components/ui/typography";
import type { HomeContent } from "@/types/home";
import { ProfileVisual } from "./profile-visual";

export function HeroSection({ content }: { content: HomeContent["hero"] }) {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      {/* Decorative background: faint dot grid + soft brass glow. Clipped by overflow-hidden. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[var(--accent)] opacity-[0.12] blur-3xl" />
      </div>

      <Container className="grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-28">
        <div className="flex flex-col items-start gap-6">
          <Heading as="h1" id="hero-heading" className="max-w-2xl text-balance">
            {content.headline}
          </Heading>
          <Subtitle className="max-w-xl">{content.description}</Subtitle>
          <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href={content.primaryCta.href} size="lg">
              {content.primaryCta.label}
              <ArrowRightIcon width={18} height={18} />
            </Button>
            <Button href={content.secondaryCta.href} size="lg" variant="outline">
              {content.secondaryCta.label}
            </Button>
          </div>
        </div>

        <ProfileVisual profile={content.profile} />
      </Container>
    </section>
  );
}
