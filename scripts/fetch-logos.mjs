// Vendors full-COLOR brand logos (Devicon) for the toolbox into
// public/assets/logos/<slug>.svg. No runtime dependency — run at build/dev time
// and commit the output. Reports any that 404 so the tool can fall back to a
// monogram (slug: null) in content.js.
//
// Usage: node scripts/fetch-logos.mjs
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, 'public/assets/logos')
mkdirSync(outDir, { recursive: true })

const BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'

// slug (local filename) -> devicon path (colored "original"/"plain" variants)
const MAP = {
  c: 'c/c-original.svg',
  cplusplus: 'cplusplus/cplusplus-original.svg',
  python: 'python/python-original.svg',
  go: 'go/go-original.svg',
  javascript: 'javascript/javascript-original.svg',
  html5: 'html5/html5-original.svg',
  css: 'css3/css3-original.svg',
  nodedotjs: 'nodejs/nodejs-original.svg',
  express: 'express/express-original.svg',
  react: 'react/react-original.svg',
  docker: 'docker/docker-original.svg',
  kubernetes: 'kubernetes/kubernetes-plain.svg',
  helm: 'helm/helm-original.svg',
  git: 'git/git-original.svg',
  mysql: 'mysql/mysql-original.svg',
  postgresql: 'postgresql/postgresql-original.svg',
  mongodb: 'mongodb/mongodb-original.svg',
  oracle: 'oracle/oracle-original.svg',
  azure: 'azure/azure-original.svg',
  vscode: 'vscode/vscode-original.svg',
  amazonwebservices: 'amazonwebservices/amazonwebservices-original-wordmark.svg',
}

const missing = []
for (const [slug, path] of Object.entries(MAP)) {
  try {
    const res = await fetch(`${BASE}/${path}`)
    if (!res.ok) {
      missing.push(`${slug} -> ${path} (HTTP ${res.status})`)
      continue
    }
    writeFileSync(resolve(outDir, `${slug}.svg`), await res.text())
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
