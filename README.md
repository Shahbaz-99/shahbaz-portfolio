# Shahbaz Ali – Personal Portfolio & Case Studies

Minimalist, high-performance personal portfolio and engineering case studies for **Shahbaz Ali**, Backend Developer Intern at **Ethical Intelligence**.

Built with **Astro**, **TypeScript**, and accessible design tokens, optimized for static delivery and WCAG AA compliance.

---

## 🚀 Tech Stack & Architecture

- **Framework:** [Astro](https://astro.build/) (Static Site Generation / Zero-JS by default)
- **Language:** TypeScript
- **Package Manager:** pnpm
- **Styling:** CSS variables & design tokens (warm paper aesthetic, dark/light theme with zero-FOUC persistence)
- **Testing & Quality:**
  - [Playwright](https://playwright.dev/) for cross-viewport and interaction testing
  - [Axe-core](https://github.com/dequelabs/axe-core) for automated accessibility audits (light & dark modes)
  - [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) for performance, SEO, and best practices
- **Hosting / Deployment:** Cloudflare Pages (global CDN, preview deployments)

---

## 📂 Project Structure

```text
├── public/                 # Static assets (favicons, profile photo, robots.txt, _headers)
├── src/
│   ├── components/         # Astro UI components (ProjectCard, ResearchCard, GitHubActivity, etc.)
│   ├── data/
│   │   └── site.ts         # Single source of truth (profile, projects, experience, research, skills)
│   ├── layouts/
│   │   └── Base.astro      # Master layout with dock, meta tags, and theme scripts
│   ├── pages/
│   │   ├── index.astro     # Landing page (hero, projects, experience, research, skills)
│   │   ├── 404.astro       # Accessible custom 404 page
│   │   ├── architecture.astro  # Meta-page documenting site architecture
│   │   ├── experience/     # Detail pages for each role
│   │   ├── projects/       # Deep-dive case studies
│   │   └── research/       # Interactive AI model drift & SupCon research breakdown
│   ├── scripts/            # Client scripts (theme switch, live IST clock, GitHub repo feed)
│   └── styles/             # Global design tokens and typography
├── tests/                  # Playwright E2E and accessibility test suite
└── docs/adr/               # Architecture Decision Records (ADRs)
```

---

## 🧞 Local Development

All commands are executed from the project root:

```bash
# Install dependencies
pnpm install

# Start local dev server (default: http://localhost:4321)
pnpm dev

# Type check Astro and TypeScript files
pnpm check

# Build production static bundle to ./dist/
pnpm build

# Preview production build locally
pnpm preview

# Run full end-to-end and accessibility test suite
pnpm e2e
```

---

## 🧪 Testing & CI

Continuous Integration is configured via GitHub Actions (`.github/workflows/ci.yml`), verifying:
1. `pnpm check`: Type check and template diagnostic verification
2. `pnpm build`: Static bundle generation
3. Lighthouse CI audits
4. Playwright E2E & Axe accessibility test suite across light and dark modes and 5 screen breakpoints (320px–1920px)
