import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ShareArticleButton from '../../components/ShareArticleButton.jsx'
import { usePageMetadata } from '../../hooks/usePageMetadata.js'
import { formatArticleDate } from '../../utils/formatArticleDate.js'
import { useAuth } from '../AuthContext.jsx'
import { ApiError, apiFetch, readApiError } from '../api.js'
import AdminHeader from '../components/AdminHeader.jsx'

function StatusBadge({ status }) {
  const isPublished = status === 'published'

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        isPublished
          ? 'bg-sage-100 text-sage-800'
          : 'bg-amber-100 text-amber-800'
      }`}
    >
      {isPublished ? 'Publicat' : 'Ciornă'}
    </span>
  )
}

export default function DashboardPage() {
  const { expireSession } = useAuth()
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [retryCount, setRetryCount] = useState(0)
  const [actionId, setActionId] = useState(null)
  const [error, setError] = useState('')

  usePageMetadata(
    'Articole | Administrare Vlad Coșa',
    'Administrarea articolelor de blog.',
  )

  useEffect(() => {
    const controller = new AbortController()

    async function loadArticles() {
      try {
        const response = await apiFetch('/api/admin/articles', {
          signal: controller.signal,
        })

        if (response.status === 401) {
          expireSession()
          return
        }

        if (!response.ok) {
          throw new Error('Răspuns invalid de la server')
        }

        const data = await response.json()
        setArticles(Array.isArray(data.articles) ? data.articles : [])
        setError('')
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError('Articolele nu au putut fi încărcate.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadArticles()
    return () => controller.abort()
  }, [expireSession, retryCount])

  const retry = () => {
    setIsLoading(true)
    setError('')
    setRetryCount((currentCount) => currentCount + 1)
  }

  const togglePublication = async (article) => {
    const nextStatus = article.status === 'published' ? 'draft' : 'published'
    setActionId(article.id)
    setError('')

    try {
      const response = await apiFetch(`/api/admin/articles/${article.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      })

      if (response.status === 401) {
        expireSession()
        return
      }

      if (!response.ok) {
        throw new ApiError(
          await readApiError(
            response,
            'Statusul articolului nu a putut fi schimbat.',
          ),
        )
      }

      const data = await response.json()
      setArticles((currentArticles) =>
        currentArticles.map((currentArticle) =>
          currentArticle.id === article.id ? data.article : currentArticle,
        ),
      )
    } catch (requestError) {
      setError(
        requestError instanceof ApiError
          ? requestError.message
          : 'Statusul articolului nu a putut fi schimbat.',
      )
    } finally {
      setActionId(null)
    }
  }

  const deleteArticle = async (article) => {
    const confirmed = window.confirm(
      `Ștergi articolul „${article.title}”? Această acțiune nu poate fi anulată.`,
    )
    if (!confirmed) return

    setActionId(article.id)
    setError('')

    try {
      const response = await apiFetch(`/api/admin/articles/${article.id}`, {
        method: 'DELETE',
      })

      if (response.status === 401) {
        expireSession()
        return
      }

      if (!response.ok) {
        throw new ApiError(
          await readApiError(response, 'Articolul nu a putut fi șters.'),
        )
      }

      setArticles((currentArticles) =>
        currentArticles.filter(
          (currentArticle) => currentArticle.id !== article.id,
        ),
      )
    } catch (requestError) {
      setError(
        requestError instanceof ApiError
          ? requestError.message
          : 'Articolul nu a putut fi șters.',
      )
    } finally {
      setActionId(null)
    }
  }

  return (
    <div className="min-h-screen bg-cream-50 text-slate-800">
      <AdminHeader />

      <main className="container-custom py-12 sm:py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-sage-600">
              Administrare blog
            </p>
            <h1 className="mt-2 text-4xl font-light text-slate-900 sm:text-5xl">
              Articole
            </h1>
          </div>
          <Link
            to="/admin/articles/new"
            className="btn-primary self-start sm:self-auto"
          >
            Articol nou
          </Link>
        </div>

        {error && (
          <div
            className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-red-100 bg-red-50 p-5 text-red-700 sm:flex-row sm:items-center sm:justify-between"
            role="alert"
          >
            <p>{error}</p>
            {articles.length === 0 && (
              <button
                type="button"
                className="font-medium underline underline-offset-4"
                onClick={retry}
              >
                Încearcă din nou
              </button>
            )}
          </div>
        )}

        {isLoading ? (
          <p className="py-20 text-center text-slate-600" role="status">
            Se încarcă articolele…
          </p>
        ) : articles.length === 0 && !error ? (
          <div className="mt-10 rounded-3xl border border-sage-100 bg-white px-8 py-16 text-center shadow-sm">
            <h2 className="text-3xl font-light text-slate-900">
              Nu există articole încă
            </h2>
            <p className="mt-3 text-slate-600">
              Creează primul articol pentru blog.
            </p>
          </div>
        ) : articles.length > 0 ? (
          <div className="mt-10 overflow-x-auto rounded-3xl border border-sage-100 bg-white shadow-sm">
            <table className="w-full min-w-[1100px] text-left">
              <thead className="border-b border-sage-100 bg-sage-50/60 text-sm uppercase tracking-wider text-slate-600">
                <tr>
                  <th className="px-6 py-4 font-medium">Titlu</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Creat</th>
                  <th className="px-6 py-4 font-medium">Actualizat</th>
                  <th className="px-6 py-4 text-right font-medium">Acțiuni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-100">
                {articles.map((article) => {
                  const isBusy = actionId === article.id
                  const publicUrl = `${window.location.origin}/blog/${article.slug}`

                  return (
                    <tr
                      key={article.id}
                      className="transition-colors hover:bg-cream-50"
                    >
                      <td className="max-w-sm px-6 py-5">
                        <span className="block text-lg font-medium text-slate-900">
                          {article.title}
                        </span>
                        <span className="mt-1 block text-sm text-slate-500">
                          /{article.slug}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <StatusBadge status={article.status} />
                      </td>
                      <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-600">
                        {formatArticleDate(article.created_at) || '—'}
                      </td>
                      <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-600">
                        {formatArticleDate(article.updated_at) || '—'}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap justify-end gap-x-4 gap-y-2 text-sm font-medium">
                          {article.status === 'published' && (
                            <>
                              <a
                                href={publicUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sage-700 transition-colors hover:text-sage-900"
                              >
                                Vezi articolul
                              </a>
                              <ShareArticleButton
                                title={article.title}
                                url={publicUrl}
                                className="text-sage-700 transition-colors hover:text-sage-900"
                              />
                            </>
                          )}
                          <Link
                            to={`/admin/articles/${article.id}/edit`}
                            className="text-sage-700 transition-colors hover:text-sage-900"
                          >
                            Editează
                          </Link>
                          <button
                            type="button"
                            className="text-slate-700 transition-colors hover:text-sage-800 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={isBusy}
                            onClick={() => togglePublication(article)}
                          >
                            {article.status === 'published'
                              ? 'Retrage'
                              : 'Publică'}
                          </button>
                          <button
                            type="button"
                            className="text-red-700 transition-colors hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={isBusy}
                            onClick={() => deleteArticle(article)}
                          >
                            Șterge
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : null}
      </main>
    </div>
  )
}
