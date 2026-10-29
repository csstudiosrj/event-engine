# Normato — checklist de lançamento

Siga na ordem. Cada passo diz **onde** fazer e **o que** colar.

---

## 1. Banco de dados (Supabase)

1. Abra o projeto no Supabase → menu **SQL Editor** → **New query**.
2. Abra o arquivo `supabase/migrations/20261021_lancamento.sql` deste repositório, copie **tudo** e cole no editor.
3. Clique em **Run**. Deve aparecer `Success. No rows returned`.

Depois, em **Authentication → URL Configuration**:

- **Site URL:** `https://arxum.com.br/normato`
- **Redirect URLs:** adicione `https://arxum.com.br/normato/auth/callback`

## 1b. Banco de dados — provedores de pagamento

Mesmo procedimento do passo 1, com o arquivo `supabase/migrations/20261022_provedores_pagamento.sql`.

## 1c. Super admin

Mesmo procedimento do passo 1, com o arquivo `supabase/migrations/20261029_super_admin.sql`. Ele cria as tabelas de planos e configurações e marca a sua conta como super admin (troque o e-mail no fim do arquivo se a sua conta no Normato usar outro).

Depois, o painel fica em **https://www.arxum.com.br/normato/admin** (ou no menu do seu avatar → **Super admin**).

## 2a. Mercado Pago (provedor ativo enquanto o Pagar.me não libera)

1. Entre em https://www.mercadopago.com.br/developers/panel/app com a conta Mercado Pago que vai **receber** o dinheiro → **Criar aplicação**.
   - Nome: `Normato` · Tipo de solução: **Pagamentos online** · Produto: **Checkout Pro** (marque também **Assinaturas** se aparecer) → **Criar**.
2. Dentro da aplicação, menu **Credenciais de produção** → copie o **Access Token** (começa com `APP_USR-`).
   - Para testar antes, use **Credenciais de teste** (o token de teste também começa com `APP_USR-` ou `TEST-`).
3. Menu **Webhooks** → **Configurar notificações** → aba **Modo produção**:
   - **URL:** `https://www.arxum.com.br/normato/api/webhooks/mercadopago`
   - **Eventos:** marque **Pagamentos** e **Planos e assinaturas**
   - **Salvar** → clique para revelar a **assinatura secreta** e copie.
4. Na Vercel (Settings → Environment Variables), crie:

| Nome | Valor |
|---|---|
| `MP_ACCESS_TOKEN` | o Access Token do passo 2 (marque **Sensitive**) |
| `MP_WEBHOOK_SECRET` | a assinatura secreta do passo 3 (marque **Sensitive**) |

5. Vercel → **Deployments** → último deploy → **⋯** → **Redeploy**.

Sem essas variáveis, a página de preços mostra "Pagamentos em breve" e ninguém vê erro.

## 2b. Pagar.me (quando a conta for liberada)

Para trocar de provedor, crie na Vercel `PAYMENT_PROVIDER=pagarme` além das variáveis abaixo. Assinaturas já feitas no Mercado Pago continuam sendo renovadas por ele.


1. Crie/acesse a conta em pagar.me (exige CNPJ). Em **Configurações → Chaves**, copie a **chave secreta de teste** (`sk_test_...`).
2. No terminal do Firebase Studio, na pasta do projeto, crie os planos Solo e Pro (troque `sk_test_XXX` pela sua chave):

   ```bash
   PAGARME_SECRET_KEY=sk_test_XXX node scripts/pagarme-criar-planos.mjs
   ```

   Ele imprime duas linhas `PAGARME_PLAN_SOLO_ID=plan_...` e `PAGARME_PLAN_PRO_ID=plan_...`. Guarde.
3. Gere uma senha para o webhook:

   ```bash
   node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"
   ```

4. Em **Configurações → Webhooks → Criar webhook**:
   - **URL:** `https://www.arxum.com.br/normato/api/webhooks/pagarme?token=SENHA_DO_PASSO_3`
   - **Eventos:** `order.paid` e `invoice.paid`

## 3. Variáveis de ambiente (Vercel)

Projeto `event-engine` na Vercel → **Settings → Environment Variables**. Crie (ambiente *Production* e *Preview*):

| Nome | Valor |
|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → `service_role` (secreta) |
| `NEXT_PUBLIC_SITE_URL` | `https://arxum.com.br` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | e-mail de atendimento |
| `NEXT_PUBLIC_COMPANY_NAME` | razão social que aparece nos Termos |
| `NEXT_PUBLIC_COMPANY_CNPJ` | CNPJ |
| `PAGARME_SECRET_KEY` | `sk_test_...` (troque pela de produção no passo 6) |
| `PAGARME_PLAN_SOLO_ID` | do passo 2.2 |
| `PAGARME_PLAN_PRO_ID` | do passo 2.2 |
| `PAGARME_WEBHOOK_TOKEN` | do passo 2.3 |

`NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` já existem.

## 4. Publicar

No terminal do Firebase Studio:

```bash
git fetch origin && git checkout main && git pull origin main && git merge origin/lancamento && git push origin main
```

A Vercel faz o deploy sozinha.

## 5. Testar com a chave de teste

- [ ] Criar conta → chega e-mail → link abre `arxum.com.br/normato/painel` com 1 crédito
- [ ] Calcular Sanitários → saldo vai a 0 → segundo cálculo mostra "Créditos insuficientes"
- [ ] Comprar 5 créditos com Pix de teste → volta para Minha conta → créditos somam 5
- [ ] Comprar 5 créditos com cartão de teste
- [ ] Assinar Solo com cartão de teste → plano vira Solo → Equipe médica abre → cálculo não desconta crédito
- [ ] Cancelar assinatura em Minha conta → continua Solo até a data mostrada
- [ ] Esqueci minha senha → e-mail → nova senha funciona
- [ ] Criar evento no painel → abrir calculadora pelo evento → dados vêm preenchidos → aparece "Calculado" no painel

Se um pagamento não liberar créditos/plano: Pagar.me → **Webhooks** → veja o status da entrega; na Vercel → **Logs**, procure `[pagarme]`.

## 6. Virar para produção

1. Rode de novo o passo 2.2 com a chave **de produção** (`sk_...`) — os planos de teste não valem em produção.
2. Na Vercel, troque `PAGARME_SECRET_KEY`, `PAGARME_PLAN_SOLO_ID` e `PAGARME_PLAN_PRO_ID` pelos valores de produção.
3. Crie o webhook (passo 2.4) também na conta de produção.
4. Vercel → **Deployments** → último → **Redeploy**.
5. Faça uma compra real de R$ 4,90 para confirmar.

## 7. Antes de divulgar (não é código)

- [ ] **Revisão jurídica** de `/termos` e `/privacidade`.
- [ ] Preencher `NEXT_PUBLIC_COMPANY_CNPJ` na Vercel (aparece nos Termos e na Política).

As fórmulas e as citações normativas foram pesquisadas nas fontes oficiais. O registro completo, com o que foi conferido no texto oficial, o que veio de fonte secundária e o que é referência de mercado, está em [`FONTES.md`](FONTES.md).
