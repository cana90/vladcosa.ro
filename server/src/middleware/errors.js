import multer from 'multer'

export class HttpError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

export function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Ruta solicitată nu există.' })
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error)
  }

  if (error instanceof multer.MulterError) {
    const message = error.code === 'LIMIT_FILE_SIZE'
      ? 'Imaginea depășește limita de 5 MB.'
      : 'Imaginea nu a putut fi încărcată.'
    return res.status(400).json({ error: message })
  }

  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Corpul JSON nu este valid.' })
  }

  if (error.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Corpul cererii depășește limita de 1 MB.' })
  }

  const status = Number.isInteger(error.status) ? error.status : 500
  if (status >= 500) {
    console.error(error)
  }

  const message = status >= 500 ? 'A apărut o eroare internă.' : error.message
  return res.status(status).json({ error: message })
}
