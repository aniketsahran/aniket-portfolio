import { describe, it, expect } from 'vitest'
import { buildMailto } from './mailto.js'

describe('buildMailto', () => {
  it('percent-encodes subject and body with special characters', () => {
    const url = buildMailto({
      to: 'a@b.com',
      subject: 'Hi & bye?',
      body: 'line1\nline2 #x',
    })
    expect(url.startsWith('mailto:a@b.com?')).toBe(true)
    expect(url).toContain('subject=Hi%20%26%20bye%3F')
    expect(url).toContain('%0A') // encoded newline in body
    expect(url).toContain('%23') // encoded hash in body
  })

  it('omits empty params', () => {
    const url = buildMailto({ to: 'a@b.com', subject: '', body: '' })
    expect(url).toBe('mailto:a@b.com')
  })
})
