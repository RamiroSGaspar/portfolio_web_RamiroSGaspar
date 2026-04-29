# Ramiro Sebastian Gaspar — Portfolio

Personal portfolio site built with Next.js (App Router), TypeScript and Tailwind CSS v4.

Live: <https://ramirosgaspar.vercel.app>

## Stack

- **Next.js 16** (App Router, Server Components)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** + shadcn/ui primitives
- **Lucide** icons
- Deployed on **Vercel**

## Features

- Bilingual UI (ES / EN) with persistent preference
- Profile card with availability badge and CV download
- Tabbed sections: About, Skills, Experience, Education, Contact
- Blog feed with filterable Projects / Events / Experiences and detail modals
- Animated neural-network canvas background that respects `prefers-reduced-motion`
- Fully responsive, dark-mode first design

## Project structure

```
app/
  page.tsx              # Server component entry
  layout.tsx            # Metadata, viewport, fonts
  globals.css           # Tailwind v4 + design tokens
  api/download-cv/      # Route handler that serves the PDF CV

components/
  portfolio/            # All portfolio UI, split by responsibility
    portfolio.tsx       # Main client wrapper
    profile-card.tsx
    info-tabs.tsx
    blog-section.tsx
    sections/           # About / Skills / Experience / Education / Contact
    modals/             # Project / Event / Experience / Image lightbox
  ui/                   # shadcn/ui primitives

lib/
  i18n.tsx              # Language provider + dictionaries
  portfolio-data.ts     # Typed wrapper around data/portfolio.json

data/
  portfolio.json        # Source of truth for posts, projects, events, experiences

public/                 # Images, logos, CV
```

## Editing content

All content lives in [`data/portfolio.json`](data/portfolio.json). It contains
inline examples (`_*_ejemplos`) that show the expected shape of each entry.

To add a project, event or experience:

1. Add the entry to its corresponding array (`projects`, `events`, `experiences`).
2. Add a matching item in `blogPosts` using the **same `id`** so the card opens
   the right detail modal.

Strings shown in the UI (titles, tabs, About copy) live in `lib/i18n.tsx` under
the `es` and `en` dictionaries.

## Local development

```bash
pnpm install
pnpm dev
```

The dev server runs at <http://localhost:3000>.

## Deployment

The site is deployed on Vercel from the `main` branch.

---

Originally scaffolded with [v0.app](https://v0.app).
