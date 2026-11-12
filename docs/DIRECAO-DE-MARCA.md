# Mania de Plantas — Direção de Marca (v2 · "Botanic")

> Floricultura em Samambaia, DF · Arranjos, plantas e encomendas de flores
> Esta versão segue a referência **"Botanic — Plant Shop Landing Page"**. A v1 (claro, "Estufa Editorial") está arquivada em `docs/arquivo/v1-estufa-editorial.tgz`.

---

## 0. Dados confirmados (e o que não inventamos)

| Informado pelo cliente | Não inventamos |
|---|---|
| Nome, nicho, WhatsApp **(61) 99984-2506** | Endereço completo, horário |
| Localidade: **Samambaia, DF** | Texto de avaliações de clientes |
| **5.0** com **6 avaliações no Google** | Preços, anos de mercado |
| Marquee: Entrega Local · Flores Frescas · Encomendas Rápidas · Atendimento Especializado | Instagram, Google Maps |

Os dados de contato e prova social vivem em `src/content/site.ts`; o texto da página, em `src/app/page.tsx`.

---

## 1. Brand Strategy

- **Ideia central:** "mania" é cuidado repetido com amor — *a mania boa de cuidar do que é vivo*.
- **Posicionamento:** boutique botânica de bairro. Acervo de garden center, alma de ateliê, atendimento que ensina.
- **Arquétipo:** Cuidador (70%) + Artesão (30%). **Pilares:** Curadoria · Acolhimento · Ofício.
- **Prova:** nota 5.0 no Google (6 avaliações) — a única prova social e a mais forte.
- **Tom de voz:** caloroso, preciso, calmo. Frases curtas, verbo no presente. Sem gritaria promocional.
- **Objetivo do site:** apresentar a curadoria, mostrar a prova social e **converter em encomendas pelo WhatsApp**.

## 2. Creative Direction — "Botanic"

Luxo escuro e botânico: um fundo verde-floresta quase preto, onde as flores (fotos reais) acendem como joias, com detalhes em mostarda suave. Editorial, mas acolhedor.

1. **Foto manda.** As fotos reais são o único elemento colorido da página — o resto é verde profundo, off-white e mostarda.
2. **Curvas, não quinas.** Arcos nos cards, raios generosos (2–3rem) nas imagens, pílulas nos botões.
3. **Cards flutuantes** (nota 5.0, "Atendimento Acolhedor") dão profundidade ao hero sem sombras pesadas.
4. **Movimento = respiração:** entra uma vez, devagar; só `transform`/`opacity`.
5. **Conversão constante:** o CTA "Fazer Encomenda" tem sempre o mesmo rótulo, cor e forma.

**Proibido:** gradientes roxo/azul, glassmorphism, sombras difusas grandes, carrossel automático, parallax em mobile.

## 3. Visual DNA

| Elemento | Regra |
|---|---|
| Forma-assinatura | **Arco** (topo semicircular) nos cards Best Seller; cantos `2.75rem` nas fotos grandes; círculo/rounded nas fotos de apoio |
| Linha | Contorno de 1px em `creme` a 10% de opacidade |
| Numeração | `01 / 02 / 03` em badge mostarda |
| Ritmo | Fundo escuro contínuo, **faixa mostarda** como único respiro de cor entre seções |
| Mood | *Noturno · Rico · Acolhedor* |

## 4. Color Palette

| Token | Hex | Papel | Contraste |
|---|---|---|---|
| `fundo` | `#0F1C18` | Fundo da página (verde profundo) | — |
| `superficie` | `#152722` | Cards e caixas | creme 13,6:1 |
| `superficie-alta` | `#1B332C` | Cards flutuantes, placeholders de foto | creme 11,8:1 |
| `mostarda` | `#E5C158` | CTA, badges, destaques em itálico, marquee | **10,1:1** sobre fundo |
| `mostarda-escura` | `#D2AB3A` | Reservado para estados de hover/pressed | — |
| `creme` | `#F4EFE4` | Texto principal | **15,3:1** sobre fundo |
| `neblina` | `#A9B8AE` | Texto secundário | 8,5:1 sobre fundo · 7,6:1 sobre superfície |

Texto sobre mostarda é sempre `fundo` (10,1:1).

## 5. Typography

| Função | Fonte | Uso |
|---|---|---|
| Títulos | **Playfair Display** (peso 500 + itálico) | H1/H2/H3, logo, números. Uma expressão em *itálico mostarda* por título |
| Texto / UI | **Plus Jakarta Sans** | Corpo, navegação, botões, rótulos em caixa-alta |

