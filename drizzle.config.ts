import { defineConfig } from "drizzle-kit";

/**
 * Config for `drizzle-kit generate` / `migrate` / `studio`.
 * Not used in Phase 1 (no tables exist yet in schema.ts), but wired up
 * now so a later phase can run `npm run db:generate` immediately.
 */
export default defineConfig({
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
});
