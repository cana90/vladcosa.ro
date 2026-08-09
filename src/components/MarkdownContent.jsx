import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'

const proseClasses =
  'prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-sage-700 prose-a:decoration-sage-300 prose-a:underline-offset-4 hover:prose-a:text-sage-800 prose-strong:text-slate-800 prose-blockquote:border-sage-300 prose-blockquote:text-slate-600 prose-li:text-slate-700 prose-hr:border-sage-200'

export default function MarkdownContent({ content, className = '' }) {
  return (
    <div className={`${proseClasses} ${className}`}>
      <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{content}</ReactMarkdown>
    </div>
  )
}
