import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

/**
 * Database client factory.
 *
 * Nothing in the app calls this yet — it exists so the "database
 * architecture" piece of the foundation is in place without actually
 * connecting to anything (there is no DATABASE_URL required for
 * Phase 1, and no build-time connection is attempted).
 *
 * When a later phase needs a query, import `getDb()` from here rather
 * than instantiating `Pool`/`drizzle` inline, so there is exactly one
 * connection pool for the whole app.
 */
let db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (db) return db;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local before using the database (see .env.example).",
    );
  }

  const pool = new Pool({ connectionString });
  db = drizzle(pool, { schema });
  return db;
}
