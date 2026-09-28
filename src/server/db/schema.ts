/**
 * Drizzle schema.
 *
 * Intentionally empty for Phase 1 — no tables are defined yet, per the
 * "do not invent data / do not build features yet" rule. This file is
 * the single place future phases will add tables such as:
 *
 *   - services
 *   - projects
 *   - testimonials
 *   - pricing_plans
 *   - inquiries
 *   - site_settings
 *   - admin_users
 *
 * Keeping one schema file (re-exported from here) means drizzle-kit
 * and every query in `src/server/db` share one source of truth.
 */

export {};
