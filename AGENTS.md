# AGENTS.md: rules for every AI coding tool (Copilot, Claude, Cursor, etc.)

Read `docs/ARCHITECTURE.md` and `docs/CODING_STANDARDS.md` before changing code.

## Project
Personal portfolio for Shahbaz Ali (fresher CS engineer). Next.js 14 (App Router) + TypeScript. No UI library, plain CSS.

## Hard rules
1. All visible text lives in `src/content/data.ts`. Never hardcode copy in components.
2. Components depend on `ContentRepository` (`src/types`), never on `data.ts` directly. Only `app/page.tsx` creates the repository.
3. One component = one responsibility. Reuse `Section`, `CardGrid`, `Reveal` before creating new ones.
4. Colors come only from the CSS variables in `globals.css` (chocolate brown, cream, burnt orange).
5. Server components by default. Add `"use client"` only when browser APIs are needed (e.g. `Reveal`).
6. Keep it simple and editable: no new dependencies without a clear reason; no claims that are not true for a fresher.
7. Make only the change that was requested. Do not refactor unrelated files.
8. After changes run `npm run build`; it must pass.

## Workflow
Ask clarifying questions before large changes. Follow `docs/CONTENT_GUIDE.md` for content edits.
