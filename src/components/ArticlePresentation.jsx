import MarkdownContent from './MarkdownContent.jsx'
import { formatArticleDate } from '../utils/formatArticleDate.js'

export default function ArticlePresentation({
  title,
  publishedAt,
  coverImage,
  content,
  emptyContentMessage,
  children,
}) {
  const formattedDate = formatArticleDate(publishedAt)

  return (
    <article>
      <header className="bg-sage-50/30 py-16 sm:py-20">
        <div className="container-custom max-w-5xl text-center">
          {formattedDate && (
            <time
              dateTime={publishedAt}
              className="text-sm uppercase tracking-[0.18em] text-sage-600"
            >
              {formattedDate}
            </time>
          )}
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-light leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-sage-500" />
        </div>
      </header>

      <div className="container-custom py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          {coverImage && (
            <img
              src={coverImage}
              alt=""
              className="mb-12 aspect-[16/9] w-full rounded-3xl object-cover shadow-sm"
            />
          )}

          {content.trim() ? (
            <MarkdownContent content={content} />
          ) : (
            emptyContentMessage && (
              <p className="text-center text-lg text-slate-500">
                {emptyContentMessage}
              </p>
            )
          )}

          {children}
        </div>
      </div>
    </article>
  )
}
