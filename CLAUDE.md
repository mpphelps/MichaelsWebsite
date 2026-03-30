# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Use `yarn` (not `npm`) — a `yarn.lock` is present.

```bash
yarn dev        # Start Vite dev server
yarn build      # TypeScript check + Vite production build
yarn preview    # Preview production build locally
yarn lint       # Run ESLint
yarn test       # Run Vitest tests (watch mode)
```

To run a single test file:
```bash
yarn test src/path/to/file.test.tsx
```

## Tech Stack

- **React 18 + TypeScript + Vite** — SPA, no SSR
- **Mantine 8** — primary component library (use Mantine components before writing custom UI)
- **React Router v7** — client-side routing
- **Supabase** — PostgreSQL database, auth, and file storage (bucket: `blog-images`)
- **SWR** — data fetching and caching
- **Shiki** — syntax highlighting in blog posts
- **Vitest + Testing Library** — unit tests
- **Vercel** — deployment target (see `vercel.json` for SPA rewrite rules)

## Architecture

### Global State
`SessionProvider` (`src/context/SessionContext/`) wraps the entire app and is the single source of truth for:
- Current Supabase auth session/user
- User role (fetched via SWR from the `user_role` table)

All components that need auth state consume this context via the `useSession` hook.

### Data Fetching
`src/utilities/fetcher.ts` contains typed Supabase query wrappers used as SWR fetchers:
- `blogPostsFetcher` — fetches blog post list
- `blogPostContentFetcher` — fetches full post content by slug
- `userRoleFetcher` — fetches the authenticated user's role

### Routing
Defined in `src/App.tsx`. The layout route wraps all pages with `HeaderMenu`. Admin-only routes (Create/Edit blog post) check user role from SessionContext before rendering.

### Blog System
- Blog metadata and content are stored in Supabase (`blog_posts` table)
- Images are stored in Supabase Storage under `blog-images/<slug>/`
- Blog content is rendered by `BlogPostContent` component using Shiki for code highlighting
- `CreateBlogPost` and `EditBlogPostPage` include `useBlocker` (React Router) + `beforeunload` event handler to prevent accidental navigation away with unsaved changes

### Styling
- Mantine for component-level styling
- CSS Modules (`.module.css`) for custom component styles
- Theme is fixed to dark mode (set in `main.tsx` MantineProvider)

## Environment Variables

Required in `.env`:
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```
