import { profile } from '../data/content.js'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__name">{profile.name}</span>
        <nav className="footer__links" aria-label="Footer">
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={profile.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profile.resumePath} download>
            CV
          </a>
        </nav>
        <span className="footer__note">
          Built with React · {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  )
}
