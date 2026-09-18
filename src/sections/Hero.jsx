import { User } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'

const floatingTags = [
  { label: 'React', style: { top: '6%', left: '-8%' } },
  { label: 'Odoo', style: { top: '38%', right: '-10%' } },
  { label: 'Python', style: { bottom: '18%', left: '-10%' } },
  { label: 'PostgreSQL', style: { bottom: '-4%', right: '4%' } },
]

export default function Hero() {
  const { t } = useLanguage()

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="hero__eyebrow fade-in">— {t.hero.role}</p>
          <h1 className="hero__name fade-in fade-in--delay-1">
            <span className="hero__name-first">SALMA</span>
            <span className="hero__name-last">AYOUCH</span>
          </h1>
          <p className="hero__description fade-in fade-in--delay-2">{t.hero.description}</p>

          <div className="hero__actions fade-in fade-in--delay-3">
            <button className="btn btn--primary" onClick={() => scrollTo('projects')}>
              {t.hero.viewWork}
            </button>
            <button className="btn btn--secondary" onClick={() => scrollTo('contact')}>
              {t.hero.contactMe}
            </button>
            <a className="btn btn--ghost" href="/cv.pdf" download>
              {t.hero.downloadCv}
            </a>
          </div>
        </div>

        <div className="hero__portrait fade-in fade-in--delay-2">
          <div className="hero__frame">
            <span className="hero__corner hero__corner--tl" />
            <span className="hero__corner hero__corner--br" />
            <div className="hero__photo">
              {/* Replace with your own photo: import it and swap this placeholder for an <img> */}
              <User size={64} strokeWidth={1.2} />
            </div>
          </div>

          {floatingTags.map((tag) => (
            <span key={tag.label} className="hero__tag" style={tag.style}>
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
