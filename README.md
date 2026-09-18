# Salma Ayouch — Portfolio

A single-page developer portfolio built with React + Vite. No deployment is configured — you're in full control of hosting.

## 1. Project structure

```
salma-portfolio/
├── public/
│   └── cv.pdf.README.txt      # replace with your real cv.pdf
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ProjectCard.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   └── Contact.jsx
│   ├── data/
│   │   ├── experience.js
│   │   ├── projects.js
│   │   ├── skills.js
│   │   └── translations.js    # FR / EN text
│   ├── context/
│   │   └── LanguageContext.jsx
│   ├── hooks/
│   │   └── useScrollAnimation.js
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## 2. Install dependencies

```bash
npm install
```

## 3. Run locally

```bash
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

To build for production later (whenever you handle deployment yourself):

```bash
npm run build
```

## 4. Files to edit for your real information

- `src/components/Footer.jsx` — replace `YOUR_GITHUB`, `YOUR_LINKEDIN`, `YOUR_EMAIL`.
- `src/sections/About.jsx` — replace `YOUR_GITHUB`, `YOUR_LINKEDIN`, `YOUR_EMAIL`.
- `src/sections/Contact.jsx` — replace `YOUR_GITHUB`, `YOUR_LINKEDIN`, `YOUR_EMAIL`.
- `src/data/projects.js` — replace `YOUR_GITHUB_PROJECT_URL` for each project, and add `demoUrl` / `detailsUrl` once you have real links.
- `src/data/translations.js` — tweak wording in English (`en`) or French (`fr`) if you want to adjust tone.
- `public/` — add a real `cv.pdf` (the Hero "Download CV" button already points to `/cv.pdf`).

## 5. Files to edit to add project screenshots

- Put your screenshot files under `src/assets/` (e.g. `src/assets/approval-workflow.png`).
- In `src/data/projects.js`, set each project's `image` field to the imported path, e.g.:

```js
image: '/src/assets/approval-workflow.png',
```

Until you add real screenshots, each project card shows a clean numbered placeholder instead.

## Notes

- The contact form is frontend-only for now (no backend). Wire it up to a form service (Formspree, EmailJS) or your own API when ready.
- The language switcher toggles all section text between English and French.
- No hosting/deployment config (GitHub Pages, Vercel, Netlify, etc.) has been added, as requested.
# my-portfolio
