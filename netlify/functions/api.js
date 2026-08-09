import { randomUUID } from 'node:crypto'
import bcrypt from 'bcryptjs'
import Busboy from 'busboy'
import cookieParser from 'cookie-parser'
import express, { Router } from 'express'
import helmet from 'helmet'
import serverless from 'serverless-http'
import {
  clearSessionCookieOptions,
  createSessionToken,
  requireAuth,
  sessionCookieOptions,
} from './_lib/auth.js'
import { config } from './_lib/config.js'
import { db, ensureDatabase, firstRow, rows } from './_lib/db.js'
import { errorHandler, HttpError, notFoundHandler } from './_lib/errors.js'
import {
  coverImagePattern,
  getUploadsStore,
  uploadKeyFromCoverImage,
} from './_lib/uploads-store.js'

const loginWindowMs = 15 * 60 * 1000
const loginAttemptLimit = 5
const maxUploadSize = 4 * 1024 * 1024
const extensionByMimeType = new Map([
  ['image/jpeg', '.jpg'],
  ['image/png', '.png'],
  ['image/webp', '.webp'],
])

function readPositiveInteger(
  value,
  fallback,
  name,
  maximum = Number.MAX_SAFE_INTEGER,
) {
  if (value === undefined) return fallback
  const parsed = Number.parseInt(value, 10)
  if (
    !Number.isInteger(parsed) ||
    parsed < 1 ||
    String(parsed) !== String(value)
  ) {
    throw new HttpError(
      400,
      `Parametrul ${name} trebuie să fie un număr întreg pozitiv.`,
    )
  }
  return Math.min(parsed, maximum)
}

function slugifyRomanian(title) {
  return (
    title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'articol'
  )
}

function requireNonEmptyString(value, fieldName) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new HttpError(400, `Câmpul ${fieldName} este obligatoriu.`)
  }
  return value.trim()
}

function optionalText(value, fieldName) {
  if (value === undefined || value === null) return value
  if (typeof value !== 'string') {
    throw new HttpError(
      400,
      `Câmpul ${fieldName} trebuie să fie text sau null.`,
    )
  }
  return value.trim() || null
}

function readStatus(value, fallback) {
  const status = value ?? fallback
  if (!['draft', 'published'].includes(status)) {
    throw new HttpError(400, 'Statusul trebuie să fie draft sau published.')
  }
  return status
}

function readCoverImage(value) {
  const coverImage = optionalText(value, 'cover_image')
  if (coverImage && !coverImagePattern.test(coverImage)) {
    throw new HttpError(
      400,
      'Câmpul cover_image trebuie să fie o cale validă sub /uploads.',
    )
  }
  return coverImage
}

function readArticleId(value) {
  const id = Number.parseInt(value, 10)
  if (!Number.isInteger(id) || id < 1 || String(id) !== String(value)) {
    throw new HttpError(400, 'Identificatorul articolului nu este valid.')
  }
  return id
}

async function readArticle(id) {
  return firstRow(
    await db.execute({
      sql: 'SELECT * FROM articles WHERE id = ?',
      args: [id],
    }),
  )
}

function isSlugConstraintError(error) {
  const message = String(error?.message || '')
  return (
    message.includes('UNIQUE constraint failed: articles.slug') ||
    message.includes('SQLITE_CONSTRAINT_UNIQUE')
  )
}

