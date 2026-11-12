# Mania de Plantas — Direção de Marca (v3 · "Petal / Post")

> Floricultura em Samambaia, DF · Flores frescas, arranjos artesanais, encomendas pelo WhatsApp
> Segue a referência **"Petal / Post" (boutique floral clássica)**. Versões anteriores: v1 em `docs/arquivo/v1-estufa-editorial.tgz`; v2 "Botanic" (escura) no histórico do Git.

## 0. Dados confirmados (e o que não inventamos)

| Informado pelo cliente | Não inventamos |
|---|---|
| Nome, nicho, WhatsApp **(61) 99984-2506** | Endereço completo, horário |
| Localidade: **Samambaia, DF** | Texto de avaliações de clientes |
| **5.0** com **6 avaliações no Google** (selo do hero) | Preços, anos de mercado |

Contato e prova social: `src/content/site.ts`. Textos da página: `src/app/page.tsx`.

## 1. Brand Strategy
- **Ideia central:** "mania" é cuidado repetido com amor — *a mania boa de cuidar do que é vivo*.
- **Posicionamento:** floricultura-boutique de bairro: arranjos artesanais, atendimento acolhedor, entrega local.
- **Tom:** caloroso, claro, delicado. Frases curtas. Sem gritaria promocional.
- **Objetivo:** mostrar os buquês e **converter em encomendas pelo WhatsApp**.

## 2. Creative Direction — "Petal / Post"
Boutique floral clássica: fundo rosa pálido, tipografia serifada gigante e elegante em bordô, uma única faixa bordô profunda para os produtos, fotos reais como protagonistas. Poucas cores, muito respiro, hairlines finas.

**Proibido:** gradientes, glassmorphism, sombras pesadas, carrossel automático, parallax.

## 3. Color Palette

| Token | Hex | Papel | Contraste |
|---|---|---|---|
| `blush` | `#F7EBE8` | Fundo principal, navbar, "Como Funciona", blocos dos cards | — |
| `blush-profundo` | `#EFD9D3` | Placeholder de foto, hover | — |
| `bordo` | `#4A1525` | Texto principal, botões, bordas | **12,6:1** sobre blush |
| `bordo-profundo` | `#3D101C` | Seção de produtos e rodapé/CTA | blush **14,0:1** |
| `tinta` | `#6E4350` | Texto secundário sobre blush | 7,0:1 |
| `petala` | `#E6CFCB` | Texto secundário sobre bordô-profundo | 11,0:1 |

## 4. Typography

| Função | Fonte | Uso |
|---|---|---|
| Títulos | **Playfair Display** 400 (serifada clássica de alto contraste) | Hero gigante `3.1→6.6rem`, títulos de seção, nomes dos cards, logo em caixa-alta espaçada |
| Texto / UI | **Plus Jakarta Sans** (peso 300–500) | Corpo fino e legível, navegação, rótulos em caixa-alta |

**Botão:** pill `rounded-full`, fundo bordô, texto blush, MAIÚSCULAS com espaçamento `0.18em`, seta `→` (lucide `ArrowRight`). Sobre fundo bordô, o botão inverte (blush com texto bordô).

## 5. Mídia

| Arquivo | Conteúdo | Uso |
|---|---|---|
| `33611.png` | Buquê de rosas vermelhas | Hero (foto principal e **fallback do vídeo**) |
| `33608.png` | Rosas, lírios amarelos e flores azuis | Card 1 — O Clássico |
| `33610.png` | Hortênsia azul | Card 2 — O Ousado |
| `33609.png` | Rosas no cone de papel pardo | Card 3 — O Especial |
| `hero_bg.mp4` | Vídeo do hero: rosas e hortênsias, H.264, 720×1280, 10 s, 5,1 MB | Por cima da foto; sem ele (ou se falhar) a foto assume |

## 6. Arquitetura

```
Navbar (blush)  MANIA / DE PLANTAS · Buquês · Como Funciona · Contato · [Encomendar →]
01 HERO ............ título gigante (4 linhas) + subtítulo + [FAZER ENCOMENDA →] + selo ★★★★★ 5.0 / 6 AVALIAÇÕES NO GOOGLE  |  vídeo/foto sangrando à direita
02 BUQUÊS DA SEMANA  fundo bordô · "Ver todos →" · 3 cards (foto + bloco blush): O Clássico · O Ousado · O Especial
03 COMO FUNCIONA ... "Simples. Cuidadoso. Sempre Fresco." · 1 Escolha · 2 Nós Criamos · 3 Entregamos
04 CTA FINAL ....... fundo bordô · [FALAR NO WHATSAPP →] · rodapé com contato
Flutuante (mobile): pílula "Fazer Encomenda →" após o hero
```

## 7. Auditoria de performance

| Decisão | Por quê |
|---|---|
| Scroll nativo; nenhum listener de `scroll` nosso | Evita trabalho na main thread durante a rolagem |
| Só `transform`/`opacity` | Compositor/GPU — sem layout nem paint por quadro |
| `transform-gpu will-change-transform` **apenas durante a animação**, removido ao terminar | Camadas de GPU permanentes em dezenas de elementos pesam na memória do celular |
| `LazyMotion` + `domAnimation` + `m.*` | ≈15 KB de animação |
| Parallax, marquee, brilhos e levitação removidos | Menos trabalho contínuo |
| Foto do hero com `priority` renderizada no servidor | LCP não espera vídeo nem JS |
| Vídeo montado só no cliente, pausa fora da tela, `preload="metadata"`, ignorado com reduced-motion / Save-Data | Economia de CPU, bateria e dados |
| 2 fontes variáveis, sem itálico | Menos requisições e bytes |
| `lucide-react` com import nomeado | Só os 6 ícones usados entram no bundle |
| `will-change` não é fixo em nada; sem `backdrop-filter` / `mix-blend-mode` | Maiores vilões de repaint |

**Medido** (produção, Chromium headless, scroll de 8 s):

| Cenário | LCP | CLS | JS | FPS | p99 | Quadros > 25 ms |
|---|---|---|---|---|---|---|
| Desktop 1440 | 220 ms | 0 | 180 KB | 60 | 16,8 ms | 0 |
| Mobile 390, CPU 4× mais lenta | 264 ms | 0 | 180 KB | 60 | 16,8 ms | 0 |

Com vídeo de teste no hero: vídeo toca, pausa fora da tela, retoma ao voltar, não é montado com reduced-motion; scroll continua em 60 fps.
Há 2 *long tasks* (~100 ms; 272 ms com CPU 4× mais lenta) só na hidratação inicial; nenhum durante a rolagem.
Verificado com o vídeo real: toca (720×1280, sem erro), pausa fora da tela, retoma; scroll em 60 fps com ele rodando. O hero se adapta a telas baixas (1280×720 e 1366×768): CTA e selo cabem na primeira dobra.
**Pendente:** medir em aparelho físico (decodificação em hardware varia).

## 8. Pendências
- [ ] Opcional: versão do vídeo sem áudio (~2 MB) para economizar dados no celular
- [ ] Domínio próprio → `NEXT_PUBLIC_SITE_URL`
