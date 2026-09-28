# Freelancer Portfolio

**Phase 1 — Foundation:** app scaffold, design tokens, folder architecture. ✅
**Phase 2 — Public shell:** header, mobile menu, footer, reusable layout, expanded design system. ✅
**Phase 3 — Home page:** hero, intro, services preview, featured work, why work with me, process, final CTA. ✅ (this update)

No public pages (home, services, portfolio, pricing, contact, etc.) and
no admin dashboard have been built yet — those are still later phases.
This is the site "shell" (navigation + footer) that will wrap them.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Database (future) | PostgreSQL via Drizzle ORM |
| Auth (future) | Not implemented yet — architecture reserved, see below |

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Copy the environment template (nothing in Phase 1 requires real values)
cp .env.example .env.local

# 3. Run the dev server
npm run dev
```

Then open http://localhost:3000 — you'll see a temporary placeholder
screen confirming the layout, typography, theme, buttons, and cards
render correctly. It is **not** the real homepage; it will be replaced
entirely when that phase starts.

Other useful commands:

```bash
npm run build       # production build
npm run start        # run the production build
npm run lint         # ESLint
npm run typecheck    # TypeScript, no emit
```

Database commands (not needed until the database phase, listed here for
completeness):

```bash
npm run db:generate  # generate SQL migrations from src/server/db/schema.ts
npm run db:migrate    # apply migrations
npm run db:studio     # browse the database
```

## Project structure

```
src/
  app/                        Routes (App Router)
    layout.tsx                 Root layout: fonts, metadata, theme provider
    page.tsx                   TEMPORARY placeholder home route (see note above)
    globals.css                 Design tokens + base styles (Tailwind v4)
    loading.tsx                 Global loading state
    error.tsx                   Route-level error boundary
    global-error.tsx             Root-layout error boundary
    not-found.tsx                404 page

  components/
    ui/                         Reusable, presentation-only primitives
      button.tsx                 Button (variants: primary/secondary/outline/ghost)
      card.tsx                   Card + Header/Title/Description/Content/Footer
      container.tsx               Responsive max-width wrapper
      section.tsx                 Consistent vertical section rhythm (new)
      typography.tsx              Heading (h1–h4 scale) + Subtitle (new)
      theme-toggle.tsx             Light/dark toggle button (new, reuses ThemeProvider)
    layout/                      Page-chrome components (new)
      site-header.tsx              Sticky header: logo, desktop nav, theme toggle, CTA, mobile trigger
      mobile-nav.tsx                Collapsible mobile menu panel (controlled by site-header)
      site-footer.tsx              Footer: brand, nav, services/contact placeholders, copyright
      public-layout.tsx            Header → page content → Footer wrapper, with a skip-to-content link
    providers/
      theme-provider.tsx          Light/dark theme context + no-flash script (unchanged)

  lib/
    utils.ts                    cn() class-merging helper

  types/
    index.ts                    Shared domain types (Service, Project, Inquiry — placeholders)

  config/
    site.ts                     Site name/description/URL (placeholders, clearly marked TODO)

  server/
    db/
      index.ts                   Lazy, guarded Postgres client (getDb()) — not called anywhere yet
      schema.ts                   Empty Drizzle schema — no tables yet

