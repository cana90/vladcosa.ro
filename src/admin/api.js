export class ApiError extends Error {}

export function apiFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    credentials: 'include',
  })
}

export async function readApiError(response, fallbackMessage) {
  try {
    const data = await response.json()
    return data.error || fallbackMessage
  } catch {
    return fallbackMessage
  }
}