async function createArticle(body) {
  const title = requireNonEmptyString(body.title, 'title')
  const content = requireNonEmptyString(body.content_md, 'content_md')
  const excerpt = optionalText(body.excerpt, 'excerpt') ?? null
  const coverImage = readCoverImage(body.cover_image) ?? null
  const status = readStatus(body.status, 'draft')
  const publishedAt = status === 'published' ? new Date().toISOString() : null
  const baseSlug = slugifyRomanian(title)
  let suffix = 1

  while (true) {
    const slug = suffix === 1 ? baseSlug : `${baseSlug}-${suffix}`
    const existingSlug = firstRow(
      await db.execute({
        sql: 'SELECT 1 AS found FROM articles WHERE slug = ?',
        args: [slug],
      }),
    )

    if (existingSlug) {
      suffix += 1
      continue
    }

    try {
      const result = await db.execute({
        sql: `
          INSERT INTO articles
            (slug, title, excerpt, content_md, cover_image, status, published_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        args: [slug, title, excerpt, content, coverImage, status, publishedAt],
      })

      return readArticle(Number(result.lastInsertRowid))
    } catch (error) {
      if (!isSlugConstraintError(error)) throw error
      suffix += 1
    }
  }
}

function readClientIp(req) {
  const netlifyIp = req.get('x-nf-client-connection-ip')?.trim()
  if (netlifyIp) return netlifyIp.slice(0, 255)

  const forwardedIp = req.get('x-forwarded-for')?.split(',')[0]?.trim()
  return (forwardedIp || req.ip || 'necunoscut').slice(0, 255)
}

async function removeExpiredLoginAttempts(now) {
  await db.execute({
    sql: 'DELETE FROM login_attempts WHERE attempted_at < ?',
    args: [now - loginWindowMs],
  })
}

async function hasReachedLoginLimit(ip, now) {
  const result = await db.execute({
    sql: `
      SELECT COUNT(*) AS total
      FROM login_attempts
      WHERE ip = ? AND attempted_at >= ?
    `,
    args: [ip, now - loginWindowMs],
  })
  return Number(firstRow(result)?.total || 0) >= loginAttemptLimit
}

async function recordFailedLogin(ip, now) {
  await db.execute({
    sql: 'INSERT INTO login_attempts (ip, attempted_at) VALUES (?, ?)',
    args: [ip, now],
  })
}

async function clearFailedLogins(ip) {
  await db.execute({
    sql: 'DELETE FROM login_attempts WHERE ip = ?',
    args: [ip],
  })
}

async function deleteCoverIfUnused(coverImage) {
  const key = uploadKeyFromCoverImage(coverImage)
  if (!key) return

  const result = await db.execute({
    sql: 'SELECT COUNT(*) AS total FROM articles WHERE cover_image = ?',
    args: [coverImage],
  })
  if (Number(firstRow(result)?.total || 0) > 0) return

  try {
    await getUploadsStore().delete(key)
  } catch (error) {
    console.error(`Imaginea neutilizată ${key} nu a putut fi ștearsă.`, error)
  }
}

function parseImageUpload(req) {
  return new Promise((resolve, reject) => {
    let parser
    try {
      parser = Busboy({
        headers: req.headers,
        limits: { files: 1, fileSize: maxUploadSize },
      })
    } catch {
      reject(new HttpError(400, 'Imaginea nu a putut fi încărcată.'))
      return
    }

    let image
    let imageSeen = false
    let fileTooLarge = false
    let validationError
    let settled = false

    const rejectOnce = (error) => {
      if (settled) return
      settled = true
      reject(error)
    }

    parser.on('file', (fieldName, file, info) => {
      if (fieldName !== 'image' || imageSeen) {
        file.resume()
        return
      }

      imageSeen = true
      const extension = extensionByMimeType.get(info.mimeType)
      if (!extension) {
        validationError = new HttpError(
          400,
          'Sunt acceptate doar imagini JPEG, PNG sau WebP.',
        )
        file.resume()
        return
      }

      const chunks = []
      file.on('limit', () => {
        fileTooLarge = true
      })
      file.on('data', (chunk) => {
        if (!fileTooLarge) chunks.push(chunk)
      })
      file.on('error', () => {
        validationError = new HttpError(
          400,
          'Imaginea nu a putut fi încărcată.',
        )
      })
      file.on('end', () => {
        if (!fileTooLarge && !validationError) {
          image = {
            content: Buffer.concat(chunks),
            contentType: info.mimeType,
            extension,
          }
        }
      })
    })

    parser.on('filesLimit', () => {
      validationError = new HttpError(
        400,
        'Poate fi încărcată o singură imagine.',
      )
    })
    parser.on('error', () => {
      rejectOnce(new HttpError(400, 'Imaginea nu a putut fi încărcată.'))
    })
    parser.on('close', () => {
      if (settled) return
      if (fileTooLarge) {
        rejectOnce(new HttpError(400, 'Imaginea depășește limita de 4 MB.'))
        return
      }
      if (validationError) {
        rejectOnce(validationError)
        return
      }
      if (!image) {
        rejectOnce(new HttpError(400, 'Selectează o imagine pentru încărcare.'))
        return
      }

      settled = true
      resolve(image)
    })

    req.on('aborted', () => {
      rejectOnce(new HttpError(400, 'Imaginea nu a putut fi încărcată.'))
    })
    req.pipe(parser)
  })
}

const authRoutes = Router()

authRoutes.post('/login', async (req, res) => {
  const { username, password } = req.body || {}
  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    !username ||
    !password
  ) {
    return res
      .status(400)
      .json({ error: 'Numele de utilizator și parola sunt obligatorii.' })
  }

  const ip = readClientIp(req)
  const now = Date.now()
  await removeExpiredLoginAttempts(now)

  if (await hasReachedLoginLimit(ip, now)) {
    return res.status(429).json({
      error:
        'Prea multe încercări de autentificare. Încearcă din nou peste 15 minute.',
    })
  }

  const passwordMatches = await bcrypt.compare(
    password,
    config.adminPasswordHash,
  )
  if (username !== config.adminUsername || !passwordMatches) {
    await recordFailedLogin(ip, now)
    return res.status(401).json({ error: 'Date de autentificare incorecte.' })
  }

  await clearFailedLogins(ip)
  const token = createSessionToken(config.adminUsername)
  res.cookie(config.sessionCookieName, token, sessionCookieOptions)
  return res.json({ username: config.adminUsername })
})

authRoutes.post('/logout', (req, res) => {
  res.clearCookie(config.sessionCookieName, clearSessionCookieOptions)
  return res.status(204).end()
})

authRoutes.get('/me', requireAuth, (req, res) => {
  res.json({ username: req.admin.username })
})

const articleRoutes = Router()

articleRoutes.get('/', async (req, res) => {
  const page = readPositiveInteger(req.query.page, 1, 'page')
  const limit = readPositiveInteger(req.query.limit, 10, 'limit', 100)
  const offset = (page - 1) * limit

  const articles = rows(
    await db.execute({
      sql: `
        SELECT slug, title, excerpt, cover_image, published_at
        FROM articles
        WHERE status = 'published'
        ORDER BY published_at DESC, created_at DESC
        LIMIT ? OFFSET ?
      `,
      args: [limit, offset],
    }),
  )

  const totalResult = await db.execute(`
    SELECT COUNT(*) AS total
    FROM articles
    WHERE status = 'published'
  `)
  const total = Number(firstRow(totalResult)?.total || 0)

  res.json({
    articles,
    pagination: {
      page,
      limit,
      total,
      total_pages: Math.ceil(total / limit),
    },
  })
})

articleRoutes.get('/:slug', async (req, res) => {
  const article = firstRow(
    await db.execute({
      sql: `
        SELECT slug, title, excerpt, content_md, cover_image, published_at
        FROM articles
        WHERE slug = ? AND status = 'published'
      `,
      args: [req.params.slug],
    }),
  )

  if (!article) {
    throw new HttpError(404, 'Articolul nu a fost găsit.')
  }

  res.json({ article })
})

const adminRoutes = Router()
adminRoutes.use(requireAuth)

adminRoutes.get('/articles', async (_req, res) => {
  const articles = rows(
    await db.execute(`
      SELECT id, slug, title, excerpt, cover_image, status, published_at,
             created_at, updated_at
      FROM articles
      ORDER BY created_at DESC, id DESC
    `),
  )
  res.json({ articles })
})

adminRoutes.get('/articles/:id', async (req, res) => {
  const id = readArticleId(req.params.id)
  const article = await readArticle(id)
  if (!article) {
    throw new HttpError(404, 'Articolul nu a fost găsit.')
  }
  res.json({ article })
})

adminRoutes.post('/articles', async (req, res) => {
  const article = await createArticle(req.body || {})
  res.status(201).json({ article })
})

adminRoutes.put('/articles/:id', async (req, res) => {
  const id = readArticleId(req.params.id)
  const existing = await readArticle(id)
  if (!existing) {
    throw new HttpError(404, 'Articolul nu a fost găsit.')
  }

  const body = req.body || {}
  const allowedFields = [
    'title',
    'excerpt',
    'content_md',
    'cover_image',
    'status',
  ]
  if (!allowedFields.some((field) => Object.hasOwn(body, field))) {
    throw new HttpError(
      400,
      'Nu a fost furnizat niciun câmp pentru actualizare.',
    )
  }

  const title = Object.hasOwn(body, 'title')
    ? requireNonEmptyString(body.title, 'title')
    : existing.title
  const excerpt = Object.hasOwn(body, 'excerpt')
    ? (optionalText(body.excerpt, 'excerpt') ?? null)
    : existing.excerpt
  const content = Object.hasOwn(body, 'content_md')
    ? requireNonEmptyString(body.content_md, 'content_md')
    : existing.content_md
  const coverImage = Object.hasOwn(body, 'cover_image')
    ? (readCoverImage(body.cover_image) ?? null)
    : existing.cover_image
  const status = Object.hasOwn(body, 'status')
    ? readStatus(body.status, existing.status)
    : existing.status
  const publishedAt =
    status === 'published' && !existing.published_at
      ? new Date().toISOString()
      : existing.published_at

  await db.execute({
    sql: `
      UPDATE articles
      SET title = ?, excerpt = ?, content_md = ?, cover_image = ?, status = ?,
          published_at = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
    args: [title, excerpt, content, coverImage, status, publishedAt, id],
  })

  const article = await readArticle(id)
  if (existing.cover_image && existing.cover_image !== coverImage) {
    await deleteCoverIfUnused(existing.cover_image)
  }

  res.json({ article })
})

adminRoutes.delete('/articles/:id', async (req, res) => {
  const id = readArticleId(req.params.id)
  const existing = await readArticle(id)
  if (!existing) {
    throw new HttpError(404, 'Articolul nu a fost găsit.')
  }

  await db.execute({
    sql: 'DELETE FROM articles WHERE id = ?',
    args: [id],
  })
  await deleteCoverIfUnused(existing.cover_image)
  res.status(204).end()
})

adminRoutes.post('/uploads', async (req, res) => {
  const image = await parseImageUpload(req)
  const key = `${randomUUID()}${image.extension}`
  const content = image.content.buffer.slice(
    image.content.byteOffset,
    image.content.byteOffset + image.content.byteLength,
  )

  await getUploadsStore().set(key, content, {
    metadata: { contentType: image.contentType },
  })

  res.status(201).json({ url: `/uploads/${key}` })
})

const app = express()
app.disable('x-powered-by')
app.use(helmet())
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())

app.get('/api/health', async (_req, res) => {
  await db.execute('SELECT 1 AS ok')
  res.status(200).json({ status: 'ok' })
})
app.use('/api/auth', authRoutes)
app.use('/api/articles', articleRoutes)
app.use('/api/admin', adminRoutes)
app.use(notFoundHandler)
app.use(errorHandler)

const expressHandler = serverless(app)

export async function handler(event, context) {
  try {
    await ensureDatabase()
    return await expressHandler(event, context)
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ error: 'A apărut o eroare internă.' }),
    }
  }
}
