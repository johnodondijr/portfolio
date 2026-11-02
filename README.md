# Johnfred — Graphic Designer Portfolio

Next.js site deployed on Vercel. Projects and testimonials load from the Supabase project **Portfolio**.

## Editing content

- **Projects (Selected Work):** Supabase → Table Editor → `projects`. One row per project.
  - `category` must be `social`, `ui` or `branding` (drives the filter buttons).
  - `subtitle` is the small grey line under the title.
  - `image_url`: upload an image to Storage → `portfolio` bucket, copy its public URL and paste it here. With no image, the coloured placeholder (`placeholder_color` + `placeholder_label`) is shown.
  - `sort_order` sets the order (lowest first); `published = false` hides a project.
- **Testimonials:** Supabase → Table Editor → `testimonials` (same `sort_order` / `published` rules).
- **Photos:** add `portrait.webp` (cut-out for the hero) and `about.webp` to `public/images/`.
- **Everything else** (services, tools, process, FAQ, stats, contact details): `src/content.ts`.

Changes in Supabase appear on the live site within about a minute.

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

The database schema is in `supabase/migrations/`.
