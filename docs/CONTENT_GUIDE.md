# Content Guide (how to edit without touching components)

- Change name, links, about, email: `profile` in `src/content/data.ts`.
- Add a project: append an object to `projects` (`title`, `description`, `stack`, optional `link`).
- Add experience/education/skills: append to the matching array.
- Photo: put `photo.jpg` in `public/` and set `photoUrl: "/photo.jpg"`.
- Resume: put `resume.pdf` in `public/`.
- Colors: change the 3 variables at the top of `src/app/globals.css`.

Rules: stay truthful (fresher profile); no invented stats, clients or testimonials.
