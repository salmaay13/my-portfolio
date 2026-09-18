import { useState } from 'react'
import { Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Frontend-only for now. Wire this up to a backend or a form service
    // (e.g. Formspree, EmailJS) when you're ready to receive real messages.
    setSent(true)
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section__title">{t.contact.title}</h2>
        <p className="section__subtitle">{t.contact.subtitle}</p>

        <div className="contact__grid">
          <div className="contact__info">
            <a className="contact__info-item" href="mailto:salmaa.ayouch@gmail.com">
              <Mail size={20} />
              <div>
                <span className="about__label">{t.contact.email}</span>
                <p>salmaa.ayouch@gmail.com</p>
              </div>
            </a>
            <a className="contact__info-item" href="https://github.com/salmaay13" target="_blank" rel="noreferrer">
              <Github size={20} />
              <div>
                <span className="about__label">{t.contact.github}</span>
                <p>https://github.com/salmaay13</p>
              </div>
            </a>
            <a className="contact__info-item" href="https://www.linkedin.com/in/salma-ayouch/" target="_blank" rel="noreferrer">
              <Linkedin size={20} />
              <div>
                <span className="about__label">{t.contact.linkedin}</span>
                <p>https://www.linkedin.com/in/salma-ayouch/</p>
              </div>
            </a>
            <div className="contact__info-item">
              <MapPin size={20} />
              <div>
                <span className="about__label">{t.contact.location}</span>
                <p>Morocco</p>
              </div>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <label>
              {t.contact.formName}
              <input type="text" name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label>
              {t.contact.formEmail}
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              {t.contact.formMessage}
              <textarea name="message" rows={5} value={form.message} onChange={handleChange} required />
            </label>
            <button type="submit" className="btn btn--primary">
              {t.contact.send}
            </button>
            {sent && <p className="contact__sent">{t.contact.sent}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
