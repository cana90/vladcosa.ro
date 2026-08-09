import { getStore } from '@netlify/blobs'

export const uploadKeyPattern = /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/
export const coverImagePattern = /^\/uploads\/([a-zA-Z0-9][a-zA-Z0-9._-]*)$/

export function getUploadsStore() {
  return getStore({ name: 'uploads', consistency: 'strong' })
}

export function uploadKeyFromCoverImage(coverImage) {
  if (!coverImage) return null
  return coverImage.match(coverImagePattern)?.[1] || null
}
