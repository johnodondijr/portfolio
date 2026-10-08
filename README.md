# Portfolio

Personal graphic design portfolio. Built with Next.js 15 + Tailwind CSS; projects load from Supabase and the site deploys on Vercel.

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Editing content

- **Name, bio, contact, socials:** `src/config/site.ts`
- **Projects:** Supabase → Table Editor → `portfolio_projects`. Each row is one project. Set `published = false` to hide one, and use `sort_order` to reorder (lower numbers come first). Changes appear on the live site within about a minute.
- **Images:** Supabase → Storage → `portfolio` bucket. Upload an image, copy its public URL, and paste it into a project's `cover_url`, or add it to the `images` list for the project's detail page.

The database schema is in `supabase/migrations/`.
