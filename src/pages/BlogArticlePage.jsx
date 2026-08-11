import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ArticlePresentation from '../components/ArticlePresentation.jsx'
import Footer from '../components/Footer.jsx'
import Navigation from '../components/Navigation.jsx'
import ShareArticleButton from '../components/ShareArticleButton.jsx'
import { usePageMetadata } from '../hooks/usePageMetadata.js'

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
    article?.excerpt ||
    'Articol despre psihologie și psihoterapie publicat de Vlad Coșa.'

  usePageMetadata(title, description)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    async function loadArticle() {
      try {
        const response = await fetch(
          `/api/articles/${encodeURIComponent(slug)}`,
          {
            credentials: 'include',
            signal: controller.signal,
          },
        )

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
          <p className="text-sm uppercase tracking-[0.2em] text-sage-600">
            Eroare 404
          </p>
          <h1 className="mt-4 text-4xl font-light text-slate-900 sm:text-5xl">
            Articolul nu a fost găsit
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
            Este posibil ca articolul să fi fost mutat sau să nu mai fie
            disponibil.
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
          <h1 className="text-4xl font-light text-slate-900">
            Articolul nu poate fi încărcat
          </h1>
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

  const publicUrl = `${window.location.origin}/blog/${article.slug}`

  return (
    <main className="pt-20">
      <ArticlePresentation
        title={article.title}
        publishedAt={article.published_at}
        coverImage={article.cover_image}
        content={article.content_md}
      >
        <div className="mt-14 border-t border-sage-200 pt-8">
          <div className="flex flex-col gap-5 rounded-2xl bg-sage-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-slate-900">
                Distribuie acest articol
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Trimite-l unei persoane căreia i-ar putea fi de ajutor.
              </p>
            </div>
            <ShareArticleButton title={article.title} url={publicUrl} />
          </div>

          <Link
            to="/blog"
            className="mt-8 inline-block font-medium text-sage-700 transition-colors hover:text-sage-800"
          >
            ← Înapoi la toate articolele
          </Link>
        </div>
      </ArticlePresentation>
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
