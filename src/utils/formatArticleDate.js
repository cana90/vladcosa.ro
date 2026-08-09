const romanianDateFormatter = new Intl.DateTimeFormat('ro-RO', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function formatArticleDate(value) {
  if (!value) return ''

  const normalizedValue =
    typeof value === 'string' &&
    /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)
      ? `${value.replace(' ', 'T')}Z`
      : value
  const date = new Date(normalizedValue)
  if (Number.isNaN(date.getTime())) return ''

  return romanianDateFormatter.format(date)
}
