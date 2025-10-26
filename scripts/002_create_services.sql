-- Create services table
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  category text not null,
  subcategory text,
  hourly_rate integer,
  fixed_price integer,
  availability text[] default array[]::text[],
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.services enable row level security;

-- RLS Policies
create policy "services_select_all"
  on public.services for select
  using (is_active = true or auth.uid() = provider_id);

create policy "services_insert_own"
  on public.services for insert
  with check (auth.uid() = provider_id);

create policy "services_update_own"
  on public.services for update
  using (auth.uid() = provider_id);

create policy "services_delete_own"
  on public.services for delete
  using (auth.uid() = provider_id);

-- Create indexes
create index if not exists services_provider_idx on public.services(provider_id);
create index if not exists services_category_idx on public.services(category);
create index if not exists services_active_idx on public.services(is_active);
