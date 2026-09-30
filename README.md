# Sublayer — Subscription revenue infrastructure

A premium, production-quality SaaS landing page built with **React + Vite + TypeScript**.

> Sublayer is a fictional product created as a design demonstration. It does not exist and is
> not affiliated with any real company.

## Overview

Sublayer is presented as the subscription revenue platform that owns plan logic, renewal
recovery, tax and ledger for recurring businesses. The site is a single-page narrative:
hero → trust → product value → how it works → features → interactive calculator → outcomes →
comparison → pricing → testimonials → FAQ → final CTA.

All product UI (dashboard consoles, charts, plan builders, dunning flows, ledgers, checkout
surfaces) is built from real React/SVG components — no screenshots — so it stays sharp at any
resolution and reflows properly on small screens.

## Tech stack

| Concern        | Choice                                  |
| -------------- | --------------------------------------- |
| Framework      | React 18                                |
| Build tool     | Vite 5                                  |
| Language       | TypeScript (strict)                     |
| Styling        | Plain CSS with design tokens            |
| Icons          | lucide-react                            |
| Animation      | CSS transitions + IntersectionObserver  |
| Fonts          | Inter + JetBrains Mono (Google Fonts)   |

No UI framework, no CSS-in-JS, no animation library — the visual quality comes from a
hand-authored design system in `src/styles`.

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start dev server → http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
npm run typecheck
```

## Project structure

```
src/
├── components/
│   ├── layout/      # Navbar, Footer
│   ├── sections/    # 12 page sections (Hero, Pricing, Faq, ...)
│   ├── ui/          # Logo, Reveal, NewsletterForm, DemoModal
│   └── visuals/     # Charts + product-UI mockups (Dashboard, FeatureVisuals)
├── data/            # Content as typed data arrays (features, plans, faqs, ...)
├── hooks/           # useReveal, useCountUp, useScrolled, useScrollLock
├── styles/          # tokens.css, base.css
├── App.tsx
└── main.tsx
```

Content lives in `src/data/*` as typed arrays and is rendered with `.map()` — edit those files
to change copy without touching component logic.

## Design system

Defined once in `src/styles/tokens.css` and consumed everywhere:

- Neutral off-white base with near-black typography
- One accent family (indigo → violet → cyan) with soft gradients
- Fluid type scale via `clamp()`
- Layered soft shadows, subtle borders, tiered radii
- Consistent container width and vertical rhythm

## Accessibility

- Semantic landmarks and a single `h1` per page, ordered heading hierarchy
- Skip-to-content link
- Keyboard-accessible accordion, mobile nav and modal (focus trap + Escape)
- Visible focus states, `aria-expanded` / `aria-controls` wiring, live regions
- `prefers-reduced-motion` respected across all animation

## Responsive

Verified down to 375px. Layouts are recomposed (not just shrunk): grids collapse, the comparison
table scrolls horizontally, dashboard mockups drop columns, and mobile navigation becomes a sheet.
