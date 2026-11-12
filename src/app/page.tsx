import { ArrowRight, Flower2, House, MapPin, Scissors, Star } from "lucide-react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { HeroMedia } from "@/components/HeroMedia";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { ImageReveal, Rule } from "@/components/motion/Draw";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { RevealLines } from "@/components/motion/RevealLines";
import { PillLink } from "@/components/ui/PillLink";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

/* ═══════════════════════════════════════════════════════════════════════════
   IMAGENS — arquivos na raiz de /public
   O vídeo do hero (/hero_bg.mp4) é OPCIONAL: se faltar ou falhar, a foto de fallback assume sozinha.
   Se trocar o vídeo, gere de novo o primeiro quadro (veja o README).
   ═══════════════════════════════════════════════════════════════════════════ */
const IMG = {
  heroStill: "/hero_inicio.jpg", // PRIMEIRO QUADRO de hero_bg.mp4 — imagem inicial do hero (sem "pisca" ao entrar o vídeo)
  heroFallback: "/33611.png", // buquê de rosas vermelhas — só entra se o vídeo falhar ou o usuário pedir menos movimento
  classico: "/33608.png", // rosas, lírios amarelos e flores azuis
  ousado: "/33610.png", // hortênsia azul
  especial: "/33609.png", // rosas no cone de papel pardo
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   COPY
   ═══════════════════════════════════════════════════════════════════════════ */
const HERO = {
  // uma linha por item (máscara de entrada); 4 linhas como na referência
  titleLines: [[{ t: "Flores" }], [{ t: "Frescas," }], [{ t: "Dias Mais" }], [{ t: "Felizes" }]],
  lead: "Arranjos artesanais entregues com carinho em Samambaia. Um pouco mais de beleza para a sua semana.",
  ratingLabel: "Avaliações no Google",
  caption: "Fig. 01 — Rosas e hortênsias",
} as const;

const BOUQUETS = {
  eyebrow: "Nossa seleção",
  title: "Buquês da Semana",
  all: {
    label: "Ver todos",
    message: "Olá, Mania de Plantas! Gostaria de ver mais opções de buquês e arranjos.",
  },
  items: [
    {
      n: "Nº 01",
      src: IMG.classico,
      alt: "Buquê de rosas vermelhas, lírios amarelos e flores azuis embrulhado em papel branco",
      title: "O Clássico",
      body: "Rosas vermelhas, lírios amarelos e flores azuis em uma composição cheia de vida.",
      position: "object-[50%_45%]",
      message: "Olá, Mania de Plantas! Quero encomendar o buquê O Clássico (rosas, lírios amarelos e flores azuis).",
    },
    {
      n: "Nº 02",
      src: IMG.ousado,
      alt: "Hortênsia azul em vaso",
      title: "O Ousado",
      body: "Hortênsia azul em vaso: cor intensa para transformar qualquer cantinho.",
      position: "object-[50%_40%]",
      message: "Olá, Mania de Plantas! Quero encomendar a hortênsia azul em vaso (O Ousado).",
    },
    {
      n: "Nº 03",
      src: IMG.especial,
      alt: "Buquê de rosas vermelhas e folhagens no cone de papel pardo",
      title: "O Especial",
      body: "Rosas vermelhas e folhagens frescas no clássico cone de papel pardo.",
      position: "object-[50%_55%]",
      message: "Olá, Mania de Plantas! Quero encomendar o buquê O Especial (rosas no cone de papel pardo).",
    },
  ],
} as const;

const HOW = {
  eyebrow: "Como Funciona",
  title: "Simples. Cuidadoso. Sempre Fresco.",
  steps: [
    {
      Icon: Flower2,
      title: "1. Escolha",
      body: "Conte a ocasião e escolha o buquê ou o arranjo que mais combina com o momento.",
    },
    {
      Icon: Scissors,
      title: "2. Nós Criamos",
      body: "Montamos cada arranjo à mão, com flores frescas e folhagens selecionadas.",
    },
    {
      Icon: House,
      title: "3. Entregamos",
      body: "Combinamos a entrega local ou a retirada, para tudo chegar fresquinho.",
    },
  ],
} as const;

const CLOSING = {
  title: "Mais flores para dias mais felizes",
  location: {
    eyebrow: "Onde estamos",
    button: "Abrir no Google Maps",
  },
  contact: {
    eyebrow: "Contato",
    note: "Encomendas e entregas locais em Samambaia.",
  },
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   SELO DE AVALIAÇÕES — prova social discreta: 5 estrelas + "5.0 · 6 Avaliações no Google"
   ═══════════════════════════════════════════════════════════════════════════ */
function RatingSeal() {
  return (
    <div
      role="img"
      aria-label={`Nota ${site.rating.score} de 5, com ${site.rating.count} avaliações no Google`}
      className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4"
    >
      <span aria-hidden="true" className="flex gap-1 text-bordo">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} fill="currentColor" strokeWidth={0} className="h-[13px] w-[13px]" />
        ))}
      </span>
      <span aria-hidden="true" className="hidden h-5 w-px bg-bordo/25 min-[375px]:block" />
      <p aria-hidden="true" className="flex items-baseline gap-2 sm:gap-2.5">
        <span className="t-display text-[1.3rem] leading-none text-bordo sm:text-[1.4rem]">{site.rating.score}</span>
        <span className="text-[0.64rem] font-medium tracking-[0.14em] whitespace-nowrap text-tinta uppercase sm:text-[0.72rem] sm:tracking-[0.2em]">
          · {site.rating.count} {HERO.ratingLabel}
        </span>
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   2 · HERO — composição assimétrica: texto à esquerda; vídeo em recorte de ARCO à direita
   ═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="inicio" className="bg-blush">
      <div className="grid lg:grid-cols-2 lg:items-center">
        {/* Esquerda */}
        <div className="flex flex-col justify-center px-5 pt-8 pb-12 sm:px-8 lg:py-12 lg:[@media(max-height:820px)]:py-7 lg:pr-10 lg:pl-[clamp(2.5rem,5vw,5.5rem)]">
          <RevealLines lines={HERO.titleLines} onMount className="t-display text-display-xl text-bordo" />

          <Reveal onMount delay={0.5} className="mt-8 max-w-[27rem] lg:[@media(max-height:820px)]:mt-5">
            <p className="text-lead text-tinta">{HERO.lead}</p>
          </Reveal>

          <Reveal onMount delay={0.65} className="mt-10 lg:[@media(max-height:820px)]:mt-7">
            <WhatsAppButton variant="primary" size="lg" />
          </Reveal>

          <Reveal onMount delay={0.8} className="mt-8 lg:[@media(max-height:820px)]:mt-6">
            <RatingSeal />
          </Reveal>
        </div>

        {/* Direita: vídeo em arco, com contorno deslocado (profundidade editorial) */}
        <div className="flex justify-center px-5 pb-16 sm:px-8 lg:justify-end lg:py-10 lg:pr-[clamp(2rem,6vw,6rem)] lg:pl-0">
          <figure className="relative aspect-[4/5] w-full max-w-[26rem] lg:h-[min(41rem,calc(100svh-9.5rem))] lg:w-auto lg:max-w-none">
            <div aria-hidden="true" className="pointer-events-none absolute top-3.5 -right-3.5 -bottom-3.5 left-3.5">
              <Reveal onMount delay={0.45} className="h-full w-full rounded-t-full border border-bordo/30">
                {null}
              </Reveal>
            </div>

            <div className="relative isolate h-full w-full overflow-hidden rounded-t-full rounded-b-[3px] bg-blush-profundo">
              <HeroMedia
                stillSrc={IMG.heroStill}
                stillAlt="Arranjo de rosas vermelhas e hortênsias azuis sob a luz dourada da tarde"
                fallbackSrc={IMG.heroFallback}
                fallbackAlt="Buquê de rosas vermelhas com flores do campo, embrulhado em papel vermelho"
                sizes="(min-width: 1024px) 40vw, 92vw"
              />
            </div>

            <figcaption className="eyebrow absolute right-0 -bottom-10 text-tinta lg:-bottom-9">{HERO.caption}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   3 · BUQUÊS DA SEMANA — fundo bordô, 3 cards com a foto no topo e bloco blush embaixo
   ═══════════════════════════════════════════════════════════════════════════ */
