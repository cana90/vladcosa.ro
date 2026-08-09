import fs from 'node:fs'
import path from 'node:path'
import Database from 'better-sqlite3'
import { config } from './config.js'

fs.mkdirSync(path.dirname(config.dbPath), { recursive: true })

export const db = new Database(config.dbPath)
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')
db.pragma('busy_timeout = 5000')

db.exec(`
  CREATE TABLE IF NOT EXISTS schema_migrations (
    version INTEGER PRIMARY KEY,
    applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`)

const migrations = [
  {
    version: 1,
    sql: `
      CREATE TABLE articles (
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
      );

      CREATE INDEX idx_articles_publication
      ON articles(status, published_at DESC, created_at DESC);
    `,
  },
]

const applyMigrations = db.transaction(() => {
  const appliedVersions = new Set(
    db.prepare('SELECT version FROM schema_migrations').all().map(({ version }) => version)
  )
  const recordMigration = db.prepare('INSERT INTO schema_migrations (version) VALUES (?)')

  for (const migration of migrations) {
    if (appliedVersions.has(migration.version)) continue
    db.exec(migration.sql)
    recordMigration.run(migration.version)
  }
})

applyMigrations()
