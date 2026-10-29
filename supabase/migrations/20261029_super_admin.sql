-- Normato — super admin, planos e preços editáveis
-- Idempotente. Rodar inteira no Supabase: SQL Editor → New query → colar → Run.

-- ─────────────────────────────────────────────────────────────
-- 1. Super admin
-- ─────────────────────────────────────────────────────────────
-- A coluna não pode ser alterada pelo usuário (o UPDATE em profiles só vale para
-- `name`, ver 20261021_lancamento.sql). Só o banco e o servidor mudam esse valor.
alter table public.profiles add column if not exists is_admin boolean not null default false;

-- ─────────────────────────────────────────────────────────────
-- 2. Planos e preços
-- ─────────────────────────────────────────────────────────────
-- kind = 'credits': pacote de créditos avulso (pode haver vários).
-- kind = 'subscription': só 'solo' e 'pro', porque o acesso de cada um está no código.
create table if not exists public.plans (
  id text primary key,
  kind text not null check (kind in ('credits', 'subscription')),
  name text not null,
  description text not null default '',
  amount_cents int not null check (amount_cents > 0),
  credits int check (credits is null or credits > 0),
  features text[] not null default '{}',
  highlight boolean not null default false,
  active boolean not null default true,
  sort int not null default 0,
  updated_at timestamptz not null default now(),
  constraint plans_credits_kind check ((kind = 'credits') = (credits is not null)),
  constraint plans_subscription_ids check (kind = 'credits' or id in ('solo', 'pro'))
);

insert into public.plans (id, kind, name, description, amount_cents, credits, features, highlight, sort) values
  ('creditos_5', 'credits', 'Créditos', 'Pague só quando usar as calculadoras Essenciais.', 490, 5,
    array['1 crédito por cálculo Essencial', 'Pix ou cartão', 'Créditos não expiram', 'Sem assinatura'], false, 10),
  ('solo', 'subscription', 'Solo', 'Para organizar um evento com confiança.', 2990, null,
    array['Cálculos ilimitados', 'Calculadoras Essenciais e Estratégicas', '1 evento ativo no painel', 'Histórico de cálculos', 'Cancele quando quiser'], true, 20),
  ('pro', 'subscription', 'Pro', 'Para quem gerencia vários eventos.', 4990, null,
    array['Tudo do plano Solo', 'Eventos ativos ilimitados', 'Histórico completo por evento', 'Cancele quando quiser'], false, 30)
on conflict (id) do nothing;

alter table public.plans enable row level security;
drop policy if exists "plans_public_read" on public.plans;
create policy "plans_public_read" on public.plans for select using (true);

-- ─────────────────────────────────────────────────────────────
-- 3. Configurações gerais
-- ─────────────────────────────────────────────────────────────
create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
insert into public.app_settings (key, value) values ('signup_credits', '1') on conflict (key) do nothing;

alter table public.app_settings enable row level security;
drop policy if exists "app_settings_public_read" on public.app_settings;
create policy "app_settings_public_read" on public.app_settings for select using (true);

-- Créditos de boas-vindas passam a vir da configuração
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_credits int;
begin
  select coalesce((value #>> '{}')::int, 1) into v_credits from public.app_settings where key = 'signup_credits';
  insert into public.profiles (id, email, name, accepted_terms_at, credits)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', ''),
    nullif(new.raw_user_meta_data->>'accepted_terms_at', '')::timestamptz,
    coalesce(v_credits, 1)
  )
  on conflict (id) do update
    set accepted_terms_at = coalesce(public.profiles.accepted_terms_at, excluded.accepted_terms_at);
  return new;
end;
$$;

-- ─────────────────────────────────────────────────────────────
-- 4. Compras: guardam o que foi vendido no momento da compra
-- ─────────────────────────────────────────────────────────────
-- Assim uma mudança de preço ou de pacote não altera compras já feitas.
alter table public.payments add column if not exists kind text;         -- 'credits' | 'subscription' | 'test'
alter table public.payments add column if not exists credits int;
alter table public.payments add column if not exists description text;
alter table public.payments add column if not exists pix_qr_code text;  -- copia e cola gerado pelo admin
alter table public.payments add column if not exists refunded_at timestamptz;

update public.payments set kind = case when product in ('solo', 'pro') then 'subscription' else 'credits' end where kind is null;
update public.payments set credits = 5 where product = 'creditos_5' and credits is null;

-- ─────────────────────────────────────────────────────────────
-- 5. Seu usuário como super admin
-- ─────────────────────────────────────────────────────────────
-- Troque o e-mail se a sua conta no Normato usar outro.
update public.profiles set is_admin = true where lower(email) = lower('metodoneuro@gmail.com');

select email, is_admin from public.profiles where is_admin;
