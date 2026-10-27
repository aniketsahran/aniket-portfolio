// Builds a `mailto:` URL with properly percent-encoded subject and body.
// Empty subject/body params are omitted.
export function buildMailto({ to, subject = '', body = '' }) {
  const params = []
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`)
  if (body) params.push(`body=${encodeURIComponent(body)}`)
  return params.length ? `mailto:${to}?${params.join('&')}` : `mailto:${to}`
}
