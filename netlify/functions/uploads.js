import { getUploadsStore, uploadKeyPattern } from './_lib/uploads-store.js'

function readUploadKey(pathname) {
  const prefixes = ['/uploads/', '/.netlify/functions/uploads/']
  const prefix = prefixes.find((candidate) => pathname.startsWith(candidate))
  if (!prefix) return null

  const encodedKey = pathname.slice(prefix.length)
  let key
  try {
    key = decodeURIComponent(encodedKey)
  } catch {
    return null
  }

  return uploadKeyPattern.test(key) ? key : null
}

function jsonResponse(statusCode, error) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ error }),
  }
}

export async function handler(event) {
  if (event.httpMethod !== 'GET') {
    return jsonResponse(405, 'Metoda nu este permisă.')
  }

  const key = readUploadKey(event.path || '')
  if (!key) {
    return jsonResponse(404, 'Imaginea nu a fost găsită.')
  }

  try {
    const entry = await getUploadsStore().getWithMetadata(key, {
      type: 'arrayBuffer',
      consistency: 'strong',
    })

    if (!entry) {
      return jsonResponse(404, 'Imaginea nu a fost găsită.')
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type':
          entry.metadata?.contentType || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
      body: Buffer.from(entry.data).toString('base64'),
      isBase64Encoded: true,
    }
  } catch (error) {
    console.error(error)
    return jsonResponse(500, 'Imaginea nu a putut fi încărcată.')
  }
}
