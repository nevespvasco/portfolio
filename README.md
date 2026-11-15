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
npm run test:a11y # axe checks with Playwright against the production build (build first)
```

CI runs lint, typecheck, unit tests, build and the accessibility checks on every pull request and push to `main`. Dependabot opens grouped weekly update PRs.

## Where the content lives

- `shared/projects.ts`: project cards and case studies (`/projects/<slug>`). Adding a project here also adds its sitemap entry, social meta and previous/next links
- `app/data/skills.ts`: the grouped skills list
- `app/pages/index.vue`: home page layout (the bio and "How I build" copy live in `shared/site.ts`)
- `shared/site.ts`: name, role, location, languages, email, socials, booking and site URL (edit once, used everywhere)
- `app/components/general/`: header and footer
- `public/`: favicon, profile photo, Open Graph card (`npm run og:card` regenerates it from the photo and site config)
- `server/routes/`: `sitemap.xml` and `robots.txt`, generated from the site config and projects list
