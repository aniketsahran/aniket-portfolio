import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const theme = readFileSync(resolve(here, 'theme.css'), 'utf8')
const globalCss = readFileSync(resolve(here, 'global.css'), 'utf8')

function tokenHex(name) {
  const m = theme.match(new RegExp(`${name}\\s*:\\s*(#[0-9a-fA-F]{3,8})`))
  if (!m) throw new Error(`token ${name} not found in theme.css`)
  return m[1]
}

function relLum(hex) {
  const h = hex.replace('#', '')
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255)
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

function contrast(a, b) {
  const [l1, l2] = [relLum(a), relLum(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

describe('primary button contrast', () => {
  it('defines .btn--primary in the shared global stylesheet', () => {
    expect(globalCss).toMatch(/\.btn--primary\s*\{/)
  })

  it('uses a background/foreground pair that meets WCAG AA (>= 4.5:1)', () => {
    // Extract the .btn--primary rule body from global.css.
    const rule = globalCss.match(/\.btn--primary\s*\{([^}]*)\}/)
    expect(rule, '.btn--primary rule must live in global.css').not.toBeNull()
    const bgToken = rule[1].match(/background:\s*var\((--[a-z-]+)\)/)
    expect(bgToken, '.btn--primary must set a background var').not.toBeNull()

    const bg = tokenHex(bgToken[1])
    const fg = tokenHex('--on-accent')
    expect(contrast(bg, fg)).toBeGreaterThanOrEqual(4.5)
  })
})
