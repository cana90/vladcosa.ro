import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import MarkdownContent from '../../components/MarkdownContent.jsx'
import { usePageMetadata } from '../../hooks/usePageMetadata.js'
import { useAuth } from '../AuthContext.jsx'
import { ApiError, apiFetch, readApiError } from '../api.js'
import AdminHeader from '../components/AdminHeader.jsx'

const emptyArticle = {
  title: '',
  excerpt: '',
  content_md: '',
  cover_image: null,
  status: 'draft',
}

const maxCoverImageSize = 4 * 1024 * 1024
const draftStoragePrefix = 'vladcosa-admin-article-draft:'

function getDraftStorageKey(articleId) {
  return `${draftStoragePrefix}${articleId || 'new'}`
}

function readStoredDraft(storageKey) {
  try {
    const storedValue = window.localStorage.getItem(storageKey)
    if (!storedValue) return null

    const draft = JSON.parse(storedValue)
    const hasValidTextFields = ['title', 'excerpt', 'content_md'].every(
      (field) => typeof draft?.[field] === 'string',
    )
    const hasValidCoverImage =
      draft?.cover_image === null || typeof draft?.cover_image === 'string'

    if (!hasValidTextFields || !hasValidCoverImage) {
      clearStoredDraft(storageKey)
      return null
    }

    return {
      title: draft.title,
      excerpt: draft.excerpt,
      content_md: draft.content_md,
      cover_image: draft.cover_image,
    }
  } catch {
    clearStoredDraft(storageKey)
    return null
  }
}

function persistStoredDraft(storageKey, article) {
  try {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        title: article.title,
        excerpt: article.excerpt,
        content_md: article.content_md,
        cover_image: article.cover_image,
      }),
    )
  } catch {
    // The session still expires if browser storage is unavailable.
  }
}

function clearStoredDraft(storageKey) {
  try {
    window.localStorage.removeItem(storageKey)
  } catch {
    // Browser storage may be unavailable in restricted browsing modes.
  }
}

function toEditorArticle(article) {
  return {
    title: article.title || '',
    excerpt: article.excerpt || '',
    content_md: article.content_md || '',
    cover_image: article.cover_image || null,
    status: article.status || 'draft',
  }
}

