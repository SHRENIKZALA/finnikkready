import { getConnectionString } from '@netlify/database'
import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'

import * as schema from '#/db/schema.ts'

import type { NodePgDatabase } from 'drizzle-orm/node-postgres'

export type AppDatabase = NodePgDatabase<typeof schema>

let cachedDb: AppDatabase | null | undefined
let cachedPool: Pool | null = null

/** Resolve the branch-aware Netlify connection first, then support explicit Postgres URLs. */
function resolveConnectionString(): string | undefined {
  const configured = process.env.DATABASE_URL ?? process.env.NETLIFY_DB_URL
  if (configured) {
    return configured
  }

  try {
    return getConnectionString()
  } catch {
    return undefined
  }
}

/**
 * Shared Postgres client for Netlify Database and external Postgres providers.
 * The pool is created lazily and cached for the lifetime of the function runtime.
 */
export function getDb(): AppDatabase | null {
  if (cachedDb !== undefined) {
    return cachedDb
  }

  const connectionString = resolveConnectionString()

  if (!connectionString) {
    cachedDb = null
    return null
  }

  cachedPool = new Pool({ connectionString })
  cachedDb = drizzle(cachedPool, { schema })
  return cachedDb
}

export function getDatabaseConnectionString(): string | undefined {
  return resolveConnectionString()
}
