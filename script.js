// Initialize Lucide Icons
lucide.createIcons();

// Sticky Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 12) {
    navbar.classList.add('navbar--scrolled');
  } else {
    navbar.classList.remove('navbar--scrolled');
  }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Scroll Animations (IntersectionObserver)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

// Form Submission Simulation
const contactForm = document.getElementById('contact-form');
const contactSent = document.getElementById('contact-sent');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  contactSent.classList.remove('hidden');
  contactForm.reset();
});

// Internationalization (EN / FR)
const translations = {
  en: {
    "nav.home": "Home", "nav.about": "About", "nav.experience": "Experience", "nav.projects": "Projects", "nav.skills": "Skills", "nav.contact": "Contact",
    "hero.role": "— Software Engineering Student", "hero.description": "Building modern web applications and business-oriented solutions with React, Odoo, Python and PostgreSQL.",
    "hero.viewWork": "View My Work", "hero.contactMe": "Contact Me", "hero.downloadCv": "Download CV",
    "about.title": "About Me", "about.intro": "I'm a 3rd-year Software Engineering student passionate about building reliable, business-oriented web applications.",
    "about.educationTitle": "Education", "about.education": "Software Engineering / Computer and Networks Engineering — EMSI, Morocco (3rd year)",
    "about.locationTitle": "Location", "about.location": "Morocco", "about.languagesTitle": "Languages", "about.languages": "French, English, Arabic", "about.connectTitle": "Connect",
    "experience.title": "Experience", "experience.period": "July 2026 – August 2026", "experience.role": "Software Engineering Intern", "experience.description": "Designed and developed a generic and reusable Approval Workflow Engine for Odoo Community 18.", "experience.techLabel": "Technologies",
    "projects.title": "Projects", "projects.subtitle": "A selection of things I have built.", "projects.p1.title": "Approval Workflow Engine", "projects.p1.desc": "A generic and reusable approval workflow engine developed for Odoo Community 18.", "projects.p2.title": "Odoo Data Quality", "projects.p2.desc": "A solution designed to detect, monitor and improve data quality within Odoo.", "projects.p3.title": "Authentication Web Application", "projects.p3.desc": "Full authentication web application covering sign up, login and session handling.",
    "skills.title": "Skills", "skills.cat.frontend": "Frontend", "skills.cat.backend": "Backend", "skills.cat.erp": "ERP / Business", "skills.cat.database": "Database", "skills.cat.tools": "Tools",
    "contact.title": "Contact", "contact.subtitle": "Let's talk about opportunities and ideas.", "contact.email": "Email", "contact.github": "GitHub", "contact.linkedin": "LinkedIn", "contact.formName": "Name", "contact.formEmail": "Email", "contact.formMessage": "Message", "contact.send": "Send Message", "contact.sent": "Message ready — form submitted!",
    "footer.rights": "All rights reserved."
  },
  fr: {
    "nav.home": "Accueil", "nav.about": "À propos", "nav.experience": "Expérience", "nav.projects": "Projets", "nav.skills": "Compétences", "nav.contact": "Contact",
    "hero.role": "— Étudiante en Ingénierie Logicielle", "hero.description": "Je conçois des applications web modernes et des solutions orientées métier avec React, Odoo, Python et PostgreSQL.",
    "hero.viewWork": "Voir mes projets", "hero.contactMe": "Me contacter", "hero.downloadCv": "Télécharger le CV",
    "about.title": "À propos de moi", "about.intro": "Étudiante en 3ème année d'Ingénierie Logicielle, passionnée par la création d'applications web fiables et orientées métier.",
    "about.educationTitle": "Formation", "about.education": "Ingénierie Logicielle / Informatique et Réseaux — EMSI, Maroc (3ème année)",
    "about.locationTitle": "Localisation", "about.location": "Maroc", "about.languagesTitle": "Langues", "about.languages": "Français, Anglais, Arabe", "about.connectTitle": "Me suivre",
    "experience.title": "Expérience", "experience.period": "Juillet 2026 – Août 2026", "experience.role": "Stagiaire Ingénieure Logiciel", "experience.description": "Conception et développement d'un moteur de workflow d'approbation générique et réutilisable pour Odoo Community 18.", "experience.techLabel": "Technologies",
    "projects.title": "Projets", "projects.subtitle": "Une sélection de projets que j'ai réalisés.", "projects.p1.title": "Moteur de Workflow d'Approbation", "projects.p1.desc": "Moteur de workflow d'approbation générique développé pour Odoo Community 18.", "projects.p2.title": "Qualité des données Odoo", "projects.p2.desc": "Solution pour détecter et améliorer la qualité des données dans Odoo.", "projects.p3.title": "Application Web d'Authentification", "projects.p3.desc": "Application web complète d'authentification sécurisée.",
    "skills.title": "Compétences", "skills.cat.frontend": "Frontend", "skills.cat.backend": "Backend", "skills.cat.erp": "ERP / Métier", "skills.cat.database": "Base de données", "skills.cat.tools": "Outils",
    "contact.title": "Contact", "contact.subtitle": "Discutons d'opportunités et d'idées.", "contact.email": "Email", "contact.github": "GitHub", "contact.linkedin": "LinkedIn", "contact.formName": "Nom", "contact.formEmail": "Email", "contact.formMessage": "Message", "contact.send": "Envoyer le message", "contact.sent": "Message prêt — formulaire envoyé !",
    "footer.rights": "Tous droits réservés."
  }
};

let currentLang = 'en';
const langBtn = document.getElementById('lang-switch');
const langEn = document.getElementById('lang-en');
const langFr = document.getElementById('lang-fr');

langBtn.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'fr' : 'en';
  langEn.classList.toggle('lang-switch__active', currentLang === 'en');
  langFr.classList.toggle('lang-switch__active', currentLang === 'fr');

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });
});