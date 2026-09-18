import { Briefcase } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { experience } from '../data/experience.js'
import { useScrollAnimation } from '../hooks/useScrollAnimation.js'

export default function Experience() {
  const { t } = useLanguage()
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="experience" className="section section--alt">
      <div className="container">
        <h2 className="section__title">{t.experience.title}</h2>

        <div ref={ref} className={`timeline fade-up ${isVisible ? 'is-visible' : ''}`}>
          <div className="timeline__line" />

          <div className="timeline__item">
            <div className="timeline__dot">
              <Briefcase size={16} />
            </div>
            <div className="timeline__content">
              <span className="timeline__period">{t.experience.period}</span>
              <h3 className="timeline__role">{t.experience.role}</h3>
              <p className="timeline__company">{experience.company}</p>
              <p className="timeline__description">{t.experience.description}</p>

              <div className="timeline__tech">
                <span className="about__label">{t.experience.techLabel}</span>
                <div className="project-card__tech">
                  {experience.technologies.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
