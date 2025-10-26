-- Create messages table
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles(id) on delete cascade,
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  is_read boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.messages enable row level security;

-- RLS Policies
create policy "messages_select_own"
  on public.messages for select
  using (auth.uid() = sender_id or auth.uid() = recipient_id);

create policy "messages_insert_own"
  on public.messages for insert
  with check (auth.uid() = sender_id);

create policy "messages_update_own"
  on public.messages for update
  using (auth.uid() = sender_id or auth.uid() = recipient_id);

-- Create indexes
create index if not exists messages_sender_idx on public.messages(sender_id);
create index if not exists messages_recipient_idx on public.messages(recipient_id);
create index if not exists messages_created_idx on public.messages(created_at desc);
