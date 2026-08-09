import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import Navigation from '../components/Navigation.jsx'
import { usePageMetadata } from '../hooks/usePageMetadata.js'
import { formatArticleDate } from '../utils/formatArticleDate.js'

const pageSize = 9

export default function BlogListPage() {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [retryCount, setRetryCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [hasMore, setHasMore] = useState(false)

  usePageMetadata(
    'Blog | Vlad Coșa',
    'Articole despre psihologie, psihoterapie Gestalt și bunăstare emoțională.',
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    async function loadArticles() {
      try {
        const response = await fetch(`/api/articles?page=${page}&limit=${pageSize}`, {
          credentials: 'include',
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Răspuns invalid de la server')
        }

        const data = await response.json()
        const nextArticles = Array.isArray(data.articles) ? data.articles : []

        setArticles((currentArticles) =>
          page === 1 ? nextArticles : [...currentArticles, ...nextArticles],
        )
        setHasMore(nextArticles.length === pageSize)
        setError('')
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError('Nu am putut încărca articolele. Te rugăm să încerci din nou.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadArticles()

    return () => controller.abort()
  }, [page, retryCount])

  const loadMore = () => {
    setIsLoading(true)
    setPage((currentPage) => currentPage + 1)
  }

  const retry = () => {
    setIsLoading(true)
    setError('')
    setRetryCount((currentCount) => currentCount + 1)
  }

  return (
    <div className="min-h-screen bg-cream-50 text-slate-800">
      <Navigation />

      <main className="pt-20">
        <header className="bg-sage-50/30 py-16 sm:py-20">
          <div className="container-custom text-center">
            <h1 className="text-4xl sm:text-5xl font-light text-slate-900 mb-3">Blog</h1>
            <div className="w-24 h-1 bg-sage-500 mx-auto rounded-full" />
          </div>
        </header>

        <section className="container-custom py-16 sm:py-20 min-h-[28rem]">
          {articles.length > 0 && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => {
                const formattedDate = formatArticleDate(article.published_at)

                return (
                  <Link
                    key={article.slug}
                    to={`/blog/${article.slug}`}
                    className="group overflow-hidden rounded-3xl border border-sage-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-4"
                  >
                    {article.cover_image && (
                      <div className="aspect-[16/10] overflow-hidden bg-sage-50">
                        <img
                          src={article.cover_image}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <article className="p-8">
                      {formattedDate && (
                        <time
                          dateTime={article.published_at}
                          className="text-sm uppercase tracking-wider text-sage-600"
                        >
                          {formattedDate}
                        </time>
                      )}
                      <h2 className="mt-3 text-3xl font-normal leading-tight text-slate-900 transition-colors group-hover:text-sage-700">
                        {article.title}
                      </h2>
                      {article.excerpt && (
                        <p className="mt-4 leading-relaxed text-slate-600">{article.excerpt}</p>
                      )}
                      <span className="mt-6 inline-flex items-center font-medium text-sage-700">
                        Citește articolul
                        <span
                          className="ml-2 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </span>
                    </article>
                  </Link>
                )
              })}
            </div>
          )}

          {isLoading && (
            <p className="py-12 text-center text-lg text-slate-600" role="status">
              Se încarcă articolele…
            </p>
          )}

          {!isLoading && error && (
            <div className="mx-auto max-w-xl rounded-2xl border border-sage-100 bg-white p-8 text-center shadow-sm">
              <p className="text-slate-700">{error}</p>
              <button type="button" className="btn-secondary mt-6" onClick={retry}>
                Încearcă din nou
              </button>
            </div>
          )}

          {!isLoading && !error && articles.length === 0 && (
            <p className="py-16 text-center text-xl font-light text-slate-700">
              În curând — articole despre psihologie și psihoterapie.
            </p>
          )}

          {!isLoading && !error && hasMore && articles.length > 0 && (
            <div className="mt-12 text-center">
              <button type="button" className="btn-secondary" onClick={loadMore}>
                Încarcă mai multe
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
