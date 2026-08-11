import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import ArticlePresentation from '../../components/ArticlePresentation.jsx'

export default function ArticlePreviewModal({ article, publishedAt, onClose }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-cream-50 text-slate-800"
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-preview-title"
    >
      <div className="sticky top-0 z-10 border-b border-sage-100 bg-cream-50/95 shadow-sm backdrop-blur">
        <div className="container-custom flex min-h-20 items-center justify-between gap-5 py-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-sage-600">
              Previzualizare completă
            </p>
            <p
              id="article-preview-title"
              className="mt-1 text-lg text-slate-900"
            >
              Așa va arăta articolul publicat
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="btn-secondary"
            onClick={onClose}
          >
            Închide previzualizarea
          </button>
        </div>
      </div>

      <ArticlePresentation
        title={article.title.trim() || 'Articol fără titlu'}
        publishedAt={publishedAt}
        coverImage={article.cover_image}
        content={article.content_md}
        emptyContentMessage="Conținutul articolului va apărea aici."
      />
    </div>,
    document.body,
  )
}
