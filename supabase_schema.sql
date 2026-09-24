create table public.civic_issues (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('Water', 'Sanitation/Waste', 'Healthcare', 'Air Quality', 'Traffic')),
  title text not null,
  description text not null,
  location text not null,
  severity text not null default 'Medium' check (severity in ('Low', 'Medium', 'High', 'Critical')),
  status text not null default 'Reported' check (status in ('Reported', 'Acknowledged', 'In Progress', 'Resolved')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  latitude double precision,
  longitude double precision,
  image_url text
);

alter table public.civic_issues enable row level security;
create policy "Anyone can read civic issues" on public.civic_issues for select using (true);
create policy "Anyone can submit civic issues" on public.civic_issues for insert with check (true);

alter publication supabase_realtime add table public.civic_issues;
