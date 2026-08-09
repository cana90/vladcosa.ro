import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import Navigation from '../components/Navigation.jsx'
import { usePageMetadata } from '../hooks/usePageMetadata.js'
import { formatArticleDate } from '../utils/formatArticleDate.js'

function ArticleContent({ slug }) {
  const [requestState, setRequestState] = useState({
    status: 'loading',
    article: null,
  })

  const article = requestState.article
  const title = article
    ? `${article.title} | Vlad Coșa`
    : requestState.status === 'not-found'
      ? 'Articol negăsit | Vlad Coșa'
      : 'Blog | Vlad Coșa'
  const description =
    article?.excerpt || 'Articol despre psihologie și psihoterapie publicat de Vlad Coșa.'

  usePageMetadata(title, description)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    async function loadArticle() {
      try {
        const response = await fetch(`/api/articles/${encodeURIComponent(slug)}`, {
          signal: controller.signal,
        })

        if (response.status === 404) {
          setRequestState({ status: 'not-found', article: null })
          return
        }

        if (!response.ok) {
          throw new Error('Răspuns invalid de la server')
        }

        const data = await response.json()
        setRequestState({ status: 'success', article: data.article })
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setRequestState({ status: 'error', article: null })
        }
      }
    }

    loadArticle()

    return () => controller.abort()
  }, [slug])

  if (requestState.status === 'loading') {
    return (
      <div className="container-custom flex min-h-[34rem] items-center justify-center pt-20">
        <p className="text-lg text-slate-600" role="status">
          Se încarcă articolul…
        </p>
      </div>
    )
  }

  if (requestState.status === 'not-found') {
    return (
      <div className="container-custom flex min-h-[34rem] items-center justify-center px-6 pt-20 text-center">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-sage-600">Eroare 404</p>
          <h1 className="mt-4 text-4xl font-light text-slate-900 sm:text-5xl">
            Articolul nu a fost găsit
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
            Este posibil ca articolul să fi fost mutat sau să nu mai fie disponibil.
          </p>
          <Link to="/blog" className="btn-primary mt-8">
            Înapoi la blog
          </Link>
        </div>
      </div>
    )
  }

  if (requestState.status === 'error' || !article) {
    return (
      <div className="container-custom flex min-h-[34rem] items-center justify-center px-6 pt-20 text-center">
        <div>
          <h1 className="text-4xl font-light text-slate-900">Articolul nu poate fi încărcat</h1>
          <p className="mt-5 text-lg text-slate-600">
            A apărut o problemă. Te rugăm să încerci din nou mai târziu.
          </p>
          <Link to="/blog" className="btn-secondary mt-8">
            Înapoi la blog
          </Link>
        </div>
      </div>
    )
  }

  const formattedDate = formatArticleDate(article.published_at)

  return (
    <main className="pt-20">
      <article>
        <header className="bg-sage-50/30 py-16 sm:py-20">
          <div className="container-custom max-w-5xl text-center">
            {formattedDate && (
              <time
                dateTime={article.published_at}
                className="text-sm uppercase tracking-[0.18em] text-sage-600"
              >
                {formattedDate}
              </time>
            )}
            <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-light leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-sage-500" />
          </div>
        </header>

        <div className="container-custom py-12 sm:py-16">
          <div className="mx-auto max-w-4xl">
            {article.cover_image && (
              <img
                src={article.cover_image}
                alt=""
                className="mb-12 aspect-[16/9] w-full rounded-3xl object-cover shadow-sm"
              />
            )}

            <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-sage-700 prose-a:decoration-sage-300 prose-a:underline-offset-4 hover:prose-a:text-sage-800 prose-strong:text-slate-800 prose-blockquote:border-sage-300 prose-blockquote:text-slate-600 prose-li:text-slate-700 prose-hr:border-sage-200">
              <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{article.content_md}</ReactMarkdown>
            </div>

            <div className="mt-14 border-t border-sage-200 pt-8">
              <Link
                to="/blog"
                className="font-medium text-sage-700 transition-colors hover:text-sage-800"
              >
                ← Înapoi la toate articolele
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}

export default function BlogArticlePage() {
  const { slug } = useParams()

  return (
    <div className="min-h-screen bg-cream-50 text-slate-800">
      <Navigation />
      <ArticleContent key={slug} slug={slug} />
      <Footer />
    </div>
  )
}
