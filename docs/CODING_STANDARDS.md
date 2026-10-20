# Coding Standards (OOP + SOLID)

| Principle | How it is applied here |
|---|---|
| Single Responsibility | Each component renders one section; `Reveal` only animates; the repository only supplies data |
| Open/Closed | New sections or cards are added by new files/data, not by editing existing components |
| Liskov Substitution | Any class implementing `ContentRepository` can replace `StaticContentRepository` |
| Interface Segregation | Small prop interfaces: each component receives only the data it renders |
| Dependency Inversion | `page.tsx` and components rely on `ContentRepository`/types, not on `data.ts` |

OOP: data is modelled with interfaces; data access is encapsulated in a class (`StaticContentRepository`) behind an interface (abstraction, polymorphism).

## Style
- TypeScript `strict`; no `any`.
- Name components in PascalCase, one per file, default export.
- Props typed with interfaces from `src/types` where shared.
- Keep functions short; comment only the "why".
- No inline colors; use CSS variables.
