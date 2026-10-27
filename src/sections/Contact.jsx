import { useState } from 'react'
import { profile } from '../data/content.js'
import { buildMailto } from '../lib/mailto.js'
import Reveal from '../components/Reveal.jsx'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', subject: '', message: '' })

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = form.subject || `Hello from ${form.name || 'your site'}`
    const body = `${form.message}\n\n— ${form.name}`
    window.location.href = buildMailto({ to: profile.email, subject, body })
  }

  return (
    <section id="contact" className="contact section">
      <div className="container contact__inner">
        <div className="contact__lead">
          <Reveal as="p" className="eyebrow">
            Contact
          </Reveal>
          <Reveal as="h2" className="section-title">
            Let&apos;s build something.
          </Reveal>
          <Reveal as="p" className="contact__blurb">
            Whether it&apos;s a role, a project, or just a good problem to chew on — I&apos;d love to
            hear from you.
          </Reveal>

          <Reveal className="contact__links">
            <a href={buildMailto({ to: profile.email })}>{profile.email}</a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={profile.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </Reveal>
        </div>

        <Reveal as="form" className="contact__form" onSubmit={handleSubmit} delay={0.08}>
          <div className="field">
            <label htmlFor="cf-name">Name</label>
            <input id="cf-name" type="text" value={form.name} onChange={update('name')} autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="cf-subject">Subject</label>
            <input id="cf-subject" type="text" value={form.subject} onChange={update('subject')} />
          </div>
          <div className="field">
            <label htmlFor="cf-message">Message</label>
            <textarea id="cf-message" rows="5" value={form.message} onChange={update('message')} />
          </div>
          <button type="submit" className="btn btn--primary">
            Send email
          </button>
          <p className="contact__note">Opens in your email app — no data leaves your device.</p>
        </Reveal>
      </div>
    </section>
  )
}
