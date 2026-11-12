# Mania de Plantas

Landing page da **Mania de Plantas** — floricultura em Samambaia, DF.
Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Framer Motion 14 · TypeScript.
Direção visual: referência "Botanic — Plant Shop" (verde profundo, mostarda suave, serifada editorial).

> Documento de direção de marca: **[docs/DIRECAO-DE-MARCA.md](docs/DIRECAO-DE-MARCA.md)**
> A versão anterior (claro, "Estufa Editorial") está arquivada em `docs/arquivo/v1-estufa-editorial.tgz`.

## Rodar

```bash
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # produção (página 100% estática)
npm run typecheck && npm run lint
```

Em produção, defina o domínio final (canonical, sitemap, dados estruturados):
`NEXT_PUBLIC_SITE_URL=https://seudominio.com.br`

## ⚠️ Imagens — copiar para `public/`

O código usa estes caminhos exatos, **na raiz de `public/`**. Eles **não estavam** na pasta quando a página foi montada; sem os arquivos, os cards mostram só o fundo verde.

| Arquivo | Onde aparece |
|---|---|
| `public/33611.png` | Hero — imagem principal (buquê de rosas vermelhas) |
| `public/33612.png` | Hero — imagem decorativa (jibóia com tucanos) |
| `public/33607.png` | Seção "Sobre" — imagem grande |
| `public/33606.png` | Seção "Sobre" — círculo sobreposto (buquê redondo) |
| `public/33608.png` | Best Seller 01 — rosas, lírios amarelos e flores azuis |
| `public/33610.png` | Best Seller 02 — hortênsia azul |
| `public/33609.png` | Best Seller 03 — buquê no cone de papel pardo |

`33614.png` (logo) **não é usado**: a navbar usa o logo tipográfico (texto serifado). Todas as imagens passam por `next/image` (AVIF/WebP, `object-cover`), então qualquer proporção funciona.

## Onde mexer

| Quero… | Arquivo |
|---|---|
| Textos, imagens e serviços da página | [src/app/page.tsx](src/app/page.tsx) (blocos `COPY` e `IMG` no topo) |
| WhatsApp, localidade, nota e nº de avaliações | [src/content/site.ts](src/content/site.ts) |
| Cores, fontes, escala tipográfica, marquee | [src/app/globals.css](src/app/globals.css) |
| Navbar | [src/components/Header.tsx](src/components/Header.tsx) |

## Estrutura da página

1. **Navbar** — logo tipográfico, âncoras, CTA "Fazer Encomenda"
2. **Hero** — título à esquerda; imagens + cards flutuantes (5.0 · 6 avaliações no Google, "Atendimento Acolhedor") à direita
3. **Sobre** — imagem grande à esquerda, texto e CTA à direita
4. **Best Sellers** — 3 cards verticais com topo em arco
5. **Marquee mostarda** — Entrega Local • Flores Frescas • Encomendas Rápidas • Atendimento Especializado
6. **Serviços** — 6 caixas verde sólido com contorno sutil + CTA de fechamento

Extras de conversão/infra (não são seções): botão flutuante no mobile, rodapé mínimo (contato + direitos), SEO/JSON-LD.

## Performance (60 FPS)
- Scroll **nativo**; sem smooth-scroll em JS, sem scroll-jacking.
- Navbar e botão flutuante usam `IntersectionObserver` (nenhum listener de `scroll` nosso).
- Animações só de `transform`/`opacity`, com `transform-gpu`; `LazyMotion` + `domAnimation` + `m.*`.
- Marquee e cards flutuantes em **CSS keyframes** (compositor), desligados com `prefers-reduced-motion`.
- Parallax em **uma** camada (hero), só desktop com mouse.
- Sem `backdrop-filter`, sem `mix-blend-mode`, sem camada fixa em tela cheia.

Medição local (Chromium headless, scroll contínuo de 8 s): **60 fps · p99 16,8 ms · 0 quadros > 25 ms · 0 long tasks** — no desktop e no mobile com CPU 4× mais lenta. Meça também num aparelho real antes de publicar.
