-- Platform 9 schema: posts, claims, per-claim message threads, and
-- self-issued browser identities ("profiles"). No real auth yet — see
-- README for the plan to move to Supabase Auth and lock this down with
-- per-user RLS instead of the open policies below.

create table if not exists profiles (
  uid text primary key,
  name text not null default 'anon',
  avatar text not null default '🙂',
  photo text not null default '',
  bio text not null default '',
  location text not null default '',
  interests text[] not null default '{}',
  updated_at timestamptz not null default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  author_id text not null,
  author_name text not null default 'anon',
  location text not null default '',
  when_text text not null default '',
  description text not null,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);
create index if not exists posts_created_at_idx on posts (created_at desc);

create table if not exists claims (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references posts (id) on delete cascade,
  claimant_id text not null,
  claimant_name text not null default 'anon',
  note text not null,
  created_at timestamptz not null default now()
);
create index if not exists claims_post_id_idx on claims (post_id);

create table if not exists threads (
  claim_id uuid primary key references claims (id) on delete cascade,
  post_id uuid not null references posts (id) on delete cascade,
  participants text[] not null default '{}',
  messages jsonb not null default '[]'::jsonb
);

-- Realtime: broadcast row changes so every open tab stays live.
alter publication supabase_realtime add table profiles, posts, claims, threads;

-- RLS: enabled on every table, but currently open to any anon caller —
-- there's no real user identity to check yet (see useIdentity's
-- localStorage-based uid). Tighten these to `auth.uid() = uid` /
-- `auth.uid() = author_id` once Supabase Auth is wired in.
alter table profiles enable row level security;
alter table posts enable row level security;
alter table claims enable row level security;
alter table threads enable row level security;

create policy "profiles are publicly readable" on profiles for select using (true);
create policy "anyone can upsert a profile" on profiles for insert with check (true);
create policy "anyone can update a profile" on profiles for update using (true);

create policy "posts are publicly readable" on posts for select using (true);
create policy "anyone can create a post" on posts for insert with check (true);

create policy "claims are publicly readable" on claims for select using (true);
create policy "anyone can create a claim" on claims for insert with check (true);

create policy "threads are publicly readable" on threads for select using (true);
create policy "anyone can create a thread" on threads for insert with check (true);
create policy "anyone can update a thread" on threads for update using (true);