drizzle.config.ts               drizzle-kit config, points at src/server/db/schema.ts
.env.example                     Documents every env var later phases will need
```

### Why it's organized this way

- **`components/ui`** holds only generic, reusable primitives with no
  business content. Feature-specific components (a `ServiceCard`, a
  `PricingTable`) will live in their own folders later and *compose*
  these primitives rather than duplicating button/card styles.
- **`config/site.ts`** is the one place site-wide text (name,
  description) lives for now. Nothing was invented here — every
  real value is a `TODO`. Once the admin dashboard exists, editable
  fields (name, bio, social links) move from this file into the
  database instead.
- **`server/db`** is separated from `app` and `components` so
  server-only code (which can safely use secrets) is never
  accidentally imported into a Client Component.
- **`types/index.ts`** defines the shape of `Service`, `Project`, and
  `Inquiry` now so the database schema, admin forms, and public pages
  all agree on one contract when they're built.

## Design foundation

Everything below lives in `src/app/globals.css` as CSS custom
properties (Tailwind v4's `@theme` block), so the whole site can be
restyled from one file:

- **Typography** — two typefaces: Fraunces (display/headings) and
  Instrument Sans (body/UI), loaded via `next/font/google` with a
  10-step type scale (`--text-xs` → `--text-5xl`).
- **Spacing** — Tailwind's default spacing scale plus three
  named section-rhythm tokens (`section-sm` / `section` / `section-lg`)
  for consistent vertical rhythm between page sections later.
- **Breakpoints** — Tailwind's defaults (`sm` 640px, `md` 768px,
  `lg` 1024px, `xl` 1280px, `2xl` 1536px).
- **Border radius** — a 5-step scale (`--radius-xs` → `--radius-xl`).
- **Shadows** — a 4-step, ink-tinted shadow scale (deliberately not
  generic grey `rgba(0,0,0,.1)`).
- **Buttons** — `primary` / `secondary` / `outline` / `ghost` variants
  in `sm` / `md` / `lg` sizes (`components/ui/button.tsx`).
- **Cards** — a bordered, elevated surface with composable
  header/content/footer parts (`components/ui/card.tsx`).
- **Containers** — `content` (1152px) for prose/sections and `wide`
  (1440px) for full-bleed sections, both with responsive side padding.
- **Light/dark theme** — semantic tokens (`--background`,
  `--foreground`, `--surface`, `--accent`, etc.) are redefined per
  theme so components never branch on light vs. dark directly. The
  theme follows the OS preference by default; an inline script avoids
  a flash of the wrong theme on load. A manual light/dark toggle can
  be added to the header once the header exists — the context
  (`useTheme()`) is already in place.

The color palette is an ink/paper neutral pair with a single brass/gold
accent, chosen to read as a considered services brand rather than a
generic template look.

## Security & auth architecture (prepared, not implemented)

Per the brief, **no authentication was implemented in this phase**.
What's in place so that it can be added without restructuring:

- `.env.example` documents `AUTH_SECRET` and related variables so the
  admin-auth phase has a stable place to plug into.
- `server/` is already isolated from `app`/`components`, so
  server-only secrets and queries won't leak into client bundles.
- No secrets are read or referenced anywhere in current code — the one
  env var currently read (`NEXT_PUBLIC_SITE_URL`) is intentionally
  public (the `NEXT_PUBLIC_` prefix is Next.js's convention for
  client-safe variables).

When the admin dashboard phase starts, expect to add: an auth library
(e.g. Auth.js/NextAuth or Lucia), a `middleware.ts` protecting
`/admin/*` routes, and an `admin_users` table in
`server/db/schema.ts`.

## Database architecture (prepared, not implemented)

Drizzle ORM + `pg` are installed and wired up, but **no tables exist
yet** and nothing calls the database:

- `server/db/schema.ts` is intentionally empty — a comment lists the
  tables expected later (services, projects, testimonials, pricing
  plans, inquiries, site settings, admin users).
- `server/db/index.ts` exports `getDb()`, which only creates a
  connection when actually called, and throws a clear error if
  `DATABASE_URL` is missing. It is not imported anywhere yet, so
  Phase 1 has no database dependency at runtime or during `npm run build`.
- `drizzle.config.ts` is ready for `npm run db:generate` once real
  tables are added to the schema.

## Phase 2 additions in detail

- **Header** (`components/layout/site-header.tsx`) — sticky, blurred on
  scroll, with the brand wordmark, the six primary nav links (Home,
  About, Services, Portfolio, Pricing, Contact — shared with the
  footer via `navItems` in `config/site.ts`), a theme toggle, and a
  "Get a Quote" CTA. The active link is highlighted via `usePathname()`
  with `aria-current="page"`.
- **Mobile menu** (`components/layout/mobile-nav.tsx`) — a hamburger
  button (`aria-expanded`, `aria-controls`) reveals a panel with the
  same nav links, the theme toggle, and the CTA. It animates open/closed
  with a CSS grid technique (no layout thrashing), closes on route
  change, on Escape, or after clicking a link, and locks background
  scroll while open.
- **Theme toggle** (`components/ui/theme-toggle.tsx`) — a single
  reusable button that calls the *existing* `useTheme()` from Phase 1's
  `ThemeProvider`. No second theme system was introduced.
- **Footer** (`components/layout/site-footer.tsx`) — brand + short
  description, a navigation column, a "Services" column, and a
  "Get in touch" column with a contact link. Social links only render
  if `siteConfig.social` has real entries (currently empty on purpose —
  no accounts were invented); otherwise it shows "Social links coming
  soon." Copyright uses the current year, computed at render.
- **Public layout** (`components/layout/public-layout.tsx`) — the
  Header → content → Footer wrapper, plus a keyboard-accessible
  "Skip to content" link. `not-found.tsx`, `error.tsx`, and
  `global-error.tsx` intentionally still render on their own (unwrapped),
  matching their existing Phase 1 behavior — only `page.tsx` was wrapped
  with it, to preview the shell as requested.
- **Design system additions** — `Section` (consistent vertical section
  spacing), `Heading`/`Subtitle` (a shared type scale for page headings
  instead of one-off `text-*` values), and a `.link` utility class
  (underline-on-hover, accent-tinted) used by all nav/footer links.
  Nothing in Phase 1's palette, radius, shadow, or spacing tokens was
  changed — Phase 2 only adds on top of them.

### Phase 2 audit and fixes

The shell already existed in the repo, so it was audited against the
Phase 2 checklist rather than rebuilt. Changes made:

- **Nav breakpoint moved from `md` to `lg`** — at tablet widths the six
  links, brand, toggle and CTA did not fit on one row.
- **Mobile menu** now contains the theme toggle (as well as the links and
  CTA), highlights the current page, is `inert` while closed, and closes
  if the viewport grows to the desktop layout. Escape returns focus to
  the menu button.
- **Active link** matches nested routes (`/portfolio/x` highlights
  Portfolio) via `isActiveRoute()` in `config/site.ts`.
- **Theme** — no new system. The toggle icon is now CSS-driven (correct
  on first paint), and `ThemeProvider` no longer briefly overrides a
  saved "light" choice with the OS "dark" preference on load.
- **Buttons** — primary uses `--accent-text` for AA contrast in light
  mode; added an `icon` size; the toggle and hamburger reuse
  `buttonStyles`; `<button>` defaults to `type="button"`.
- **Footer** — separate Contact and Social areas with real headings; an
  `email` entry in `siteConfig.social` renders as `mailto:`.
- **Container** `as` prop limited to a fixed tag list (safer typing).

## Phase 3: Home page

The Home page (`src/app/page.tsx`) is assembled from seven section
components in `src/components/home/`, all fed by one typed object:

- **Content layer:** `src/content/home.ts` exports `getHomeContent()`
  (async, returns the `HomeContent` type from `src/types/home.ts`).
  When the database/admin phase arrives, only this function changes —
  no page or component edits. Edit copy, CTAs, services, projects,
  value props, and process steps there.
- **Placeholders:** all services/projects are flagged
  `isPlaceholder: true` and render a visible "Sample" badge. No
  clients, statistics, testimonials, experience, or results exist.
  The hero photo is a neutral placeholder until `hero.profile.imageUrl`
  is set.
- **Reusable cards:** `components/services/service-card.tsx` and
  `components/portfolio/project-card.tsx` take plain `Service` /
  `Project` objects, ready for the future Services/Portfolio pages.
- **New shared UI:** `SectionHeading`, `Badge`, and a small inline
  `icons.tsx` (no icon library added).
- **Accessibility:** one `h1`, sections labelled via `aria-labelledby`,
  whole-card click targets built on a real focusable link with
  screen-reader-only context, visible focus states, no motion beyond
  short hover transitions (disabled by `prefers-reduced-motion`).
- **Design system:** added one token, `--accent-text` (brass-700 in
  light mode, brass-400 in dark), for small accent text — the existing
  `--accent` is ~4.1:1 on light backgrounds, just under WCAG AA for
  small text. No existing token was changed.

## What was intentionally NOT built

Per the brief, none of the following exist yet: the real home page,
services, portfolio, about, contact, pricing, testimonials, admin
dashboard, payment systems, SEO settings, or lead/inquiry management.
No fake client data, testimonials, project results, or personal
information were invented anywhere in this project.

## Configuration still required (before later phases)

- A real `DATABASE_URL` (Postgres-compatible) once the database phase starts.
- A real `AUTH_SECRET` (`openssl rand -base64 32`) once the admin-auth phase starts.
- Real site name/description/URL in `src/config/site.ts` (currently placeholders).
- A production domain for `NEXT_PUBLIC_SITE_URL`.

## Verification note

This project is built in a sandboxed environment without npm registry
access, so `npm install` / `npm run build` / `npm run lint` / `npm run
typecheck` cannot be executed here (confirmed again in Phase 2 — `npm
install` still returns `403 Forbidden` from the registry). Every
`.ts`/`.tsx` file (24 across both phases) was parsed with the
TypeScript compiler to confirm it is syntactically valid, all
JSON config files were validated, and every new file was manually
re-read against the files it imports from (`config/site.ts`,
`ThemeProvider`, `Button`, `Container`) to check the types line up.
Please run `npm install && npm run typecheck && npm run lint && npm
run build` locally as the real check.
