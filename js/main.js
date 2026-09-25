// ============ ANIMATED BACKGROUND ============
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, dots = [], orbs = [], symbols = [], orbits = [], t = 0;
let shootingStars = [];

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
    oy: Math.random() * 1000,
    gold: Math.random() > 0.5
  });
}

const glyphs = [
  '<>', '</>', '<div>', '</div>', '<span>', '<h1>', '<p>', '<a>', '/>',
  '{ }', '( )', '[ ]', '=>', '===', '!==', '&&', '||',
  ';', '#', '::', '...', 'const', 'let', 'function', 'return',
  'import', 'export', 'async', 'await', 'null', 'true', 'false',
  '<React/>', 'Odoo', 'Python', '{}', '() =>'
];
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
    a: Math.random() * 0.08 + 0.09,
    gold: Math.random() > 0.4
  });
}

for (let i = 0; i < 3; i++) {
  orbits.push({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    driftX: (Math.random() - 0.5) * 0.1,
    driftY: (Math.random() - 0.5) * 0.1,
    rings: [
      { r: 30 + Math.random() * 15, speed: 0.006 + Math.random() * 0.004, angle: Math.random() * Math.PI * 2, dot: 2 },
      { r: 55 + Math.random() * 20, speed: 0.003 + Math.random() * 0.003, angle: Math.random() * Math.PI * 2, dot: 2.6 }
    ]
  });
}

function newStar() {
  return {
    x: Math.random() * W,
    y: -10,
    vx: (Math.random() - 0.5) * 2 - 1,
    vy: Math.random() * 2 + 2,
    life: 1
  };
}

