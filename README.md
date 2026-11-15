# vasconeves.com

Personal portfolio of Vasco Neves, Senior Frontend Engineer. Built with Nuxt and deployed on Vercel.

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

- `data/projects.ts`: project cards and case studies (`/projects/<slug>`)
- `pages/index.vue`: home page (bio, skills)
- `components/general/`: header and footer
- `public/`: favicon, Open Graph image, `robots.txt`, `sitemap.xml`
