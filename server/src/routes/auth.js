import { Router } from 'express'
import bcrypt from 'bcrypt'
import { rateLimit } from 'express-rate-limit'
import { config } from '../config.js'
import {
  clearSessionCookieOptions,
  createSessionToken,
  requireAuth,
  sessionCookieOptions,
} from '../middleware/auth.js'

const router = Router()

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Prea multe încercări de autentificare. Încearcă din nou peste 15 minute.' },
})

router.post('/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body || {}
  if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
    return res.status(400).json({ error: 'Numele de utilizator și parola sunt obligatorii.' })
  }

  const passwordMatches = await bcrypt.compare(password, config.adminPasswordHash)
  if (username !== config.adminUsername || !passwordMatches) {
    return res.status(401).json({ error: 'Date de autentificare incorecte.' })
  }

  const token = createSessionToken(config.adminUsername)
  res.cookie(config.sessionCookieName, token, sessionCookieOptions)
  return res.json({ username: config.adminUsername })
})

router.post('/logout', (req, res) => {
  res.clearCookie(config.sessionCookieName, clearSessionCookieOptions)
  return res.status(204).end()
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ username: req.admin.username })
})

export default router
