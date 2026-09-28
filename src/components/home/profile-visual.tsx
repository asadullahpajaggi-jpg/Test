import Image from "next/image";
import { siteConfig } from "@/config/site";
import type { HomeContent } from "@/types/home";

/**
 * Hero visual. Shows a real photo when `profile.imageUrl` is provided,
 * otherwise a neutral placeholder (no invented person or likeness).
 * `unoptimized` avoids needing image-domain config until the image
 * pipeline (admin uploads) is decided in a later phase.
 */
export function ProfileVisual({ profile }: { profile: HomeContent["hero"]["profile"] }) {
  const name = profile.name ?? siteConfig.name;

  return (
    <div className="relative mx-auto w-full max-w-sm lg:mr-0 lg:max-w-md">
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[var(--radius-xl)] border border-[var(--accent)]/50"
      />
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-lg)]">
        {profile.imageUrl ? (
          <Image
            src={profile.imageUrl}
            alt={profile.imageAlt ?? name}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
            unoptimized
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--accent-muted),var(--surface-muted))]" />
            <svg
              aria-hidden="true"
              viewBox="0 0 200 250"
              preserveAspectRatio="xMidYMax meet"
              className="absolute inset-x-0 bottom-0 h-[78%] w-full text-[var(--foreground-muted)] opacity-25"
              fill="currentColor"
            >
              <circle cx="100" cy="88" r="42" />
              <path d="M20 250c0-52 35-86 80-86s80 34 80 86Z" />
            </svg>
            <div className="absolute inset-x-0 bottom-0 border-t border-[var(--border)] bg-[var(--surface)]/90 px-5 py-4 backdrop-blur">
              <p className="text-sm font-medium text-[var(--foreground)]">{name}</p>
              <p className="text-xs text-[var(--foreground-muted)]">Profile photo placeholder</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