function draw() {
  t += 0.005;
  ctx.clearRect(0, 0, W, H);

  for (const o of orbs) {
    const x = o.x + Math.sin(t + o.ox) * 40;
    const y = o.y + Math.cos(t * 0.8 + o.oy) * 40;
    const g = ctx.createRadialGradient(x, y, 0, x, y, o.r);
    const col = o.gold ? '242,169,194' : '91,184,240';
    g.addColorStop(0, `rgba(${col},0.05)`);
    g.addColorStop(1, `rgba(${col},0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, o.r, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const os of orbits) {
    os.x += os.driftX; os.y += os.driftY;
    if (os.x < -80) os.x = W + 80; if (os.x > W + 80) os.x = -80;
    if (os.y < -80) os.y = H + 80; if (os.y > H + 80) os.y = -80;

    ctx.beginPath();
    ctx.arc(os.x, os.y, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(246,193,214,0.35)';
    ctx.fill();

    for (const ring of os.rings) {
      ring.angle += ring.speed;
      ctx.beginPath();
      ctx.arc(os.x, os.y, ring.r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(242,169,194,0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();
      const px = os.x + Math.cos(ring.angle) * ring.r;
      const py = os.y + Math.sin(ring.angle) * ring.r;
      ctx.beginPath();
      ctx.arc(px, py, ring.dot, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(242,169,194,0.3)';
      ctx.fill();
    }
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (const s of symbols) {
    s.x += s.vx; s.y += s.vy; s.rot += s.rs;
    if (s.x < -60) s.x = W + 60; if (s.x > W + 60) s.x = -60;
    if (s.y < -60) s.y = H + 60; if (s.y > H + 60) s.y = -60;
    const col = s.gold ? '242,169,194' : '154,154,170';
    ctx.save();
    ctx.translate(s.x, s.y);
    ctx.rotate(s.rot);
    ctx.font = `${s.size}px monospace`;
    ctx.fillStyle = `rgba(${col},${s.a})`;
    ctx.fillText(s.txt, 0, 0);
    ctx.restore();
  }

  for (const p of dots) {
    p.x += p.vx; p.y += p.vy;
    p.tw += p.tws;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    const twinkle = p.a * (0.5 + 0.5 * Math.sin(p.tw));
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(242,169,194,${twinkle})`;
    ctx.fill();
  }

  if (Math.random() < 0.004) shootingStars.push(newStar());
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const s = shootingStars[i];
    s.x += s.vx; s.y += s.vy; s.life -= 0.02;
    ctx.strokeStyle = `rgba(246,193,214,${Math.max(s.life, 0) * 0.7})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.vx * 6, s.y - s.vy * 6);
    ctx.stroke();
    if (s.life <= 0) shootingStars.splice(i, 1);
  }

  requestAnimationFrame(draw);
}
draw();

// ============ INTRO PRELOADER TIMELINE ============
document.body.classList.add('locked');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const gsapReady = typeof gsap !== 'undefined';

function showEverythingInstantly() {
  document.getElementById('intro').style.display = 'none';
  document.querySelectorAll('#navbar, .hero-btns, .hero-visual, .scroll-hint').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
  document.querySelectorAll('.reveal-line > span').forEach(el => el.style.transform = 'none');
  document.body.classList.remove('locked');
}

if (!gsapReady) {
  // GSAP failed to load (e.g. no internet access to the CDN) — skip the
  // animated intro instead of letting a missing library break the whole page.
  showEverythingInstantly();
} else if (reduced) {
  gsap.set('#intro', { display: 'none' });
  gsap.set('#navbar, .hero-btns, .hero-visual, .scroll-hint', { opacity: 1, y: 0, scale: 1 });
  gsap.set('.reveal-line > span', { y: 0 });
  document.body.classList.remove('locked');
} else {
  try {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => document.body.classList.remove('locked')
    });
    tl
      .to('.intro-line', { width: 220, duration: 0.7 })
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
  } catch (err) {
    showEverythingInstantly();
  }
}

// ============ NAVBAR ON SCROLL ============
addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', scrollY > 60);
});

// ============ PHOTO PARALLAX (mouse) ============
const visual = document.getElementById('heroVisual');
const wrap = document.querySelector('.photo-wrap');
if (visual && !reduced) {
  visual.addEventListener('mousemove', e => {
    const r = visual.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    wrap.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  visual.addEventListener('mouseleave', () => wrap.style.transform = '');
}

// ============ SCROLL REVEAL ============
const observer = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ============ CAROUSEL ============
document.querySelectorAll('.proj-frame.carousel').forEach(car => {
  const track = car.querySelector('.car-track');
  const slides = track.querySelectorAll('img');
  const dotsWrap = car.querySelector('.car-dots');
  const delay = parseInt(car.dataset.autoplay) || 4000;
  let index = 0, timer;

  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'car-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => { go(i); reset(); });
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll('.car-dot');

  function go(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, di) => d.classList.toggle('active', di === index));
  }
  function next() { go(index + 1); }
  function prev() { go(index - 1); }
  function reset() { clearInterval(timer); timer = setInterval(next, delay); }

  car.querySelector('.next').addEventListener('click', () => { next(); reset(); });
  car.querySelector('.prev').addEventListener('click', () => { prev(); reset(); });

  car.addEventListener('mouseenter', () => clearInterval(timer));
  car.addEventListener('mouseleave', reset);

  // swipe support
  let touchStart = 0;
  car.addEventListener('touchstart', e => { touchStart = e.changedTouches[0].screenX; clearInterval(timer); }, { passive: true });
  car.addEventListener('touchend', e => {
    const dist = e.changedTouches[0].screenX - touchStart;
    if (Math.abs(dist) > 50) { dist < 0 ? next() : prev(); }
    reset();
  }, { passive: true });

  reset();
});

// ============ LIGHTBOX ============
(function () {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const lbImg = lb.querySelector('.lb-img');
  const counter = lb.querySelector('.lb-counter');
  const btnPrev = lb.querySelector('.lb-nav.prev');
  const btnNext = lb.querySelector('.lb-nav.next');
  const btnClose = lb.querySelector('.lb-close');

  let group = [];
  let pos = 0;

  function open(imgs, index) {
    group = imgs;
    pos = index;
    render();
    lb.classList.add('open');
    document.body.classList.add('locked');
  }
  function render() {
    lbImg.src = group[pos];
    const multi = group.length > 1;
    btnPrev.style.display = multi ? 'block' : 'none';
    btnNext.style.display = multi ? 'block' : 'none';
    counter.style.display = multi ? 'block' : 'none';
    if (multi) counter.textContent = `${pos + 1} / ${group.length}`;
  }
  function close() {
    lb.classList.remove('open');
    document.body.classList.remove('locked');
  }
  function next() { pos = (pos + 1) % group.length; render(); }
  function prev() { pos = (pos - 1 + group.length) % group.length; render(); }

  document.querySelectorAll('.proj-frame:not(.carousel) > img').forEach(img => {
    img.addEventListener('click', () => open([img.src], 0));
  });

  document.querySelectorAll('.proj-frame.carousel').forEach(car => {
    const imgs = [...car.querySelectorAll('.car-track img')];
    const srcs = imgs.map(i => i.src);
    imgs.forEach((img, i) => img.addEventListener('click', () => open(srcs, i)));
  });

  btnNext.addEventListener('click', next);
  btnPrev.addEventListener('click', prev);
  btnClose.addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
})();

// ============ CONTACT FORM (Formspree) ============
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const note = document.getElementById('formNote');
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending…';
    note.textContent = '';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        note.style.color = 'var(--gold)';
        note.textContent = "Message sent! I'll get back to you soon.";
        contactForm.reset();
      } else {
        note.style.color = '#e57373';
        note.textContent = 'Something went wrong. Please try again.';
      }
    } catch (err) {
      note.style.color = '#e57373';
      note.textContent = 'Network error. Please try again.';
    } finally {
      btn.textContent = original;
    }
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

  document.querySelectorAll('a, button, .icon-tile, .car-dot, .proj-frame img, .car-track img').forEach(el => {
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
    hero_desc: ["I build modern, business-oriented web applications and ERP integrations with React, Odoo, Python and PostgreSQL. Based in Morocco.", "Je conçois des applications web modernes et orientées métier ainsi que des intégrations ERP avec React, Odoo, Python et PostgreSQL. Basée au Maroc."],
    hero_btn1: ["View my work", "Voir mes projets"],
    hero_btn2: ["Contact me", "Me contacter"],
    hero_cv: ["Download CV", "Télécharger CV"],

    about_title: ["About <em>Me</em>", "À <em>propos</em>"],
    about_intro: ["3rd-year Software Engineering student at EMSI, passionate about building reliable, business-oriented web applications.", "Étudiante en 3ème année d'Ingénierie Logicielle à l'EMSI, passionnée par la création d'applications web fiables et orientées métier."],
    about_body: ["I enjoy working across the stack — from crafting clean interfaces to designing solid backend logic and ERP integrations with Odoo, Python and modern web frameworks.", "J'aime travailler sur l'ensemble de la pile technique — de la conception d'interfaces claires à la logique backend et aux intégrations ERP avec Odoo, Python et des frameworks web modernes."],
    about_city: ["Location", "Localisation"],
    about_email: ["Email", "Email"],
    about_school: ["Education", "Formation"],
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

    p2_cat: ["Full-Stack Web App · Odoo 17", "Application Web Full-Stack · Odoo 17"],
    p2_sub: ["Quotation Generator & Odoo Sales Integration", "Générateur de Devis & Intégration Odoo Sales"],
    p2_desc: ["A business-oriented quotation configurator with dedicated fields and calculation rules that generates quotations directly in Odoo Sales through the Odoo API.", "Un configurateur de devis orienté métier avec des champs dédiés et des règles de calcul qui génère des devis directement dans Odoo Sales via l'API Odoo."],

    p3_cat: ["Sales Management · Odoo Integration", "Gestion Commerciale · Intégration Odoo"],
    p3_sub: ["Commercial Order Management", "Gestion des Commandes Commerciales"],
    p3_desc: ["A sales application for commercial representatives to access their customers, use customer-specific price lists, build product orders, and connect the workflow with Odoo.", "Une application de vente pour les représentants commerciaux permettant d'accéder à leurs clients, d'utiliser des listes de prix spécifiques, de construire des commandes de produits et de connecter le tout à Odoo."],

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
    footer_role: ["Software Engineering Student · Morocco", "Étudiante en Ingénierie Logicielle · Maroc"]
  };

  const toggle = document.getElementById('langToggle');
  if (!toggle) return;
  const opts = toggle.querySelectorAll('.lang-opt');

  function setLang(lang) {
    const i = lang === 'fr' ? 1 : 0;
    document.querySelectorAll('[data-key]').forEach(el => {
      const tr = translations[el.dataset.key];
      if (tr && tr[i] !== undefined) el.innerHTML = tr[i];
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
