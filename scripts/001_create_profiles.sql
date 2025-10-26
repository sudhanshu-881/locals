-- Create profiles table with user metadata
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  first_name text,
  last_name text,
  avatar_url text,
  bio text,
  phone text,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  address text,
  city text,
  state text,
  zip_code text,
  skills text[] default array[]::text[],
  hourly_rate integer,
  rating_avg decimal(3, 2) default 0,
  total_ratings integer default 0,
  is_verified boolean default false,
  user_type text check (user_type in ('service_seeker', 'service_provider', 'both')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- RLS Policies
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_select_public"
  on public.profiles for select
  using (true);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "profiles_delete_own"
  on public.profiles for delete
  using (auth.uid() = id);

-- Create index for geospatial queries
create index if not exists profiles_location_idx on public.profiles using gist (
  ll_to_earth(latitude, longitude)
);

-- Create index for city searches
create index if not exists profiles_city_idx on public.profiles(city);
