import { getDb } from '#/db/client.ts'

/** @deprecated Prefer getDb() from #/db/client.ts */
export async function getClient() {
  return getDb()
}

export { getDb }
