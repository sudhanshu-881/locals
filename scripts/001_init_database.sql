-- ============================================================================
-- LOCALS APP - DATABASE INITIALIZATION SCRIPT
-- This script creates all tables, enables RLS, and sets up triggers
-- Run this script once to initialize the database
-- ============================================================================

-- ============================================================================
-- 1. CREATE PROFILES TABLE (Base table - no dependencies)
-- ============================================================================
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
  is_admin boolean default false,
  user_type text check (user_type in ('service_seeker', 'service_provider', 'both')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- RLS Policies for profiles
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

-- Create indexes for profiles
create index if not exists profiles_city_idx on public.profiles(city);
create index if not exists profiles_email_idx on public.profiles(email);
create index if not exists profiles_user_type_idx on public.profiles(user_type);

-- ============================================================================
-- 2. CREATE SERVICES TABLE (Depends on profiles)
-- ============================================================================
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

-- Enable RLS on services
alter table public.services enable row level security;

-- RLS Policies for services
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

-- Create indexes for services
create index if not exists services_provider_idx on public.services(provider_id);
create index if not exists services_category_idx on public.services(category);
create index if not exists services_active_idx on public.services(is_active);

-- ============================================================================
-- 3. CREATE MESSAGES TABLE (Depends on profiles)
-- ============================================================================
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles(id) on delete cascade,
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  is_read boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS on messages
alter table public.messages enable row level security;

-- RLS Policies for messages
create policy "messages_select_own"
  on public.messages for select
  using (auth.uid() = sender_id or auth.uid() = recipient_id);

create policy "messages_insert_own"
  on public.messages for insert
  with check (auth.uid() = sender_id);

create policy "messages_update_own"
  on public.messages for update
  using (auth.uid() = sender_id or auth.uid() = recipient_id);

-- Create indexes for messages
create index if not exists messages_sender_idx on public.messages(sender_id);
create index if not exists messages_recipient_idx on public.messages(recipient_id);
create index if not exists messages_created_idx on public.messages(created_at desc);
create index if not exists messages_conversation_idx on public.messages(sender_id, recipient_id);

-- ============================================================================
-- 4. CREATE RATINGS TABLE (Depends on profiles and services)
-- ============================================================================
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

-- Enable RLS on ratings
alter table public.ratings enable row level security;

-- RLS Policies for ratings
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

-- Create indexes for ratings
create index if not exists ratings_ratee_idx on public.ratings(ratee_id);
create index if not exists ratings_rater_idx on public.ratings(rater_id);
create index if not exists ratings_service_idx on public.ratings(service_id);

-- ============================================================================
-- 5. CREATE FAVORITES TABLE (Depends on profiles and services)
-- ============================================================================
create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique(user_id, service_id)
);

-- Enable RLS on favorites
alter table public.favorites enable row level security;

-- RLS Policies for favorites
create policy "favorites_select_own"
  on public.favorites for select
  using (auth.uid() = user_id);

create policy "favorites_insert_own"
  on public.favorites for insert
  with check (auth.uid() = user_id);

create policy "favorites_delete_own"
  on public.favorites for delete
  using (auth.uid() = user_id);

-- Create indexes for favorites
create index if not exists favorites_user_idx on public.favorites(user_id);
create index if not exists favorites_service_idx on public.favorites(service_id);

-- ============================================================================
-- 6. CREATE TRIGGER FUNCTION (Depends on profiles table)
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    email,
    first_name,
    last_name,
    user_type
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', ''),
    coalesce(new.raw_user_meta_data ->> 'user_type', 'service_seeker')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Drop existing trigger if it exists
drop trigger if exists on_auth_user_created on auth.users;

-- Create trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- ============================================================================
-- 7. CREATE FUNCTION TO UPDATE PROFILE RATINGS
-- ============================================================================
create or replace function public.update_profile_rating()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
  set
    rating_avg = (
      select coalesce(round(avg(rating)::numeric, 2), 0)
      from public.ratings
      where ratee_id = new.ratee_id
    ),
    total_ratings = (
      select count(*)
      from public.ratings
      where ratee_id = new.ratee_id
    ),
    updated_at = now()
  where id = new.ratee_id;

  return new;
end;
$$;

-- Drop existing trigger if it exists
drop trigger if exists on_rating_created on public.ratings;

-- Create trigger to update ratings
create trigger on_rating_created
  after insert on public.ratings
  for each row
  execute function public.update_profile_rating();

-- ============================================================================
-- DATABASE INITIALIZATION COMPLETE
-- ============================================================================
