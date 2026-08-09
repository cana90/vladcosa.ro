import jwt from 'jsonwebtoken'
import { config } from './config.js'

const cookieBaseOptions = Object.freeze({
  httpOnly: true,
  sameSite: 'strict',
  secure: config.isProduction,
  path: '/',
})

export const sessionCookieOptions = Object.freeze({
  ...cookieBaseOptions,
  maxAge: config.sessionDurationMs,
})

export const clearSessionCookieOptions = cookieBaseOptions

export function createSessionToken(username) {
  return jwt.sign({ sub: username }, config.sessionSecret, {
    algorithm: 'HS256',
    expiresIn: Math.floor(config.sessionDurationMs / 1000),
  })
}

export function requireAuth(req, res, next) {
  const token = req.cookies[config.sessionCookieName]
  if (!token) {
    return res.status(401).json({ error: 'Autentificare necesară.' })
  }

  try {
    const payload = jwt.verify(token, config.sessionSecret, {
      algorithms: ['HS256'],
    })
    if (payload.sub !== config.adminUsername) {
      throw new Error('Utilizator invalid')
    }
    req.admin = { username: payload.sub }
    return next()
  } catch {
    res.clearCookie(config.sessionCookieName, clearSessionCookieOptions)
    return res
      .status(401)
      .json({ error: 'Sesiunea nu este validă sau a expirat.' })
  }
}
