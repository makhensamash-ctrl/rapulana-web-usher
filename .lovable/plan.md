## Admin Dashboard + Blog System

### Scope

- **Auth** — email/password login for admins (Google not needed for staff-only). New `/login` route. Use existing `user_roles` table + `has_role()` function. Admin role must be granted via DB (I'll provide instructions to set the first admin).
- **Admin dashboard** at `/admin` (protected by `_authenticated` layout + admin role check):
  - `/admin` — overview (counts: upcoming bookings, total blogs)
- `/admin/bookings` — list bookings with status filter, view details, mark paid/cancelled, delete
  - `/admin/blogs` — list blogs, create/edit/delete
- **New `blogs` table** with: title, slug, excerpt, content (markdown/rich text — using textarea for now), cover_image_url, author_name, published (bool), published_at, created_at, updated_at.
  - RLS: anyone can read where `published = true`; admins can do everything.
- **Public `/news` route** ("News & Articles") matching home page look:
  - Hero banner section, grid of blog cards
  - `/news/$slug` detail page with full article
- **Header nav** — add "News" link
- **Storage bucket** `blog-images` (public) for cover images upload from admin.

### Technical notes

- Server functions (`createServerFn`) with `requireSupabaseAuth` for admin mutations
- Public blog reads go through a server fn using `supabaseAdmin` (or just direct browser query since RLS allows public read of published rows)
- Slug auto-generated from title, editable
- Markdown rendering via `react-markdown` for blog content

### Files to create

- `src/routes/login.tsx`
- `src/routes/_authenticated.tsx` (admin gate)
- `src/routes/_authenticated/admin.tsx` (layout w/ sidebar)
- `src/routes/_authenticated/admin/index.tsx`
- `src/routes/_authenticated/admin/bookings.tsx`
- `src/routes/_authenticated/admin/blogs.tsx`
- `src/routes/_authenticated/admin/blogs.$id.tsx` (editor)
- `src/routes/news.tsx`
- `src/routes/news.$slug.tsx`
- `src/lib/blogs.functions.ts`, `src/lib/admin-bookings.functions.ts`
- DB migration for `blogs` table + storage bucket

After approval I'll run the migration first, then build code.