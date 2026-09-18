import { Code2, Server, Building2, Database, Wrench } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { skillGroups } from '../data/skills.js'
import { useScrollAnimation } from '../hooks/useScrollAnimation.js'

const icons = {
  frontend: Code2,
  backend: Server,
  erp: Building2,
  database: Database,
  tools: Wrench,
}

export default function Skills() {
  const { t } = useLanguage()
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="skills" className="section section--alt">
      <div className="container">
        <h2 className="section__title">{t.skills.title}</h2>

        <div ref={ref} className={`skills__grid fade-up ${isVisible ? 'is-visible' : ''}`}>
          {skillGroups.map((group) => {
            const Icon = icons[group.key]
            return (
              <div key={group.key} className="skill-card">
                <div className="skill-card__header">
                  <Icon size={20} />
                  <h3>{t.skills.categories[group.key]}</h3>
                </div>
                <div className="skill-card__items">
                  {group.items.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
