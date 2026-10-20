# Architecture

## Layers (dependencies point downward only)
```
app/page.tsx          Composition root: builds repository, assembles sections
   |
components/*          Presentation: receive data via props, no data fetching
   |
types/index.ts        Contracts: interfaces for data + ContentRepository
   ^
services/StaticContentRepository.ts   Implements ContentRepository
   |
content/data.ts       Plain data: the only file you edit for text
```

## Folder map
| Path | Responsibility |
|---|---|
| `src/content/data.ts` | All portfolio text and links |
| `src/types/index.ts` | Interfaces (`Profile`, `Project`, `ContentRepository`, ...) |
| `src/services/` | Classes that supply content (swap for a CMS/API later) |
| `src/components/` | One file per section plus shared `Section`, `CardGrid`, `Reveal` |
| `src/app/` | `layout.tsx`, `page.tsx`, `globals.css` |
| `public/` | `resume.pdf`, `photo.jpg` |

## Scroll behaviour
Every section is wrapped by `Reveal` (IntersectionObserver). It adds the `in` class once visible; CSS handles the animation and respects `prefers-reduced-motion`.

## Adding a section
1. Add an interface to `types/index.ts` and a getter to `ContentRepository`.
2. Add data to `content/data.ts` and the getter to `StaticContentRepository`.
3. Create `components/NewSection.tsx` using `Section`.
4. Add it to `app/page.tsx` and the `NAV` list.
