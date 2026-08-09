import fs from 'node:fs'
import express from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { config } from './config.js'
import { db } from './db.js'
import adminRoutes from './routes/admin.js'
import articleRoutes from './routes/articles.js'
import authRoutes from './routes/auth.js'
import { errorHandler, notFoundHandler } from './middleware/errors.js'

fs.mkdirSync(config.uploadsDir, { recursive: true })

const app = express()
app.disable('x-powered-by')
app.use(helmet())
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use('/uploads', express.static(config.uploadsDir, {
  immutable: true,
  maxAge: '1y',
}))
app.use('/api/auth', authRoutes)
app.use('/api/articles', articleRoutes)
app.use('/api/admin', adminRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

const server = app.listen(config.port, () => {
  console.log(`API-ul blogului ascultă pe portul ${config.port}.`)
})

function shutdown(signal) {
  console.log(`Semnal ${signal} primit. Serverul se oprește.`)
  server.close(() => {
    db.close()
    process.exit(0)
  })
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))

export { app, server }
