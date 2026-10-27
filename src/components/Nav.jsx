import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { profile } from '../data/content.js'
import './Nav.css'

const SECTIONS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'beyond', label: 'Beyond Code' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const prefix = onHome ? '' : '/'
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <a href={`${prefix}#top`} className="nav__brand" aria-label={`${profile.name} — home`}>
          AS
        </a>

        <nav className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Primary">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`${prefix}#${s.id}`} onClick={() => setOpen(false)}>
              {s.label}
            </a>
          ))}
          <a className="nav__cv" href={profile.resumePath} download>
            CV ↓
          </a>
        </nav>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
