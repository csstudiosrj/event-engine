# ee-patch-04 — Normato Home + Rebranding

Arquivos incluídos:
- `app/page.tsx` — nova home Normato
- `app/layout.tsx` — SEO metadata atualizado
- `app/auth/login/page.tsx` — fix Suspense boundary (resolve build error Vercel)
- `components/header.tsx` — header com símbolo Normato
- `components/footer.tsx` — footer Normato + ARXUM group
- `public/favicon.svg` — favicon SVG Normato

## Instalação (IDX / Codespaces / terminal)

```bash
# 1. Navegue até a raiz do projeto (onde está o package.json)
cd ~/arxum-calculadoras   # ajuste o caminho se necessário

# 2. Descompacte o patch (assumindo que o zip está no mesmo diretório)
unzip -o ee-patch-04.zip -d .

# 3. Verifique o build
npm run build
```

Se o build passar sem erros, faça o commit e push:

```bash
git add -A
git commit -m "feat: Normato rebranding — home, header, footer, favicon, login fix"
git push
```

A Vercel detecta o push e faz o deploy automaticamente.
