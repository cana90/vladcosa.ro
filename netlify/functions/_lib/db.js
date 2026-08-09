import { createClient } from '@libsql/client/web'
import { config } from './config.js'

export const db = createClient({
  url: config.tursoDatabaseUrl,
  authToken: config.tursoAuthToken,
})

const migrations = [
  {
    version: 1,
    statements: [
      `
        CREATE TABLE IF NOT EXISTS articles (
          id INTEGER PRIMARY KEY,
          slug TEXT UNIQUE NOT NULL,
          title TEXT NOT NULL,
          excerpt TEXT,
          content_md TEXT NOT NULL,
          cover_image TEXT,
          status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft', 'published')),
          published_at TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `,
      `
        CREATE INDEX IF NOT EXISTS idx_articles_publication
        ON articles(status, published_at DESC, created_at DESC)
      `,
    ],
  },
  {
    version: 2,
    statements: [
      `
        CREATE TABLE IF NOT EXISTS login_attempts (
          ip TEXT NOT NULL,
          attempted_at INTEGER NOT NULL
        )
      `,
      `
        CREATE INDEX IF NOT EXISTS idx_login_attempts_ip_time
        ON login_attempts(ip, attempted_at)
      `,
    ],
  },
]

let migrationPromise

async function applyMigrations() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version INTEGER PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)

  const result = await db.execute('SELECT version FROM schema_migrations')
  const appliedVersions = new Set(
    result.rows.map(({ version }) => Number(version)),
  )

  for (const migration of migrations) {
    if (appliedVersions.has(migration.version)) continue

    for (const statement of migration.statements) {
      await db.execute(statement)
    }

    await db.execute({
      sql: 'INSERT OR IGNORE INTO schema_migrations (version) VALUES (?)',
      args: [migration.version],
    })
  }
}

export function ensureDatabase() {
  if (!migrationPromise) {
    migrationPromise = applyMigrations().catch((error) => {
      migrationPromise = undefined
      throw error
    })
  }

  return migrationPromise
}

export function firstRow(result) {
  const row = result.rows[0]
  return row ? { ...row } : undefined
}

export function rows(result) {
  return result.rows.map((row) => ({ ...row }))
}
