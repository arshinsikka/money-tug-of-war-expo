-- Tables for Money Tug-of-War (2-friend pairing, tasks, completions, penalty events)

create table if not exists pairs (
  id uuid primary key default gen_random_uuid(),
  invite_code text unique not null,
  created_at timestamp with time zone default now()
);

create table if not exists pair_members (
  pair_id uuid references pairs(id) on delete cascade,
  user_id uuid not null,
  display_name text not null,
  primary key (pair_id, user_id)
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  pair_id uuid references pairs(id) on delete cascade,
  title text not null,
  category text check (category in ('Work','Study','Fitness','Habit')) default 'Habit',
  deadline_hour int default 23, -- 0-23
  penalty_cents int default 100,
  created_by uuid,
  created_at timestamp with time zone default now()
);

create table if not exists completions (
  id uuid primary key default gen_random_uuid(),
  task_id uuid references tasks(id) on delete cascade,
  user_id uuid not null,
  date text not null, -- YYYY-MM-DD in UTC
  proof_url text,
  pomodoro_minutes int default 0,
  completed_at timestamp with time zone default now(),
  unique (task_id, user_id, date)
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  pair_id uuid references pairs(id) on delete cascade,
  task_id uuid references tasks(id) on delete set null,
  date text not null, -- YYYY-MM-DD
  from_user uuid,
  to_user uuid,
  amount_cents int not null,
  reason text check (reason in ('missed','manual_settle')) default 'missed',
  created_at timestamp with time zone default now(),
  unique (task_id, date, from_user, reason)
);
