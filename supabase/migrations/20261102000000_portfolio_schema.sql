create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  category text not null check (category in ('social', 'ui', 'branding')),
  image_url text,
  placeholder_label text,
  placeholder_color text not null default '#fdc121',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  brand text not null,
  quote text not null,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;
alter table public.testimonials enable row level security;

create policy "Published projects are public"
  on public.projects for select to anon, authenticated using (published);

create policy "Published testimonials are public"
  on public.testimonials for select to anon, authenticated using (published);

insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;
