-- Create favorites table
create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique(user_id, service_id)
);

-- Enable RLS
alter table public.favorites enable row level security;

-- RLS Policies
create policy "favorites_select_own"
  on public.favorites for select
  using (auth.uid() = user_id);

create policy "favorites_insert_own"
  on public.favorites for insert
  with check (auth.uid() = user_id);

create policy "favorites_delete_own"
  on public.favorites for delete
  using (auth.uid() = user_id);

-- Create indexes
create index if not exists favorites_user_idx on public.favorites(user_id);
create index if not exists favorites_service_idx on public.favorites(service_id);
