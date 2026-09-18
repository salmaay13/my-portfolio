import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'

const sectionIds = ['home', 'about', 'experience', 'projects', 'skills', 'contact']

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const navLabels = {
    home: t.nav.home,
    about: t.nav.about,
    experience: t.nav.experience,
    projects: t.nav.projects,
    skills: t.nav.skills,
    contact: t.nav.contact,
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <button className="navbar__logo" onClick={() => handleNavClick('home')} aria-label="Home">
          <span className="navbar__logo-first">S</span>
          <span className="navbar__logo-last">A</span>
        </button>

        <nav className="navbar__links navbar__links--desktop">
          {sectionIds.map((id) => (
            <button key={id} onClick={() => handleNavClick(id)} className="navbar__link">
              {navLabels[id]}
            </button>
          ))}
        </nav>

        <div className="navbar__actions">
          <button className="lang-switch" onClick={toggleLang} aria-label="Toggle language">
            <span className={lang === 'en' ? 'lang-switch__active' : ''}>EN</span>
            {' / '}
            <span className={lang === 'fr' ? 'lang-switch__active' : ''}>FR</span>
          </button>
          <button
            className="navbar__toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="navbar__links navbar__links--mobile">
          {sectionIds.map((id) => (
            <button key={id} onClick={() => handleNavClick(id)} className="navbar__link">
              {navLabels[id]}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}