Escala fluida: Display XL `2.7→5.6rem` · Display L `2.1→4.2rem` · Display M `1.45→2rem` · Lead `1.02→1.2rem`.

## 6. Mapa de imagens (arquivos na raiz de `public/`)

| Arquivo | Conteúdo | Uso |
|---|---|---|
| `33611.png` | Buquê de rosas vermelhas | Hero (principal, `priority`, parallax desktop) |
| `33612.png` | Jibóia com tucanos | Hero (decorativa, flutuante) |
| `33607.png` | Arranjo rosa com lírios | Sobre (imagem grande) |
| `33606.png` | Buquê redondo de rosas | Sobre (círculo sobreposto) |
| `33608.png` | Rosas vermelhas, lírios amarelos, flores azuis | Best Seller 01 |
| `33610.png` | Hortênsia azul em vaso | Best Seller 02 |
| `33609.png` | Rosas em cone de papel pardo | Best Seller 03 |
| `33614.png` | Logo | **Não usado** — logo tipográfico |

> ⚠️ Esses arquivos não estavam em `public/` quando a página foi montada. Eles precisam ser copiados para lá.

## 7. Arquitetura

```
Navbar (sticky, sem blur) ─ logo tipográfico · Sobre · Mais Amados · Serviços · [Fazer Encomenda]
01 HERO ........ título à esquerda | imagens + cards flutuantes (5.0 · 6 avaliações · Atendimento Acolhedor)
02 SOBRE ....... imagem grande à esquerda | "Onde as Plantas Encontram as Suas Pessoas." + CTA
03 BEST SELLERS  "Nossos Arranjos Mais Amados" — 3 cards em arco (cada um abre o WhatsApp com mensagem própria)
04 MARQUEE ..... faixa mostarda
05 SERVIÇOS .... "Serviços que Oferecemos" — 6 caixas + CTA de fechamento
Rodapé mínimo ─ contato + direitos
Flutuante (mobile): pílula "Fazer Encomenda" após o hero
```

Todos os CTAs terminam em `wa.me/5561999842506` com mensagem pré-preenchida. Nenhum dado passa por servidor nosso.

## 8. Engenharia de performance

| Decisão | Por quê |
|---|---|
| Scroll nativo, sem smooth-scroll em JS | Bibliotecas reescrevem o scroll na main thread |
| Nenhum listener de `scroll` nosso (navbar/botão flutuante via `IntersectionObserver`) | Fora do caminho crítico de input |
| Só `transform` e `opacity`, com `transform-gpu` | Compositor/GPU — sem layout nem paint por quadro |
| `LazyMotion` + `domAnimation` + `m.*` | ~15 KB em vez de ~35 KB |
| `whileInView` com `once: true` | Cada elemento anima uma vez e é desligado |
| Marquee e levitação dos cards em CSS keyframes | Rodam no compositor, custo ≈ 0 |
| Parallax: 1 camada, só desktop com mouse | Evita jitter no mobile |
| Sem `backdrop-filter`, `mix-blend-mode` ou camada fixa em tela cheia | Maiores vilões de repaint |
| `next/font`, `next/image` (AVIF/WebP, `priority` só no hero) | Sem layout shift, LCP rápido |
| `MotionConfig reducedMotion="user"` + CSS `prefers-reduced-motion` | Acessibilidade |

**Medido** (build de produção, Chromium headless, scroll contínuo de 8 s):

| Cenário | FPS | p99 | Quadros > 25 ms | Long tasks |
|---|---|---|---|---|
| Desktop 1440 | 60 | 16,8 ms | 0 | 0 |
| Mobile 390 + CPU 4× mais lenta | 60 | 16,8 ms | 0 | 0 |

Verificado: ordem das seções, 8 CTAs com o número oficial, marquee em movimento, navbar que ganha fundo ao rolar, menu mobile (abre, trava scroll, fecha com Esc), pílula flutuante (aparece após o hero, some no CTA final), alvos de toque ≥ 40 px, sem overflow horizontal, sem erros de console, fontes carregadas. Feito com imagens de teste; **falta validar com as fotos reais e em aparelho físico.**

## 9. Pendências

- [ ] Copiar as 7 imagens para `public/` (seção 6)
- [ ] Domínio final em `NEXT_PUBLIC_SITE_URL`
- [ ] Opcional: endereço, horário, Instagram e link do Google Maps (hoje só "Samambaia, DF")
- [ ] Confirmar que "Entrega Local" e "Encomendas Rápidas" (marquee) são promessas que a loja cumpre
