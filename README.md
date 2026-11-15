# vasconeves.com

Personal portfolio of Vasco Neves, Senior Frontend Engineer. Built with Nuxt 4 and deployed on Vercel.

## Requirements

- Node.js 24 (pinned in `package.json` `engines`, matching the Vercel runtime)

## Scripts

```bash
npm install       # install dependencies
npm run dev       # dev server on http://localhost:3000
npm run build     # production build
npm run preview   # serve the production build locally
npm run lint      # ESLint (npm run lint:fix to autofix)
npm run typecheck # vue-tsc via nuxt typecheck
npm test          # Vitest unit tests (*.test.ts next to the code)
npm run test:a11y # axe + mobile-menu checks with Playwright against the production build (build first)
```

CI runs lint, typecheck, unit tests, build and the accessibility checks on every pull request and push to `main`. Dependabot opens grouped weekly update PRs.

## Where the content lives

- `shared/site.ts`: name, role, location, languages, email, socials, booking and site URL, bio copy (edit once, used everywhere)
- `shared/projects.ts`: project cards and case studies. Adding a project here also adds its card, case study, sitemap entry, social meta and previous/next links
- `shared/experience.ts`: work history and education, kept in line with the LinkedIn profile (the source of truth for what is public)
- `app/data/skills.ts`: the grouped skills list
- `app/pages/`: `index.vue` (home), `projects/` (list and case study), `experience.vue`
- `app/components/general/`: the header (sticky top bar, menu on mobile) and footer
- `server/routes/`: `sitemap.xml` and `robots.txt`, generated from the site config and projects list
- `public/`: favicon, profile photo, the site-wide Open Graph card and `projects/<slug>/` images

## Project images

Each project has a 16:10 `cover.webp`, optional `gallery-N.webp` images and an `og.jpg` in `public/projects/<slug>/`, referenced from `shared/projects.ts`.

```bash
npm run screenshots -- a-minha-rua cirnota   # public sites and artwork, via Playwright
npm run pushguard:cover                      # generated terminal cover (PushGuard has no UI)
npm run og:projects                          # per-project 1200x630 JPEG for link previews
npm run og:card                              # the site-wide Open Graph card
```

`screenshots` can also capture local apps showing demo data only: set `FILEBRIDGE_APP_URL` (filebridge with `VITE_MOCK=1`) or `CIRNOTA_APP_URL`, `CIRNOTA_DEMO_EMAIL` and `CIRNOTA_DEMO_PASSWORD`. Never capture production accounts. Look at every image before committing it.
