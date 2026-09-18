// ============ ANIMATED BACKGROUND (Baby Pink Palette) ============
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, dots = [], orbs = [], symbols = [], t = 0;

function resize() {
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
}
resize();
addEventListener('resize', resize);

for (let i = 0; i < 45; i++) {
  dots.push({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 1.4 + 0.4,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    a: Math.random() * 0.4 + 0.1,
    tw: Math.random() * Math.PI * 2,
    tws: Math.random() * 0.02 + 0.008
  });
}

for (let i = 0; i < 4; i++) {
  orbs.push({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 120 + 90,
    ox: Math.random() * 1000,
    oy: Math.random() * 1000
  });
}

const glyphs = ['<>', '</>', '<div>', '{ }', '( )', '=>', '===', 'const', 'import', 'React', 'Odoo', 'Python'];
for (let i = 0; i < 14; i++) {
  symbols.push({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    txt: glyphs[Math.floor(Math.random() * glyphs.length)],
    size: Math.random() * 9 + 11,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    rot: Math.random() * Math.PI * 2,
    rs: (Math.random() - 0.5) * 0.006,
    a: Math.random() * 0.08 + 0.09
  });
}

function draw() {
  t += 0.005;
  ctx.clearRect(0, 0, W, H);

  // Soft glowing baby pink orbs
  for (const o of orbs) {
    const x = o.x + Math.sin(t + o.ox) * 40;
    const y = o.y + Math.cos(t * 0.8 + o.oy) * 40;
    const g = ctx.createRadialGradient(x, y, 0, x, y, o.r);
    g.addColorStop(0, `rgba(242, 169, 194, 0.08)`);
    g.addColorStop(1, `rgba(242, 169, 194, 0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, o.r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Floating dev symbols
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (const s of symbols) {
    s.x += s.vx; s.y += s.vy; s.rot += s.rs;
    if (s.x < -60) s.x = W + 60; if (s.x > W + 60) s.x = -60;
    if (s.y < -60) s.y = H + 60; if (s.y > H + 60) s.y = -60;
    ctx.save();
    ctx.translate(s.x, s.y);
    ctx.rotate(s.rot);
    ctx.font = `${s.size}px monospace`;
    ctx.fillStyle = `rgba(242, 169, 194, ${s.a})`;
    ctx.fillText(s.txt, 0, 0);
    ctx.restore();
  }

  // Twinkling dots
  for (const p of dots) {
    p.x += p.vx; p.y += p.vy; p.tw += p.tws;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    const twinkle = p.a * (0.5 + 0.5 * Math.sin(p.tw));
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(242, 169, 194, ${twinkle})`;
    ctx.fill();
  }

  requestAnimationFrame(draw);
}
draw();

// ============ INTRO PRELOADER TIMELINE ============
document.body.classList.add('locked');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const tl = gsap.timeline({
  defaults: { ease: 'power3.out' },
  onComplete: () => document.body.classList.remove('locked')
});

if (reduced) {
  gsap.set('#intro', { display: 'none' });
  gsap.set('#navbar, .hero-btns, .hero-visual, .scroll-hint', { opacity: 1, y: 0, scale: 1 });
  gsap.set('.reveal-line > span', { y: 0 });
  document.body.classList.remove('locked');
} else {
  tl.to('.intro-line', { width: 220, duration: 0.7 })
    .to('.intro-name .word span', { y: 0, duration: 0.9, stagger: 0.15 }, '-=0.2')
    .to('.intro-tag span', { y: 0, duration: 0.7 }, '-=0.4')
    .to({}, { duration: 0.8 })
    .to('.intro-content', { y: -60, opacity: 0, duration: 0.5, ease: 'power2.in' })
    .to('.intro-panel.top', { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '-=0.1')
    .to('.intro-panel.bottom', { yPercent: 100, duration: 0.9, ease: 'power4.inOut' }, '<')
    .set('#intro', { display: 'none' })
    .to('#navbar', { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
    .to('.reveal-line > span', { y: 0, duration: 0.9, stagger: 0.12 }, '-=0.5')
    .to('.hero-btns', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
    .to('.hero-visual', { opacity: 1, scale: 1, duration: 0.9 }, '-=0.8')
    .to('.scroll-hint', { opacity: 1, duration: 0.6 }, '-=0.3');
}

// ============ NAVBAR SCROLL ============
addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', scrollY > 60);
});

// ============ SCROLL REVEAL ============
const observer = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ============ FORMSPREE AJAX WITH CUSTOM POPUP ============
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('success-modal');
const closeModal = document.getElementById('close-modal');

if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        contactForm.reset();
        successModal.classList.remove('hidden');
      } else {
        alert('Oops! There was a problem submitting your form.');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });
}

