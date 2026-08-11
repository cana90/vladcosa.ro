import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

function copyWithFallback(text) {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.setAttribute('readonly', '')
  textArea.style.position = 'fixed'
  textArea.style.opacity = '0'
  document.body.appendChild(textArea)
  textArea.select()
  const copied = document.execCommand('copy')
  textArea.remove()

  if (!copied) {
    throw new Error('Linkul nu a putut fi copiat.')
  }
}

export default function ShareArticleButton({
  title,
  url,
  className = 'btn-secondary',
}) {
  const triggerRef = useRef(null)
  const closeButtonRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const nativeShareIsAvailable = typeof navigator.share === 'function'

  const copyUrl = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url)
      } else {
        copyWithFallback(url)
      }
      setMessage('Linkul a fost copiat în clipboard.')
    } catch {
      setMessage('Linkul nu a putut fi copiat automat.')
    }
  }

  const openShareDialog = () => {
    setMessage('')
    setIsOpen(true)
    copyUrl()
  }

  const closeShareDialog = () => {
    setIsOpen(false)
    window.requestAnimationFrame(() => triggerRef.current?.focus())
  }

  const shareNatively = async () => {
    try {
      await navigator.share({ title, url })
      setMessage('Articolul a fost trimis către aplicația aleasă.')
    } catch (shareError) {
      if (shareError.name !== 'AbortError') {
        setMessage('Distribuirea nu a putut fi pornită.')
      }
    }
  }

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeShareDialog()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={className}
        onClick={openShareDialog}
      >
        Distribuie
      </button>

      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/50 px-4 py-8"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeShareDialog()
            }}
          >
            <div
              className="w-full max-w-lg rounded-3xl border border-sage-100 bg-cream-50 p-6 shadow-2xl sm:p-8"
              role="dialog"
              aria-modal="true"
              aria-labelledby="share-article-title"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-sage-600">
                    Distribuire
                  </p>
                  <h2
                    id="share-article-title"
                    className="mt-2 text-3xl font-light text-slate-900"
                  >
                    Distribuie articolul
                  </h2>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="rounded-full border border-sage-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-sage-100"
                  onClick={closeShareDialog}
                >
                  Închide
                </button>
              </div>

              <p className="mt-5 text-slate-600">{title}</p>
              <p className="mt-2 break-all text-sm text-slate-500">{url}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  className="btn-primary justify-center"
                  onClick={copyUrl}
                >
                  Copiază linkul
                </button>
                {nativeShareIsAvailable && (
                  <button
                    type="button"
                    className="btn-secondary justify-center"
                    onClick={shareNatively}
                  >
                    Alege o aplicație
                  </button>
                )}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary justify-center"
                >
                  Facebook
                </a>
                <a
                  href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary justify-center"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary justify-center"
                >
                  LinkedIn
                </a>
                <a
                  href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
                  className="btn-secondary justify-center"
                >
                  E-mail
                </a>
              </div>

              <p
                className="mt-5 min-h-6 text-sm text-sage-700"
                role="status"
                aria-live="polite"
              >
                {message}
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
