# Mania de Plantas

Landing page da **Mania de Plantas** — floricultura em Samambaia, DF.
Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Framer Motion 14 · lucide-react · TypeScript.
Direção visual: referência **"Petal / Post"** (boutique floral clássica — rosa pálido + bordô profundo + serifada de alto contraste).

> Direção de marca: **[docs/DIRECAO-DE-MARCA.md](docs/DIRECAO-DE-MARCA.md)**
> Versões anteriores: v1 "Estufa Editorial" em `docs/arquivo/v1-estufa-editorial.tgz`; v2 "Botanic" (escura) no histórico do Git.

## Rodar

```bash
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # produção (página 100% estática)
npm run typecheck && npm run lint
```

## Mídia (`public/`)

| Arquivo | Uso | Status |
|---|---|---|
| `33611.png` | Hero — foto principal **e fallback do vídeo** | ✅ incluído |
| `33608.png` | Card 1 "O Clássico" (rosas, lírios amarelos, flores azuis) | ✅ incluído |
| `33610.png` | Card 2 "O Ousado" (hortênsia azul) | ✅ incluído |
| `33609.png` | Card 3 "O Especial" (rosas no cone de papel pardo) | ✅ incluído |
| `hero_bg.mp4` | Vídeo do hero (opcional) | ⚠️ **não incluído** — ver abaixo |

### Vídeo do hero (`public/hero_bg.mp4`)
É **opcional**: sem o arquivo, o site mostra a foto `33611.png` (nada quebra). Basta salvar o vídeo em `public/hero_bg.mp4` e publicar de novo.
Recomendado: H.264 (MP4), 720p, 8–12 s em loop, **≤ 3 MB**, sem áudio. O vídeo só é carregado depois da foto, pausa quando sai da tela e **não toca** com "reduzir movimento" ou "economia de dados".

## Onde mexer

| Quero… | Arquivo |
|---|---|
| Textos, nomes dos buquês, passos, imagens | [src/app/page.tsx](src/app/page.tsx) (blocos `IMG` e `COPY` no topo) |
| WhatsApp, localidade, nota/avaliações | [src/content/site.ts](src/content/site.ts) |
| Cores, escala tipográfica | [src/app/globals.css](src/app/globals.css) (`@theme`) |
| Vídeo/foto do hero | [src/components/HeroMedia.tsx](src/components/HeroMedia.tsx) |

## Estrutura da página
1. **Navbar** rosa pálido — `MANIA / DE PLANTAS`, links centralizados, "Encomendar →"
2. **Hero** — "Flores Frescas, Dias Mais Felizes" · botão pill **FAZER ENCOMENDA →** · vídeo/foto à direita
3. **Buquês da Semana** (fundo bordô) — 3 cards: O Clássico · O Ousado · O Especial
4. **Como Funciona** — "Simples. Cuidadoso. Sempre Fresco." · Escolha · Nós Criamos · Entregamos (ícones lucide)
5. **CTA final / rodapé** (fundo bordô) — **FALAR NO WHATSAPP →**

Todo CTA abre `wa.me/5561999842506` com mensagem pré-preenchida. Botão flutuante extra no mobile.

## Performance (60 FPS) — auditoria
- Scroll **nativo**; nenhum listener de `scroll` nosso (navbar e botão flutuante usam `IntersectionObserver`).
- Animações só de `transform`/`opacity`. `transform-gpu will-change-transform` **só enquanto o elemento anima**; ao terminar, `will-change` é removido (evita dezenas de camadas de GPU permanentes no celular).
- `LazyMotion` + `domAnimation` + `m.*` (≈15 KB). Parallax, marquee e brilhos removidos.
- Hero: foto `next/image` com `priority` (LCP) renderizada no servidor; vídeo montado só no cliente, pausa fora da tela.
- Fontes: 2 arquivos variáveis (Playfair normal + Plus Jakarta Sans), sem itálico. Sem `backdrop-filter`, `mix-blend-mode` ou camada fixa em tela cheia.

Medido (build de produção, Chromium headless, scroll contínuo de 8 s):

| | LCP | CLS | JS | FPS | Quadros > 25 ms |
|---|---|---|---|---|---|
| Desktop 1440 | 220 ms | 0 | 180 KB | 60 | 0 |
| Mobile 390, CPU 4× mais lenta | 264 ms | 0 | 180 KB | 60 | 0 |

Com o vídeo de teste rodando no hero, o scroll se manteve em 60 fps. Meça também num aparelho real antes de divulgar.
