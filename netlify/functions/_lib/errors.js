export class HttpError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

export function notFoundHandler(_req, res) {
  res.status(404).json({ error: 'Ruta solicitată nu există.' })
}

export function errorHandler(error, _req, res, next) {
  if (res.headersSent) {
    return next(error)
  }

  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Corpul JSON nu este valid.' })
  }

  if (error.type === 'entity.too.large') {
    return res
      .status(413)
      .json({ error: 'Corpul cererii depășește limita de 1 MB.' })
  }

  const status = Number.isInteger(error.status) ? error.status : 500
  if (status >= 500) {
    console.error(error)
  }

  const message = status >= 500 ? 'A apărut o eroare internă.' : error.message
  return res.status(status).json({ error: message })
}
