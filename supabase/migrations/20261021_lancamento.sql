-- Normato — migração de lançamento
-- Pode ser executada mais de uma vez sem efeito colateral (idempotente).
-- Rodar inteira no Supabase: SQL Editor → New query → colar → Run.

-- ─────────────────────────────────────────────────────────────
-- 1. Perfis: plano com validade + vínculos com o Pagar.me
-- ─────────────────────────────────────────────────────────────
alter table public.profiles add column if not exists plan_expires_at timestamptz;
alter table public.profiles add column if not exists pagarme_customer_id text;
alter table public.profiles add column if not exists pagarme_subscription_id text;
alter table public.profiles add column if not exists accepted_terms_at timestamptz;

-- Usuário comum só pode alterar o próprio nome. Créditos e plano só mudam
-- pelas funções abaixo ou pelo servidor (service role).
revoke update on public.profiles from anon, authenticated;
grant update (name, updated_at) on public.profiles to authenticated;

-- Novo usuário ganha 1 crédito grátis.
alter table public.profiles alter column credits set default 1;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, accepted_terms_at)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', ''),
    nullif(new.raw_user_meta_data->>'accepted_terms_at', '')::timestamptz
  )
  on conflict (id) do update
    set accepted_terms_at = coalesce(public.profiles.accepted_terms_at, excluded.accepted_terms_at);
  return new;
end;
$$;

drop trigger if exists normato_on_auth_user_created on auth.users;
create trigger normato_on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─────────────────────────────────────────────────────────────
-- 2. Créditos: débito (pelo próprio usuário) e crédito (só servidor)
-- ─────────────────────────────────────────────────────────────
drop function if exists public.spend_credit(uuid, int);

create function public.spend_credit(p_user_id uuid, p_amount int)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  v_balance int;
begin
  if auth.uid() is null or auth.uid() <> p_user_id then
    raise exception 'forbidden';
  end if;
  if p_amount is null or p_amount <= 0 then
    raise exception 'invalid_amount';
  end if;

  update public.profiles
     set credits = credits - p_amount, updated_at = now()
   where id = p_user_id and credits >= p_amount
  returning credits into v_balance;

  if v_balance is null then
    raise exception 'credits_insuficientes';
  end if;

  begin
    insert into public.credit_transactions (user_id, amount, type, description)
    values (p_user_id, p_amount, 'spend', 'Cálculo');
  exception when others then null; -- histórico não pode travar o débito
  end;

  return v_balance;
end;
$$;

revoke all on function public.spend_credit(uuid, int) from public, anon;
grant execute on function public.spend_credit(uuid, int) to authenticated;

-- Devolve crédito quando o cálculo falha depois do débito (chamado pelo servidor).
create or replace function public.grant_credits(p_user_id uuid, p_amount int, p_type text, p_description text)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  v_balance int;
begin
  update public.profiles
     set credits = credits + p_amount, updated_at = now()
   where id = p_user_id
  returning credits into v_balance;

  begin
    insert into public.credit_transactions (user_id, amount, type, description)
    values (p_user_id, p_amount, p_type, p_description);
  exception when others then null;
  end;

  return v_balance;
end;
$$;

revoke all on function public.grant_credits(uuid, int, text, text) from public, anon, authenticated;
grant execute on function public.grant_credits(uuid, int, text, text) to service_role;

-- ─────────────────────────────────────────────────────────────
-- 3. Resultados de cálculo: evento opcional + entradas salvas
-- ─────────────────────────────────────────────────────────────
alter table public.calc_results alter column event_id drop not null;
alter table public.calc_results add column if not exists inputs jsonb;

alter table public.calc_results enable row level security;
drop policy if exists "calc_results_select_own" on public.calc_results;
create policy "calc_results_select_own" on public.calc_results
  for select using (auth.uid() = user_id);
drop policy if exists "calc_results_insert_own" on public.calc_results;
create policy "calc_results_insert_own" on public.calc_results
  for insert with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────
-- 4. Pagamentos (Pagar.me)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  product text not null,                 -- 'creditos_5' | 'solo' | 'pro'
  amount_cents int not null,
  status text not null default 'pending', -- 'pending' | 'paid' | 'canceled'
  pagarme_link_id text,
  pagarme_order_id text,
  pagarme_subscription_id text,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create index if not exists payments_user_idx on public.payments (user_id);
create index if not exists payments_link_idx on public.payments (pagarme_link_id);

alter table public.payments enable row level security;
drop policy if exists "payments_select_own" on public.payments;
create policy "payments_select_own" on public.payments
  for select using (auth.uid() = user_id);

-- Cada evento de webhook é processado uma única vez.
create table if not exists public.webhook_events (
  id text primary key,
  type text not null,
  received_at timestamptz not null default now()
);
alter table public.webhook_events enable row level security;

-- ─────────────────────────────────────────────────────────────
-- 5. Eventos: usuário só vê e altera os próprios
-- ─────────────────────────────────────────────────────────────
alter table public.events enable row level security;
drop policy if exists "events_own" on public.events;
create policy "events_own" on public.events
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
