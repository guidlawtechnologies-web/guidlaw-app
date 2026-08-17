-- ============================================================
--  leads — public intake submissions from the website
-- ============================================================
--  Run once in Supabase: SQL Editor → New query → paste → Run.
--
--  Until this exists, /api/intake still works: every lead is emailed
--  to info@guidlaw.ca and the database write is skipped silently so a
--  missing table can never lose an enquiry. Creating this table turns
--  persistence on with no code change.
--
--  Deliberately separate from `tickets`: that table hangs off
--  driver_id and assumes a signed-up user. A lead is someone who
--  hasn't signed up and may never — forcing them into `tickets` would
--  mean creating throwaway auth users for people just asking a question.
-- ============================================================

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  -- Contact
  first_name    text not null,
  last_name     text,
  phone         text not null,
  email         text,

  -- The charge
  offence_type  text not null,
  court_date    date,
  notes         text,
  photo_url     text,

  -- CASL: express consent must be provable, so store the value and
  -- the moment it was given, not just a boolean.
  consent_given boolean not null default false,
  consent_at    timestamptz,

  -- Pipeline
  source        text not null default 'website',
  status        text not null default 'new'
                check (status in ('new','contacted','quoted','retained','declined','lost')),
  assigned_to   uuid,
  internal_note text
);

-- Newest first is how you'll actually read this table.
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx     on public.leads (status);
create index if not exists leads_phone_idx      on public.leads (phone);

-- ── Row Level Security ──────────────────────────────────────
-- No client-side policy is granted. The intake route writes with the
-- service key, which bypasses RLS. Enabling RLS with zero policies
-- means an anon or logged-in browser session cannot read anyone's
-- leads — which matters, because this table holds names, phone
-- numbers and photos of people's tickets.
alter table public.leads enable row level security;

comment on table public.leads is
  'Public website intake. Written by /api/intake using the service key. No client-facing RLS policy by design.';
