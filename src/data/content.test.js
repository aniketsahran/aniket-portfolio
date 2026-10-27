import { describe, it, expect } from 'vitest'
import content from './content.js'

const TAGLINE =
  "I turn hard systems problems into reliable software — and I'll happily learn whatever the next one needs."

describe('content data module', () => {
  it('exposes the correct profile identity and links', () => {
    expect(content.profile.name).toBe('Aniket Sahran')
    expect(content.profile.links.github).toBe('https://github.com/aniketsahran')
    expect(content.profile.tagline).toBe(TAGLINE)
  })

  it('has three Cloudera experience entries incl. SDE-I', () => {
    expect(content.experience.length).toBe(3)
    const sde1 = content.experience.find((e) => e.role === 'Software Developer - I')
    expect(sde1).toBeTruthy()
    expect(sde1.period).toMatch(/2025/)
  })

  it('exposes the three projects by slug in order', () => {
    expect(content.projects.map((p) => p.slug)).toEqual([
      'filmpire',
      'student-management-system',
      'noterrrr',
    ])
  })

  it('carries the Beyond Code volunteering org', () => {
    expect(content.beyondCode.volunteering.org).toBe('Cloudera Cares')
  })

  it('exposes a tools dataset with logo slugs', () => {
    expect(Array.isArray(content.tools)).toBe(true)
    expect(content.tools.length).toBeGreaterThan(0)
    const all = content.tools.flatMap((g) => g.items)
    all.forEach((t) => expect(typeof t.name).toBe('string'))
    const go = all.find((t) => t.name === 'Golang' || t.name === 'Go')
    expect(go).toBeTruthy()
    expect(go.slug).toBeTruthy()
  })
})
