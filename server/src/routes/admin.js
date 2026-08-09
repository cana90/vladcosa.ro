import fs from 'node:fs'
import { randomUUID } from 'node:crypto'
import path from 'node:path'
import { Router } from 'express'
import multer from 'multer'
import { config } from '../config.js'
import { db } from '../db.js'
import { requireAuth } from '../middleware/auth.js'
import { HttpError } from '../middleware/errors.js'

const router = Router()
router.use(requireAuth)

fs.mkdirSync(config.uploadsDir, { recursive: true })

const extensionByMimeType = new Map([
  ['image/jpeg', '.jpg'],
  ['image/png', '.png'],
  ['image/webp', '.webp'],
])

const upload = multer({
  storage: multer.diskStorage({
    destination: config.uploadsDir,
    filename(req, file, callback) {
      callback(null, `${randomUUID()}${extensionByMimeType.get(file.mimetype)}`)
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    if (!extensionByMimeType.has(file.mimetype)) {
      return callback(new HttpError(400, 'Sunt acceptate doar imagini JPEG, PNG sau WebP.'))
    }
    return callback(null, true)
  },
})

function slugifyRomanian(title) {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'articol'
}

function createUniqueSlug(title) {
  const baseSlug = slugifyRomanian(title)
  const slugExists = db.prepare('SELECT 1 FROM articles WHERE slug = ?')
  let slug = baseSlug
  let suffix = 2

  while (slugExists.get(slug)) {
    slug = `${baseSlug}-${suffix}`
    suffix += 1
  }

  return slug
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
    throw new HttpError(400, `Câmpul ${fieldName} trebuie să fie text sau null.`)
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
  if (coverImage && !/^\/uploads\/[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(coverImage)) {
    throw new HttpError(400, 'Câmpul cover_image trebuie să fie o cale validă sub /uploads.')
  }
  return coverImage
}

function readArticle(id) {
  return db.prepare('SELECT * FROM articles WHERE id = ?').get(id)
}

function readArticleId(value) {
  const id = Number.parseInt(value, 10)
  if (!Number.isInteger(id) || id < 1 || String(id) !== String(value)) {
    throw new HttpError(400, 'Identificatorul articolului nu este valid.')
  }
  return id
}

const createArticle = db.transaction((body) => {
  const title = requireNonEmptyString(body.title, 'title')
  const content = requireNonEmptyString(body.content_md, 'content_md')
  const excerpt = optionalText(body.excerpt, 'excerpt') ?? null
  const coverImage = readCoverImage(body.cover_image) ?? null
  const status = readStatus(body.status, 'draft')
  const publishedAt = status === 'published' ? new Date().toISOString() : null
  const slug = createUniqueSlug(title)

  const result = db.prepare(`
    INSERT INTO articles (slug, title, excerpt, content_md, cover_image, status, published_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(slug, title, excerpt, content, coverImage, status, publishedAt)

  return readArticle(result.lastInsertRowid)
})

router.get('/articles', (req, res) => {
  const articles = db.prepare(`
    SELECT *
    FROM articles
    ORDER BY created_at DESC, id DESC
  `).all()
  res.json({ articles })
})

router.post('/articles', (req, res) => {
  const article = createArticle(req.body || {})
  res.status(201).json({ article })
})

router.put('/articles/:id', (req, res) => {
  const id = readArticleId(req.params.id)
  const existing = readArticle(id)
  if (!existing) {
    throw new HttpError(404, 'Articolul nu a fost găsit.')
  }

  const body = req.body || {}
  const allowedFields = ['title', 'excerpt', 'content_md', 'cover_image', 'status']
  if (!allowedFields.some((field) => Object.hasOwn(body, field))) {
    throw new HttpError(400, 'Nu a fost furnizat niciun câmp pentru actualizare.')
  }

  const title = Object.hasOwn(body, 'title')
    ? requireNonEmptyString(body.title, 'title')
    : existing.title
  const excerpt = Object.hasOwn(body, 'excerpt')
    ? optionalText(body.excerpt, 'excerpt') ?? null
    : existing.excerpt
  const content = Object.hasOwn(body, 'content_md')
    ? requireNonEmptyString(body.content_md, 'content_md')
    : existing.content_md
  const coverImage = Object.hasOwn(body, 'cover_image')
    ? readCoverImage(body.cover_image) ?? null
    : existing.cover_image
  const status = Object.hasOwn(body, 'status')
    ? readStatus(body.status, existing.status)
    : existing.status
  const publishedAt = status === 'published' && !existing.published_at
    ? new Date().toISOString()
    : existing.published_at

  db.prepare(`
    UPDATE articles
    SET title = ?, excerpt = ?, content_md = ?, cover_image = ?, status = ?,
        published_at = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(title, excerpt, content, coverImage, status, publishedAt, id)

  res.json({ article: readArticle(id) })
})

router.delete('/articles/:id', (req, res) => {
  const id = readArticleId(req.params.id)
  const result = db.prepare('DELETE FROM articles WHERE id = ?').run(id)
  if (result.changes === 0) {
    throw new HttpError(404, 'Articolul nu a fost găsit.')
  }
  res.status(204).end()
})

router.post('/uploads', upload.single('image'), (req, res) => {
  if (!req.file) {
    throw new HttpError(400, 'Selectează o imagine pentru încărcare.')
  }
  res.status(201).json({ url: `/uploads/${path.basename(req.file.filename)}` })
})

export default router
