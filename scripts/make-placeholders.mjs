// Generates tasteful, on-brand SVG placeholder images for project screenshots
// and Beyond Code photos. Re-run any time; real assets simply overwrite these
// files at the same paths. Usage: node scripts/make-placeholders.mjs
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const PAPER = '#0e1014'
const PANEL = '#141720'
const INK = '#edeef0'
const ACCENT = '#7fae9e'
const SOFT = '#223029'
const LINE = '#20242c'

// A mock "app window" frame used for project screenshot placeholders.
function uiPlaceholder({ w = 1200, h = 800, title, subtitle }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title} placeholder">
  <rect width="${w}" height="${h}" fill="${PAPER}"/>
  <rect x="40" y="40" width="${w - 80}" height="${h - 80}" rx="18" fill="${PANEL}" stroke="${LINE}" stroke-width="2"/>
  <rect x="40" y="40" width="${w - 80}" height="70" rx="18" fill="${PAPER}"/>
  <circle cx="80" cy="76" r="8" fill="${ACCENT}"/>
  <circle cx="108" cy="76" r="8" fill="${SOFT}"/>
  <circle cx="136" cy="76" r="8" fill="${LINE}"/>
  <rect x="80" y="150" width="${(w - 80) * 0.5}" height="26" rx="8" fill="${INK}" opacity="0.82"/>
  <rect x="80" y="200" width="${(w - 80) * 0.66}" height="14" rx="7" fill="${INK}" opacity="0.18"/>
  <rect x="80" y="228" width="${(w - 80) * 0.58}" height="14" rx="7" fill="${INK}" opacity="0.18"/>
  <rect x="80" y="300" width="200" height="140" rx="12" fill="${SOFT}" opacity="0.5"/>
  <rect x="300" y="300" width="200" height="140" rx="12" fill="${SOFT}" opacity="0.35"/>
  <rect x="520" y="300" width="200" height="140" rx="12" fill="${SOFT}" opacity="0.5"/>
  <rect x="80" y="${h - 150}" width="180" height="44" rx="10" fill="${ACCENT}"/>
  <text x="${w / 2}" y="${h - 60}" text-anchor="middle" font-family="Inter, sans-serif" font-size="22" fill="${INK}" opacity="0.5">${subtitle}</text>
</svg>\n`
}

// A soft abstract card used for Beyond Code photo placeholders.
function photoPlaceholder({ w = 900, h = 700, label, hue = 0 }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label} placeholder">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${SOFT}"/>
      <stop offset="1" stop-color="${PAPER}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <circle cx="${w * 0.72}" cy="${h * 0.3}" r="${90 + hue}" fill="${ACCENT}" opacity="0.28"/>
  <circle cx="${w * 0.3}" cy="${h * 0.66}" r="${120 - hue}" fill="${ACCENT}" opacity="0.16"/>
  <text x="${w / 2}" y="${h / 2}" text-anchor="middle" font-family="Inter, sans-serif" font-size="26" fill="${INK}" opacity="0.45">${label}</text>
</svg>\n`
}

const files = [
  ['public/assets/projects/filmpire-1.svg', uiPlaceholder({ title: 'Filmpire', subtitle: 'Filmpire — screenshot placeholder' })],
  ['public/assets/projects/filmpire-2.svg', uiPlaceholder({ title: 'Filmpire', subtitle: 'Filmpire — genre view placeholder' })],
  ['public/assets/projects/sms-1.svg', uiPlaceholder({ title: 'Student Management System', subtitle: 'SMS — API server placeholder' })],
  ['public/assets/projects/sms-2.svg', uiPlaceholder({ title: 'Student Management System', subtitle: 'SMS — deployment placeholder' })],
  ['public/assets/projects/noterrrr-1.svg', uiPlaceholder({ title: 'Noterrrr', subtitle: 'Noterrrr — notes view placeholder' })],
  ['public/assets/projects/noterrrr-2.svg', uiPlaceholder({ title: 'Noterrrr', subtitle: 'Noterrrr — editor placeholder' })],
  ['public/assets/projects/pristine-1.svg', uiPlaceholder({ title: 'Pristine', subtitle: 'Pristine — dashboard placeholder' })],
  ['public/assets/projects/pristine-2.svg', uiPlaceholder({ title: 'Pristine', subtitle: 'Pristine — schedule placeholder' })],
  ['public/assets/projects/the-link-1.svg', uiPlaceholder({ title: 'The Link', subtitle: 'The Link — doubts feed placeholder' })],
  ['public/assets/projects/the-link-2.svg', uiPlaceholder({ title: 'The Link', subtitle: 'The Link — resources placeholder' })],
  ['public/assets/beyond/volunteer-1.svg', photoPlaceholder({ label: 'Braille cards — photo coming soon', hue: 0 })],
  ['public/assets/beyond/volunteer-2.svg', photoPlaceholder({ label: 'Painting a school — photo coming soon', hue: 20 })],
  ['public/assets/beyond/volunteer-3.svg', photoPlaceholder({ label: 'Cards for children — photo coming soon', hue: 40 })],
]

for (const [rel, svg] of files) {
  const abs = resolve(root, rel)
  mkdirSync(dirname(abs), { recursive: true })
  writeFileSync(abs, svg)
  console.log('wrote', rel)
}
