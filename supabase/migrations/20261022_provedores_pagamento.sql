-- Normato — suporte a mais de um provedor de pagamento (Mercado Pago e Pagar.me)
-- Idempotente. Rodar inteira no Supabase: SQL Editor → New query → colar → Run.

-- Compras: qual provedor processou e o identificador da cobrança nele
alter table public.payments add column if not exists provider text not null default 'pagarme';
alter table public.payments add column if not exists external_id text;
create index if not exists payments_external_idx on public.payments (external_id);

-- Assinatura ativa do usuário, independente do provedor
alter table public.profiles add column if not exists subscription_provider text;
alter table public.profiles add column if not exists subscription_id text;
create index if not exists profiles_subscription_idx on public.profiles (subscription_id);

-- Copia vínculos que já existam do Pagar.me
update public.profiles
   set subscription_provider = 'pagarme', subscription_id = pagarme_subscription_id
 where pagarme_subscription_id is not null and subscription_id is null;
