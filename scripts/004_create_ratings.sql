-- Create ratings table
create table if not exists public.ratings (
  id uuid primary key default gen_random_uuid(),
  rater_id uuid not null references public.profiles(id) on delete cascade,
  ratee_id uuid not null references public.profiles(id) on delete cascade,
  service_id uuid references public.services(id) on delete set null,
  rating integer not null check (rating >= 1 and rating <= 5),
  review text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.ratings enable row level security;

-- RLS Policies
create policy "ratings_select_all"
  on public.ratings for select
  using (true);

create policy "ratings_insert_own"
  on public.ratings for insert
  with check (auth.uid() = rater_id);

create policy "ratings_update_own"
  on public.ratings for update
  using (auth.uid() = rater_id);

create policy "ratings_delete_own"
  on public.ratings for delete
  using (auth.uid() = rater_id);

-- Create indexes
create index if not exists ratings_ratee_idx on public.ratings(ratee_id);
create index if not exists ratings_rater_idx on public.ratings(rater_id);
create index if not exists ratings_service_idx on public.ratings(service_id);
