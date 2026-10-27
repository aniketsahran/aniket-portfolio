// Vendors Simple Icons brand SVGs for the tools in src/data/content.js into
// public/assets/logos/<slug>.svg. No runtime dependency — run at build/dev time
// and commit the output. Re-run any time. Reports any slug that 404s so it can
// be dropped to a text-only chip (slug: null) in content.js.
//
// Usage: node scripts/fetch-logos.mjs
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tools } from '../src/data/content.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, 'public/assets/logos')
mkdirSync(outDir, { recursive: true })

const slugs = [...new Set(tools.flatMap((g) => g.items).map((t) => t.slug).filter(Boolean))]

const missing = []
for (const slug of slugs) {
  const url = `https://cdn.jsdelivr.net/npm/simple-icons/icons/${slug}.svg`
  try {
    const res = await fetch(url)
    if (!res.ok) {
      missing.push(`${slug} (HTTP ${res.status})`)
      continue
    }
    const svg = await res.text()
    writeFileSync(resolve(outDir, `${slug}.svg`), svg)
    console.log('wrote', slug)
  } catch (e) {
    missing.push(`${slug} (${e.message})`)
  }
}

if (missing.length) {
  console.log('\nMISSING (set slug:null in content.js tools):')
  for (const m of missing) console.log('  -', m)
} else {
  console.log('\nAll logos fetched.')
}
