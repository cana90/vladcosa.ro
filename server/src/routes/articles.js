import { Router } from 'express'
import { db } from '../db.js'
import { HttpError } from '../middleware/errors.js'

const router = Router()

function readPositiveInteger(value, fallback, name, maximum = Number.MAX_SAFE_INTEGER) {
  if (value === undefined) return fallback
  const parsed = Number.parseInt(value, 10)
  if (!Number.isInteger(parsed) || parsed < 1 || String(parsed) !== String(value)) {
    throw new HttpError(400, `Parametrul ${name} trebuie să fie un număr întreg pozitiv.`)
  }
  return Math.min(parsed, maximum)
}

router.get('/', (req, res) => {
  const page = readPositiveInteger(req.query.page, 1, 'page')
  const limit = readPositiveInteger(req.query.limit, 10, 'limit', 100)
  const offset = (page - 1) * limit

  const articles = db.prepare(`
    SELECT slug, title, excerpt, cover_image, published_at
    FROM articles
    WHERE status = 'published'
    ORDER BY published_at DESC, created_at DESC
    LIMIT ? OFFSET ?
  `).all(limit, offset)

  const { total } = db.prepare(`
    SELECT COUNT(*) AS total
    FROM articles
    WHERE status = 'published'
  `).get()

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

router.get('/:slug', (req, res) => {
  const article = db.prepare(`
    SELECT slug, title, excerpt, content_md, cover_image, published_at
    FROM articles
    WHERE slug = ? AND status = 'published'
  `).get(req.params.slug)

  if (!article) {
    throw new HttpError(404, 'Articolul nu a fost găsit.')
  }

  res.json({ article })
})

export default router