if (closeModal) {
  closeModal.addEventListener('click', () => {
    successModal.classList.add('hidden');
  });
}

// ============ CUSTOM CURSOR ============
(function () {
  if (!matchMedia('(pointer: fine)').matches) return;
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = innerWidth / 2, my = innerHeight / 2;
  let rx = mx, ry = my;

  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  function loop() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll('a, button, .icon-tile, .info-item, .exp-item, .skill-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
})();

// ============ LANGUAGE TOGGLE (EN / FR) ============
(function () {
  const translations = {
    nav_home: ["Home", "Accueil"],
    nav_about: ["About", "À propos"],
    nav_exp: ["Experience", "Expérience"],
    nav_proj: ["Projects", "Projets"],
    nav_skills: ["Skills", "Compétences"],
    nav_contact: ["Contact", "Contact"],

    hero_tag: ["— Software Engineering Student", "— Étudiante en Ingénierie Logicielle"],
    hero_desc: ["Building modern web applications and business-oriented solutions with React, Odoo, Python, and PostgreSQL.", "Je conçois des applications web modernes et des solutions orientées métier avec React, Odoo, Python et PostgreSQL."],
    hero_btn1: ["View My Work", "Voir mes projets"],
    hero_btn2: ["Contact Me", "Me contacter"],
    hero_cv: ["Download CV", "Télécharger CV"],

    about_title: ["About <em>Me</em>", "À <em>propos</em>"],
    about_intro: ["3rd-year Software Engineering student passionate about building reliable, business-oriented web applications.", "Étudiante en 3ème année d'Ingénierie Logicielle, passionnée par la création d'applications web fiables et orientées métier."],
    about_body: ["I enjoy working across the stack—from crafting clean interfaces to designing solid backend logic and ERP integrations with Odoo, Python, and modern web frameworks.", "J'aime travailler sur l'ensemble de la pile technique—de la conception d'interfaces claires à la logique backend et aux intégrations ERP avec Odoo, Python et des frameworks web modernes."],
    about_edu_val: ["EMSI — Software Engineering (3rd Year)", "EMSI — Ingénierie Logicielle (3ème année)"],
    about_city: ["Education", "Formation"],
    about_loc: ["Location", "Localisation"],
    about_email: ["Email", "Email"],
    about_langs: ["Languages", "Langues"],
    about_langs_val: ["French · English · Arabic", "Français · Anglais · Arabe"],

    exp_title: ["My <em>Experience</em>", "Mon <em>Expérience</em>"],
    exp_dur: ["2 Months", "2 Mois"],
    exp_role: ["Software Engineering Intern", "Stagiaire Ingénieure Logiciel"],
    exp_desc: ["Designed and developed a generic and reusable Approval Workflow Engine for Odoo Community 18, enabling configurable approval workflows, validation steps, tracking, and seamless business-process integration.", "Conception et développement d'un moteur de workflow d'approbation générique et réutilisable pour Odoo Community 18, permettant des workflows configurables, des étapes de validation, un suivi et une intégration aux processus métier."],

    proj_title: ["My <em>Projects</em>", "Mes <em>Projets</em>"],
    p1_cat: ["ERP Module · Odoo 18", "Module ERP · Odoo 18"],
    p1_sub: ["Reusable Approval & Validation Module", "Module d'Approbation & Validation Réutilisable"],
    p1_desc: ["A generic approval workflow engine for Odoo Community 18 featuring configurable validation steps, audit trails, and process tracking across custom business workflows.", "Moteur de workflow d'approbation générique pour Odoo Community 18 avec étapes de validation configurables, suivi d'audit et intégration métier."],

    p2_cat: ["ERP Analytics · Data Quality", "Analyse ERP · Qualité des Données"],
    p2_sub: ["Data Detection & Monitoring Solution", "Solution de Détection & Suivi des Données"],
    p2_desc: ["A targeted solution designed to detect, monitor, and improve database integrity and record quality within Odoo environments.", "Solution pour détecter, surveiller et améliorer l'intégrité et la qualité des données dans Odoo."],

    p3_cat: ["Full-Stack Web App", "Application Web Full-Stack"],
    p3_sub: ["Secure Authentication & Session Management", "Authentification Sécurisée & Gestion des Sessions"],
    p3_desc: ["Full-stack web application covering secure sign up, login, session persistence, and token-based client/server auth flows.", "Application web complète couvrant l'inscription, la connexion sécurisée, la gestion des sessions et des jetons JWT."],

    link_github: ["GitHub →", "GitHub →"],

    skills_title: ["My <em>Skills</em>", "Mes <em>Compétences</em>"],
    skill_front: ["Frontend", "Frontend"],
    skill_front_txt: ["Building clean, interactive user interfaces.", "Création d'interfaces claires et interactives."],
    skill_back: ["Backend", "Backend"],
    skill_back_txt: ["APIs, server logic, and robust backends.", "APIs, logique serveur et backends solides."],
    skill_erp: ["ERP & Database", "ERP & Bases de données"],
    skill_erp_txt: ["Enterprise integration and relational databases.", "Intégration d'entreprise et bases de données relationnelles."],
    tools_label: ["Tools & Environment", "Outils & Environnement"],

    contact_title: ["Get In <em>Touch</em>", "Me <em>Contacter</em>"],
    contact_big: ["Let's build<br>something together.", "Créons<br>quelque chose ensemble."],
    contact_sub: ["Open to internships, projects, and collaboration opportunities. Feel free to reach out.", "Ouverte aux opportunités de stage, projets et collaborations. N'hésitez pas à me contacter."],
    cl_email: ["Email", "Email"],
    cl_loc: ["Location", "Localisation"],
    cl_loc_val: ["Morocco", "Maroc"],
    form_name: ["Your Name", "Votre Nom"],
    form_email: ["Your Email", "Votre Email"],
    form_msg: ["Your Message", "Votre Message"],
    form_send: ["Send Message", "Envoyer le Message"],
    modal_title: ["Message Sent!", "Message Envoyé !"],
    modal_desc: ["Thank you for reaching out. I'll get back to you as soon as possible.", "Merci de votre message. Je vous répondrai dès que possible."],
    modal_close: ["Close", "Fermer"],
    footer_role: ["Software Engineering Student · Morocco", "Étudiante en Ingénierie Logicielle · Maroc"]
  };

  const toggle = document.getElementById('langToggle');
  if (!toggle) return;
  const opts = toggle.querySelectorAll('.lang-opt');

  function setLang(lang) {
    const i = lang === 'fr' ? 1 : 0;
    document.querySelectorAll('[data-key]').forEach(el => {
      const t = translations[el.dataset.key];
      if (t && t[i] !== undefined) el.innerHTML = t[i];
    });
    document.documentElement.lang = lang;
    opts.forEach(o => o.classList.toggle('active', o.dataset.lang === lang));
  }

  opts.forEach(opt => {
    opt.addEventListener('click', () => setLang(opt.dataset.lang));
  });
})();

// ============ HAMBURGER / MOBILE MENU ============
(function () {
  const burger = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!burger || !menu) return;

  function toggle() {
    burger.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.classList.toggle('locked');
  }

  function close() {
    burger.classList.remove('open');
    menu.classList.remove('open');
    document.body.classList.remove('locked');
  }

  burger.addEventListener('click', toggle);
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
})();