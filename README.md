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
| `hero_inicio.jpg` | Hero — **primeiro quadro do vídeo**: imagem inicial (LCP), sem "pisca" quando o vídeo entra | ✅ incluído (gerado do vídeo) |
| `33611.png` | Hero — foto de **fallback** (só baixada se o vídeo falhar ou o usuário pedir menos movimento) | ✅ incluído |
| `33608.png` | Card 1 "O Clássico" (rosas, lírios amarelos, flores azuis) | ✅ incluído |
| `33610.png` | Card 2 "O Ousado" (hortênsia azul) | ✅ incluído |
| `33609.png` | Card 3 "O Especial" (rosas no cone de papel pardo) | ✅ incluído |
| `hero_bg.mp4` | Vídeo do hero (rosas e hortênsias, 720×1280, 10 s, 5,1 MB) | ✅ incluído |

### Vídeo do hero (`public/hero_bg.mp4`)
O hero abre com `hero_inicio.jpg` (o **primeiro quadro do vídeo**, renderizado no servidor) e o vídeo "acorda" exatamente nesse quadro, então não há troca visível de imagem (diferença medida: 1,4%, contra 31,7% quando a base era outra foto). Se o vídeo faltar/falhar, ou o usuário pedir "reduzir movimento"/"economia de dados", a foto `33611.png` entra como fallback com um fade curto; só nesses casos ela é baixada. O vídeo pausa quando sai da tela.

**Se trocar o `hero_bg.mp4`, gere o primeiro quadro de novo** (a conversão usa a matriz de cor BT.601 do vídeo, a mesma que o navegador usa):
```bash
ffmpeg -y -i public/hero_bg.mp4 -frames:v 1 -vf "scale=in_color_matrix=bt601:in_range=limited:out_range=full,format=rgb24" /tmp/f0.png
magick /tmp/f0.png -strip -interlace Plane -quality 88 public/hero_inicio.jpg
```
Confira a matriz com `ffprobe -show_entries stream=color_space public/hero_bg.mp4`: se não for `smpte170m`, ajuste `in_color_matrix`.
Peso atual: 5,1 MB (inclui uma trilha de áudio que não é usada, pois o vídeo toca sempre sem som). Dá para reduzir para ~2 MB sem áudio se quiser economizar dados no celular.

## Onde mexer

| Quero… | Arquivo |
|---|---|
| Textos, nomes dos buquês, passos, imagens | [src/app/page.tsx](src/app/page.tsx) (blocos `IMG` e `COPY` no topo) |
| WhatsApp, localidade, nota/avaliações | [src/content/site.ts](src/content/site.ts) |
| Cores, escala tipográfica | [src/app/globals.css](src/app/globals.css) (`@theme`) |
| Vídeo/foto do hero | [src/components/HeroMedia.tsx](src/components/HeroMedia.tsx) |

## Estrutura da página
1. **Navbar** rosa pálido — `MANIA / DE PLANTAS`, links centralizados, "Encomendar →"
2. **Hero** — "Flores Frescas, Dias Mais Felizes" · botão pill **FAZER ENCOMENDA →** · selo "★★★★★ 5.0 · 6 Avaliações no Google" · vídeo/foto à direita
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
