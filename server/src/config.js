import path from 'node:path'
import dotenv from 'dotenv'

dotenv.config({ quiet: true })

function required(name) {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new Error(`Variabila de mediu ${name} este obligatorie.`)
  }
  return value
}

function readPort(value) {
  const port = Number.parseInt(value || '4000', 10)
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('Variabila de mediu PORT trebuie să fie un port valid.')
  }
  return port
}

const sessionSecret = required('SESSION_SECRET')
if (sessionSecret.length < 32) {
  throw new Error('SESSION_SECRET trebuie să conțină cel puțin 32 de caractere.')
}

export const config = Object.freeze({
  port: readPort(process.env.PORT),
  dbPath: path.resolve(process.cwd(), process.env.DB_PATH || './data/blog.db'),
  uploadsDir: path.resolve(process.cwd(), process.env.UPLOADS_DIR || './data/uploads'),
  adminUsername: required('ADMIN_USERNAME'),
  adminPasswordHash: required('ADMIN_PASSWORD_HASH'),
  sessionSecret,
  sessionCookieName: 'admin_session',
  sessionDurationMs: 8 * 60 * 60 * 1000,
  isProduction: process.env.NODE_ENV === 'production',
})
