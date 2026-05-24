# Michael's Website

My personal website — portfolio, blog, and a place to experiment.

**Live:** https://michaels-website-xi.vercel.app/home

## Tech Stack

- **React 18 + TypeScript + Vite** — SPA, no SSR
- **Mantine 8** — component library
- **React Router v7** — client-side routing
- **Supabase** — Postgres, auth, and storage (blog posts and images)
- **SWR** — data fetching and caching
- **Shiki** — syntax highlighting in blog posts
- **Vitest + Testing Library** — unit tests
- **Vercel** — deployment

## Features

- Project showcase in the header menu
- Blog with admin-only create/edit (role-gated via Supabase)
- Resume page
- A few interactive demos (Matrix rain, etc.)

## Getting Started

```bash
yarn install
yarn dev
```

Create a `.env` file in the project root with your Supabase credentials:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Scripts

| Command | Description |
| --- | --- |
| `yarn dev` | Start the Vite dev server |
| `yarn build` | Type-check and build for production |
| `yarn preview` | Preview the production build locally |
| `yarn lint` | Run ESLint |
| `yarn test` | Run Vitest |

## Deployment

Auto-deployed to Vercel on push to `main`. SPA rewrite rules live in `vercel.json`.
