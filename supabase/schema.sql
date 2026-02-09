-- ============================================================
-- Butlerian Labs — Supabase schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. Profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  occupation text,
  company text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 2. Product access / waitlist table
create table if not exists public.product_access (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product text not null,                     -- e.g. 'PHILO-001'
  status text not null default 'pending',    -- pending | approved | rejected
  message text,                              -- optional message from the requester
  requested_at timestamptz not null default now(),
  approved_at timestamptz,

  unique (user_id, product)
);

alter table public.product_access enable row level security;

create policy "Users can read own access rows"
  on public.product_access for select
  using (auth.uid() = user_id);

create policy "Users can request access (insert)"
  on public.product_access for insert
  with check (auth.uid() = user_id);

-- 3. Contact messages (public — no auth required to insert)
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- Allow anyone to insert (public contact form, no auth)
create policy "Anyone can submit a contact message"
  on public.contact_messages for insert
  with check (true);

-- Only service role / dashboard can read (admin only)
-- No select policy = no public reads

-- 4. Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, occupation, company)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.raw_user_meta_data ->> 'occupation',
    new.raw_user_meta_data ->> 'company'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
