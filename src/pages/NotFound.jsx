import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <main id="top" className="notfound">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1 className="notfound__title">Page not found.</h1>
        <p className="notfound__lead">
          That page doesn&apos;t exist (or moved). Let&apos;s get you back.
        </p>
        <Link to="/" className="btn btn--primary">
          Back home
        </Link>
      </div>
    </main>
  )
}