function ArticleEditor({ articleId }) {
  const isEditing = Boolean(articleId)
  const draftStorageKey = getDraftStorageKey(articleId)
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const { expireSession } = useAuth()
  const [article, setArticle] = useState(emptyArticle)
  const [savedArticle, setSavedArticle] = useState(emptyArticle)
  const [savedRecord, setSavedRecord] = useState(null)
  const [isLoading, setIsLoading] = useState(isEditing)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [recoveryDraft, setRecoveryDraft] = useState(() =>
    readStoredDraft(draftStorageKey),
  )
  const hasUnsavedChanges =
    JSON.stringify(article) !== JSON.stringify(savedArticle)

  usePageMetadata(
    isEditing
      ? 'Editează articolul | Administrare Vlad Coșa'
      : 'Articol nou | Administrare Vlad Coșa',
    'Editorul articolelor de blog.',
  )

  useEffect(() => {
    if (!isEditing) return undefined

    const controller = new AbortController()

    async function loadArticle() {
      try {
        const response = await apiFetch(`/api/admin/articles/${articleId}`, {
          signal: controller.signal,
        })

        if (response.status === 401) {
          expireSession()
          return
        }

        if (!response.ok) {
          throw new ApiError('Articolul nu a putut fi încărcat.')
        }

        const data = await response.json()
        const foundArticle = data.article

        if (!foundArticle) {
          throw new ApiError('Articolul nu a fost găsit.')
        }

        const editorArticle = toEditorArticle(foundArticle)
        setArticle(editorArticle)
        setSavedArticle(editorArticle)
        setSavedRecord(foundArticle)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(
            requestError instanceof ApiError
              ? requestError.message
              : 'Articolul nu a putut fi încărcat.',
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadArticle()
    return () => controller.abort()
  }, [articleId, expireSession, isEditing])

  useEffect(() => {
    if (!hasUnsavedChanges) return undefined

    const warningMessage =
      'Ai modificări nesalvate. Sigur vrei să părăsești pagina?'
    const handleBeforeUnload = (event) => {
      event.preventDefault()
      event.returnValue = warningMessage
    }
    const handleLinkClick = (event) => {
      const link = event.target.closest('a[href]')
      if (!link || link.target === '_blank') return

      const destination = new URL(link.href, window.location.href)
      if (destination.origin !== window.location.origin) return

      if (!window.confirm(warningMessage)) {
        event.preventDefault()
        event.stopPropagation()
      }
    }
    let isRestoringHistory = false
    const handlePopState = (event) => {
      if (isRestoringHistory) {
        isRestoringHistory = false
        return
      }

      if (!window.confirm(warningMessage)) {
        event.stopImmediatePropagation()
        isRestoringHistory = true
        window.history.go(1)
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('popstate', handlePopState, true)
    document.addEventListener('click', handleLinkClick, true)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handlePopState, true)
      document.removeEventListener('click', handleLinkClick, true)
    }
  }, [hasUnsavedChanges])

  const updateField = (field, value) => {
    setArticle((currentArticle) => ({ ...currentArticle, [field]: value }))
    setSuccessMessage('')
  }

  const uploadCover = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > maxCoverImageSize) {
      setError('Imaginea depășește limita de 4 MB.')
      event.target.value = ''
      return
    }

    const formData = new FormData()
    formData.append('image', file)
    setIsUploading(true)
    setError('')
    setSuccessMessage('')

    try {
      const response = await apiFetch('/api/admin/uploads', {
        method: 'POST',
        body: formData,
      })

      if (response.status === 401) {
        persistStoredDraft(draftStorageKey, article)
        expireSession()
        return
      }

      if (!response.ok) {
        throw new ApiError(
          await readApiError(response, 'Imaginea nu a putut fi încărcată.'),
        )
      }

      const data = await response.json()
      updateField('cover_image', data.url)
    } catch (requestError) {
      setError(
        requestError instanceof ApiError
          ? requestError.message
          : 'Imaginea nu a putut fi încărcată.',
      )
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const removeCover = () => {
    updateField('cover_image', null)
  }

  const saveArticle = async (status) => {
    if (!article.title.trim() || !article.content_md.trim()) {
      setError('Titlul și conținutul sunt obligatorii.')
      return
    }

    setIsSaving(true)
    setError('')
    setSuccessMessage('')

    try {
      const response = await apiFetch(
        isEditing ? `/api/admin/articles/${articleId}` : '/api/admin/articles',
        {
          method: isEditing ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...article, status }),
        },
      )

      if (response.status === 401) {
        persistStoredDraft(draftStorageKey, article)
        expireSession()
        return
      }

      if (!response.ok) {
        throw new ApiError(
          await readApiError(response, 'Articolul nu a putut fi salvat.'),
        )
      }

      const data = await response.json()
      const editorArticle = toEditorArticle(data.article)
      clearStoredDraft(draftStorageKey)
      setRecoveryDraft(null)
      setArticle(editorArticle)
      setSavedArticle(editorArticle)
      setSavedRecord(data.article)
      setSuccessMessage(
        status === 'published'
          ? 'Articolul a fost publicat.'
          : 'Ciorna a fost salvată.',
      )

      if (!isEditing) {
        navigate(`/admin/articles/${data.article.id}/edit`, { replace: true })
      }
    } catch (requestError) {
      setError(
        requestError instanceof ApiError
          ? requestError.message
          : 'Articolul nu a putut fi salvat.',
      )
    } finally {
      setIsSaving(false)
    }
  }

  const restoreDraft = () => {
    if (!recoveryDraft) return
    setArticle((currentArticle) => ({
      ...currentArticle,
      ...recoveryDraft,
    }))
    setRecoveryDraft(null)
    setError('')
    setSuccessMessage('Modificările nesalvate au fost restaurate.')
  }

  const discardDraft = () => {
    clearStoredDraft(draftStorageKey)
    setRecoveryDraft(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-50 text-slate-800">
        <AdminHeader />
        <main className="container-custom py-24 text-center">
          <p className="text-slate-600" role="status">
            Se încarcă articolul…
          </p>
        </main>
      </div>
    )
  }

  if (error && isEditing && !savedRecord) {
    return (
      <div className="min-h-screen bg-cream-50 text-slate-800">
        <AdminHeader />
        <main className="container-custom py-24 text-center">
          <h1 className="text-4xl font-light text-slate-900">
            Articolul nu poate fi deschis
          </h1>
          <p className="mt-4 text-slate-600">{error}</p>
          <Link to="/admin" className="btn-secondary mt-8">
            Înapoi la articole
          </Link>
        </main>
      </div>
    )
  }

  const publicUrl =
    savedRecord?.status === 'published'
      ? `${window.location.origin}/blog/${savedRecord.slug}`
      : null
  const confirmDiscard = () =>
    !hasUnsavedChanges ||
    window.confirm('Ai modificări nesalvate. Sigur vrei să părăsești pagina?')

  return (
    <div className="min-h-screen bg-cream-50 text-slate-800">
      <AdminHeader onBeforeLogout={confirmDiscard} />

      <main className="container-custom py-10 sm:py-14">
        <Link
          to="/admin"
          className="text-sm font-medium text-sage-700 transition-colors hover:text-sage-800"
        >
          ← Înapoi la articole
        </Link>

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-sage-600">
              {isEditing ? 'Editare articol' : 'Articol nou'}
            </p>
            <h1 className="mt-2 text-4xl font-light text-slate-900 sm:text-5xl">
              {isEditing
                ? article.title || 'Articol fără titlu'
                : 'Creează un articol'}
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="btn-secondary disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSaving || isUploading}
              onClick={() => saveArticle('draft')}
            >
              {isSaving ? 'Se salvează…' : 'Salvează ciorna'}
            </button>
            <button
              type="button"
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSaving || isUploading}
              onClick={() => saveArticle('published')}
            >
              {isSaving ? 'Se salvează…' : 'Publică'}
            </button>
          </div>
        </div>

        {recoveryDraft && (
          <div
            className="mt-8 flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-amber-900 sm:flex-row sm:items-center sm:justify-between"
            role="status"
          >
            <p>
              Există modificări nesalvate dintr-o sesiune anterioară. Vrei să le
              restaurezi?
            </p>
            <div className="flex shrink-0 flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full bg-sage-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sage-800 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                onClick={restoreDraft}
              >
                Restaurează
              </button>
              <button
                type="button"
                className="rounded-full border border-amber-300 px-4 py-2 text-sm font-medium text-amber-900 transition-colors hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
                onClick={discardDraft}
              >
                Renunță
              </button>
            </div>
          </div>
        )}

        {error && (
          <p
            className="mt-8 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-red-700"
            role="alert"
          >
            {error}
          </p>
        )}

        {successMessage && (
          <p
            className="mt-8 rounded-2xl border border-sage-200 bg-sage-50 px-5 py-4 text-sage-800"
            role="status"
          >
            {successMessage}
          </p>
        )}

        {publicUrl && (
          <div className="mt-8 rounded-2xl border border-sage-200 bg-white px-5 py-4 text-slate-700">
            <span className="font-medium text-slate-900">Adresă publică: </span>
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-sage-700 underline decoration-sage-300 underline-offset-4 hover:text-sage-800"
            >
              {publicUrl}
            </a>
          </div>
        )}

        <div className="mt-10 space-y-8 rounded-3xl border border-sage-100 bg-white p-6 shadow-sm sm:p-10">
          <div>
            <label
              htmlFor="article-title"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Titlu
            </label>
            <input
              id="article-title"
              type="text"
              value={article.title}
              onChange={(event) => updateField('title', event.target.value)}
              className="w-full rounded-xl border border-sage-200 bg-cream-50 px-4 py-3 text-lg text-slate-900 outline-none transition focus:border-sage-500 focus:ring-2 focus:ring-sage-200"
            />
          </div>

          <div>
            <label
              htmlFor="article-excerpt"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Excerpt
            </label>
            <textarea
              id="article-excerpt"
              rows="2"
              value={article.excerpt}
              onChange={(event) => updateField('excerpt', event.target.value)}
              className="w-full resize-y rounded-xl border border-sage-200 bg-cream-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sage-500 focus:ring-2 focus:ring-sage-200"
            />
            <p className="mt-2 text-sm text-slate-500">
              Rezumatul afișat în lista de articole și în descrierea paginii.
            </p>
          </div>

          <div>
            <span className="mb-3 block text-sm font-medium text-slate-700">
              Imagine de copertă
            </span>
            {article.cover_image ? (
              <div className="max-w-2xl">
                <img
                  src={article.cover_image}
                  alt="Coperta articolului"
                  className="aspect-[16/9] w-full rounded-2xl object-cover"
                />
                <button
                  type="button"
                  className="mt-3 text-sm font-medium text-red-700 transition-colors hover:text-red-800"
                  onClick={removeCover}
                >
                  Elimină imaginea
                </button>
              </div>
            ) : (
              <div>
                <input
                  ref={fileInputRef}
                  id="article-cover"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  disabled={isUploading}
                  onChange={uploadCover}
                  className="block w-full max-w-xl rounded-xl border border-sage-200 bg-cream-50 text-sm text-slate-600 file:mr-4 file:border-0 file:bg-sage-100 file:px-4 file:py-3 file:font-medium file:text-sage-800 hover:file:bg-sage-200 disabled:cursor-not-allowed disabled:opacity-60"
                />
                <p className="mt-2 text-sm text-slate-500">
                  {isUploading
                    ? 'Se încarcă imaginea…'
                    : 'JPEG, PNG sau WebP, maximum 4 MB.'}
                </p>
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="article-content"
              className="mb-3 block text-sm font-medium text-slate-700"
            >
              Conținut
            </label>
            <div className="grid overflow-hidden rounded-2xl border border-sage-200 lg:grid-cols-2">
              <div className="border-b border-sage-200 lg:border-b-0 lg:border-r">
                <div className="border-b border-sage-200 bg-sage-50 px-4 py-3 text-sm font-medium text-slate-700">
                  Markdown
                </div>
                <textarea
                  id="article-content"
                  value={article.content_md}
                  onChange={(event) =>
                    updateField('content_md', event.target.value)
                  }
                  className="min-h-[32rem] w-full resize-y bg-cream-50 p-5 font-mono text-sm leading-relaxed text-slate-800 outline-none focus:ring-2 focus:ring-inset focus:ring-sage-300"
                  placeholder="Scrie conținutul articolului în format Markdown…"
                />
              </div>

              <div className="bg-white">
                <div className="border-b border-sage-200 bg-sage-50 px-4 py-3 text-sm font-medium text-slate-700">
                  Previzualizare
                </div>
                <div className="min-h-[32rem] overflow-auto p-5 sm:p-7">
                  {article.content_md.trim() ? (
                    <MarkdownContent content={article.content_md} />
                  ) : (
                    <p className="text-slate-500">
                      Previzualizarea va apărea aici.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function ArticleEditorPage() {
  const { id } = useParams()
  return <ArticleEditor key={id || 'new'} articleId={id} />
}
