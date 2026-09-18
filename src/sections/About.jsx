import { Github, Linkedin, Mail, GraduationCap, MapPin, Languages } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useScrollAnimation } from '../hooks/useScrollAnimation.js'

export default function About() {
  const { t } = useLanguage()
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section__title">{t.about.title}</h2>

        <div ref={ref} className={`about fade-up ${isVisible ? 'is-visible' : ''}`}>
          <p className="about__intro">{t.about.intro}</p>

          <div className="about__grid">
            <div className="about__item">
              <GraduationCap size={20} />
              <div>
                <span className="about__label">{t.about.educationTitle}</span>
                <p>{t.about.education}</p>
              </div>
            </div>

            <div className="about__item">
              <MapPin size={20} />
              <div>
                <span className="about__label">{t.about.locationTitle}</span>
                <p>{t.about.location}</p>
              </div>
            </div>

            <div className="about__item">
              <Languages size={20} />
              <div>
                <span className="about__label">{t.about.languagesTitle}</span>
                <p>{t.about.languages}</p>
              </div>
            </div>
          </div>

          <div className="about__connect">
            <span className="about__label">{t.about.connectTitle}</span>
            <div className="about__connect-links">
              <a href="https://github.com/salmaay13" target="_blank" rel="noreferrer">
                <Github size={18} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/salma-ayouch/" target="_blank" rel="noreferrer">
                <Linkedin size={18} /> LinkedIn
              </a>
              <a href="mailto:salmaa.ayouch@gmail.com">
                <Mail size={18} /> salmaa.ayouch@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
