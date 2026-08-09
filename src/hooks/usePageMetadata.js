import { useEffect } from 'react'

export function usePageMetadata(title, description) {
  useEffect(() => {
    const descriptionMeta = document.querySelector('meta[name="description"]')

    document.title = title
    if (descriptionMeta && description) {
      descriptionMeta.setAttribute('content', description)
    }
  }, [description, title])
}
