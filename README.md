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
```

## Where the content lives

- `app/data/projects.ts`: project cards and case studies (`/projects/<slug>`)
- `app/pages/index.vue`: home page (bio, skills)
- `app/components/general/`: header and footer
- `public/`: favicon, Open Graph image, `robots.txt`, `sitemap.xml`
