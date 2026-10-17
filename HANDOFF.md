# HANDOFF

Newest entry on top.

## Phase 6c – Beige theme, link style, content match
**Done:** light theme is now warm beige; underlines replaced by a highlighter sweep on hover/focus (external links get a moving arrow); all descriptive copy (hero, experience, education, projects, skills, headline) now uses the wording from the resume and LinkedIn profile. The AI-research line is kept because it was requested.
**Open:** LinkedIn URL, resume PDF, repo/demo links per project; permission check for the research page; deployment (Cloudflare Pages) is next.

## Phase 6b – Experience, Education, Research
**Done:** Experience split into Experience (2 clickable roles, detail pages, company link https://www.ethicalint.com/) and Education; new Research section with a detail page (drift / SupCon comparison, from the shared demo screenshots) and the "I enjoy AI-related research" line; dock now Home, Projects, Experience, Research; tests extended.
**Open:** confirm permission to publish the internal demo details; add own-role line to the research page; LinkedIn URL; resume PDF; repo/demo links per project; Cloudflare Pages connection.

## Phase 6a – Case studies, content, motion
**Done:** clickable case-study pages for all 3 projects (content from LinkedIn/resume, nothing invented), cover-to-hero view transition, scroll reveal, hover effects on cards/dock/chips/timeline/lists, dock tooltips, reading-progress bar, Trainee role and skills added, tests extended to project pages.
**Open:** LinkedIn URL, resume PDF, repo/demo links and year per project, Cloudflare Pages connection, first AI project.

## Phase 5b – Tests
**Done:** Playwright + axe suite (a11y in light/dark, theme persistence, page smoke, no horizontal overflow at 320-1920px). Raised light-theme muted text contrast to meet WCAG AA.
**Workflow:** single long-lived `dev` branch; PR into `main` when ready; Cloudflare gives `dev` a preview URL.
**Open:** Cloudflare Pages connection and CI green (Phase 2 exit), `photo` in `public/`, LinkedIn, resume, project links.
**Next:** Phase 6 launch (analytics, Lighthouse scores on Architecture page, custom domain optional).

## Phase 5 – Visual direction v2 (paper, dock, handwritten greeting)
**Done:** redesigned to a paper-texture look: handwritten greeting, tilted photo frame, live IST clock with seconds, icon chips, 2-up project cards with tinted covers, dashed-line experience timeline, wavy-divider lists, floating bottom dock (home, projects, about, AI, theme toggle) with active red dot. Light and dark themes kept; layout is a single 46rem column, 1-col on phones. Removed the API-response hero and JetBrains Mono. ADR 0006.
**Open:** add `photo` (e.g. /me.jpg), `year` per project, LinkedIn URL, resume PDF, real project links; first AI project.

## Phase 4 – Dynamic features and theming
**Done:** light/dark toggle (system default, remembered, no flash), scroll-spy nav, live Bhopal time, live "Latest on GitHub" section, responsive header and ultra-wide/tiny-screen tweaks, ADR 0005.
**Decisions:** display name is "Shahbaz Ali".
**Open:** LinkedIn, resume PDF, project links and case studies, first AI project.

## Phase 1+3 – Design and content skeleton
**Done:** positioning (backend + AI), design system, home page (API-response hero, projects, experience, skills, AI, education, contact), /architecture page, case-study route, cache headers, ADR 0003–0004. All copy comes from the resume; content lives in `src/data/site.ts`.
**Decisions:** no 3D in v1 (ADR 0003); demo APIs hosted separately (ADR 0004); self-hosted fonts; zero client JS on home.
**Open:** display name ("Shahbaz Ali"); LinkedIn URL; resume PDF in `/public`; repo/demo links and case-study text per project; first AI project.
**Next:** Phase 2 finish (Cloudflare Pages connected, CI green), then Phase 5 (Playwright + axe tests), Phase 6 (launch, publish Lighthouse scores).

## Phase 0/2 – Kickoff (repo scaffold)
**Done:** requirements draft, ADR 0001–0002, CI workflow, Lighthouse config, Astro scaffold.
**Decisions:** Cloudflare Pages, Astro + TS, pnpm, Node 22, trunk-based Git + PR previews.
