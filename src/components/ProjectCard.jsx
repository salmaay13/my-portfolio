import { Github, ExternalLink, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useScrollAnimation } from '../hooks/useScrollAnimation.js'

export default function ProjectCard({ project, index }) {
  const { t } = useLanguage()
  const [ref, isVisible] = useScrollAnimation()

  return (
    <article
      ref={ref}
      className={`project-card fade-up ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="project-card__media">
        {project.image ? (
          <img src={project.image} alt={project.title} />
        ) : (
          <div className="project-card__placeholder">
            <span>{project.number}</span>
          </div>
        )}
      </div>

      <div className="project-card__body">
        <span className="project-card__number">{project.number}</span>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.description}</p>

        {project.features?.length > 0 && (
          <div className="project-card__features">
            <span className="project-card__label">{t.projects.featuresLabel}</span>
            <ul>
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="project-card__tech">
          {project.technologies.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-card__actions">
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn--ghost btn--sm">
            <Github size={16} /> {t.projects.github}
          </a>
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn btn--ghost btn--sm">
              <ExternalLink size={16} /> {t.projects.demo}
            </a>
          )}
          {project.detailsUrl && (
            <a href={project.detailsUrl} target="_blank" rel="noreferrer" className="btn btn--ghost btn--sm">
              <ArrowUpRight size={16} /> {t.projects.details}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
