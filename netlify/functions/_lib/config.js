function required(name) {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new Error(`Variabila de mediu ${name} este obligatorie.`)
  }
  return value
}

const sessionSecret = required('SESSION_SECRET')
if (sessionSecret.length < 32) {
  throw new Error(
    'SESSION_SECRET trebuie să conțină cel puțin 32 de caractere.',
  )
}

export const config = Object.freeze({
  tursoDatabaseUrl: required('TURSO_DATABASE_URL'),
  tursoAuthToken: required('TURSO_AUTH_TOKEN'),
  adminUsername: required('ADMIN_USERNAME'),
  adminPasswordHash: required('ADMIN_PASSWORD_HASH'),
  sessionSecret,
  sessionCookieName: 'admin_session',
  sessionDurationMs: 8 * 60 * 60 * 1000,
  isProduction:
    process.env.NODE_ENV === 'production' ||
    process.env.CONTEXT === 'production',
})
