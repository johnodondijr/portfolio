create table public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  client text,
  year int,
  category text,
  summary text,
  description text,
  cover_url text,
  images text[] not null default '{}',
  tags text[] not null default '{}',
  featured boolean not null default false,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create index portfolio_projects_order_idx on public.portfolio_projects (sort_order, created_at desc);

alter table public.portfolio_projects enable row level security;

create policy "Published portfolio projects are public"
  on public.portfolio_projects for select
  to anon, authenticated
  using (published);

insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;