function Bouquets() {
  return (
    <section id="buques" aria-labelledby="buques-titulo" className="on-dark bg-bordo py-20 text-blush lg:py-28">
      <div className="wrap">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow text-petala">{BOUQUETS.eyebrow}</p>
            </Reveal>
            <Reveal as="h2" delay={0.08} className="t-display text-display-l mt-5">
              <span id="buques-titulo">{BOUQUETS.title}</span>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <a
              href={waLink(BOUQUETS.all.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw text-[0.92rem] font-normal text-petala hover:text-blush"
            >
              {BOUQUETS.all.label}
              <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
              <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
            </a>
          </Reveal>
        </div>

        <Rule className="mt-10 bg-blush/20 lg:mt-12" />

        <Stagger as="ul" className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-14 lg:gap-8">
          {BOUQUETS.items.map((item) => (
            <StaggerItem as="li" key={item.title} className="list-none">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-md bg-blush text-bordo">
                <div className="foto-zoom relative isolate aspect-[4/5] w-full overflow-hidden bg-blush-profundo">
                  <ImageReveal>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 768px) 30vw, 92vw"
                      className={`object-cover ${item.position}`}
                    />
                  </ImageReveal>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6 lg:p-7">
                  <div>
                    <p className="eyebrow text-tinta">{item.n}</p>
                    <h3 className="t-display text-display-m mt-3">{item.title}</h3>
                    <p className="mt-2.5 max-w-[22rem] text-[0.92rem] leading-relaxed text-tinta">{item.body}</p>
                  </div>
                  <div className="mt-7 flex items-center justify-between border-t border-bordo/15 pt-5">
                    <span className="eyebrow">Encomendar</span>
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-bordo/30 transition-colors duration-500 group-hover:bg-bordo group-hover:text-blush"
                    >
                      <ArrowRight strokeWidth={1.5} className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                {/* link esticado sobre o card inteiro */}
                <a
                  href={waLink(item.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                  aria-label={`Encomendar ${item.title} pelo WhatsApp (abre em nova aba)`}
                />
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   4 · COMO FUNCIONA — título serifado centralizado + 3 colunas com ícones vazados
   ═══════════════════════════════════════════════════════════════════════════ */
function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="como-titulo" className="bg-blush py-20 lg:py-32">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow text-tinta">{HOW.eyebrow}</p>
        </Reveal>

        <Reveal as="h2" delay={0.08} className="t-display text-display-l mx-auto mt-8 max-w-4xl text-center text-bordo">
          <span id="como-titulo">{HOW.title}</span>
        </Reveal>

        <Rule className="mt-14 bg-bordo/20 lg:mt-20" />

        <Stagger as="ul" className="grid md:grid-cols-3 md:divide-x md:divide-bordo/15">
          {HOW.steps.map(({ Icon, title, body }) => (
            <StaggerItem
              as="li"
              key={title}
              className="flex list-none gap-5 border-b border-bordo/15 py-9 md:border-b-0 md:px-8 md:py-12 md:first:pl-0 md:last:pr-0"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-bordo/35">
                <Icon aria-hidden="true" strokeWidth={1.25} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="t-display text-display-m">{title}</h3>
                <p className="mt-2 max-w-[19rem] text-[0.93rem] leading-relaxed text-tinta">{body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   5 · CTA FINAL + LOCALIZAÇÃO + RODAPÉ — fundo bordô
   ═══════════════════════════════════════════════════════════════════════════ */
function Closing() {
  return (
    <footer id="contato" className="on-dark bg-bordo text-blush">
      {/* CTA */}
      <div className="wrap flex flex-col items-center py-24 text-center lg:py-32">
        <Reveal as="h2" className="t-display text-display-l max-w-3xl">
          {CLOSING.title}
        </Reveal>
        <Reveal delay={0.15} className="mt-10">
          <div id="encomendar">
            <WhatsAppButton variant="light" size="lg" label={site.whatsapp.ctaFinal} />
          </div>
        </Reveal>
      </div>

      <div className="wrap">
        <Rule className="bg-blush/20" />
      </div>

      {/* Localização: endereço + link direto para o Google Maps */}
      <div id="localizacao" className="wrap grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow text-petala">{CLOSING.location.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <address className="t-display text-display-m mt-6 text-[clamp(1.6rem,1.2rem+1.6vw,2.5rem)] leading-[1.12] not-italic">
              <span className="block">{site.address.line1}</span>
              <span className="block text-petala">{site.address.line2}</span>
            </address>
          </Reveal>
          <Reveal delay={0.16} className="mt-9">
            <PillLink
              href={site.address.mapsUrl}
              label={CLOSING.location.button}
              hint="abre o Google Maps em nova aba"
              variant="outlineLight"
              size="lg"
              icon={MapPin}
            />
          </Reveal>
        </div>

        <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-9">
          <p className="eyebrow text-petala">{CLOSING.contact.eyebrow}</p>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="link-draw t-display mt-6 text-[1.6rem] text-blush"
          >
            {site.whatsapp.display}
            <span className="sr-only"> no WhatsApp (abre em nova aba)</span>
          </a>
          <p className="mt-4 max-w-[17rem] text-[0.92rem] leading-relaxed text-petala">{CLOSING.contact.note}</p>
        </Reveal>
      </div>

      <div className="wrap">
        <div className="flex flex-col gap-3 border-t border-blush/15 py-8 pb-28 text-[0.82rem] font-normal text-petala sm:flex-row sm:items-center sm:justify-between md:pb-8">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.locality}
          </p>
          <p>{site.descriptor}</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PÁGINA
   ═══════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Bouquets />
        <HowItWorks />
      </main>
      <Closing />
      <WhatsAppFloat />
    </>
  );
}
