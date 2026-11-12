import { ArrowRight, Flower2, House, Scissors } from "lucide-react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { HeroMedia } from "@/components/HeroMedia";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { RevealLines } from "@/components/motion/RevealLines";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

/* ═══════════════════════════════════════════════════════════════════════════
   IMAGENS — arquivos na raiz de /public
   O vídeo do hero (/hero_bg.mp4) é OPCIONAL: se não existir, a foto do hero assume sozinha.
   ═══════════════════════════════════════════════════════════════════════════ */
const IMG = {
  hero: "/33611.png", // buquê de rosas vermelhas (fallback do vídeo)
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
} as const;

const BOUQUETS = {
  eyebrow: "Buquês da Semana",
  all: {
    label: "Ver todos",
    message: "Olá, Mania de Plantas! Gostaria de ver mais opções de buquês e arranjos.",
  },
  items: [
    {
      src: IMG.classico,
      alt: "Buquê de rosas vermelhas, lírios amarelos e flores azuis embrulhado em papel branco",
      title: "O Clássico",
      body: "Rosas vermelhas, lírios amarelos e flores azuis em uma composição cheia de vida.",
      position: "object-[50%_45%]",
      message: "Olá, Mania de Plantas! Quero encomendar o buquê O Clássico (rosas, lírios amarelos e flores azuis).",
    },
    {
      src: IMG.ousado,
      alt: "Hortênsia azul em vaso",
      title: "O Ousado",
      body: "Hortênsia azul em vaso: cor intensa para transformar qualquer cantinho.",
      position: "object-[50%_40%]",
      message: "Olá, Mania de Plantas! Quero encomendar a hortênsia azul em vaso (O Ousado).",
    },
    {
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
  eyebrow: "Mais flores para dias mais felizes",
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   2 · HERO — título gigante à esquerda; vídeo (ou foto) à direita, sangrando até a borda
   ═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="inicio" className="bg-blush">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)]">
        <div className="flex flex-col justify-center px-5 pt-8 pb-12 sm:px-8 lg:py-16 lg:pr-12 lg:pl-[clamp(2.5rem,5vw,5.5rem)]">
          <RevealLines
            lines={HERO.titleLines}
            onMount
            className="t-display text-display-xl text-bordo"
          />

          <Reveal onMount delay={0.5} className="mt-8 max-w-[27rem]">
            <p className="text-lead font-light text-tinta">{HERO.lead}</p>
          </Reveal>

          <Reveal onMount delay={0.65} className="mt-10">
            <WhatsAppButton variant="primary" size="lg" />
          </Reveal>
        </div>

        <div className="relative px-5 pb-12 sm:px-8 lg:min-h-[44rem] lg:p-0">
          <div className="relative aspect-[4/5] lg:absolute lg:inset-0 lg:aspect-auto">
            <HeroMedia
              imageSrc={IMG.hero}
              imageAlt="Buquê de rosas vermelhas com flores do campo, embrulhado em papel vermelho"
              sizes="(min-width: 1024px) 54vw, 92vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   3 · BUQUÊS DA SEMANA — fundo bordô profundo, 3 cards (foto + bloco rosa pálido)
   ═══════════════════════════════════════════════════════════════════════════ */
function Bouquets() {
  return (
    <section id="buques" aria-labelledby="buques-titulo" className="on-dark bg-bordo-profundo py-16 text-blush lg:py-24">
      <div className="wrap">
        <Reveal className="flex items-end justify-between gap-6">
          <h2 id="buques-titulo" className="eyebrow">
            {BOUQUETS.eyebrow}
          </h2>
          <a
            href={waLink(BOUQUETS.all.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="link-draw text-[0.88rem] text-petala hover:text-blush"
          >
            {BOUQUETS.all.label}
            <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
            <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
          </a>
        </Reveal>

        <Stagger as="ul" className="mt-8 grid gap-5 md:grid-cols-3 lg:mt-10 lg:gap-7">
          {BOUQUETS.items.map((item) => (
            <StaggerItem as="li" key={item.title} className="list-none">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-md bg-blush text-bordo">
                <div className="foto-zoom relative isolate aspect-[11/10] w-full overflow-hidden bg-blush-profundo">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 92vw"
                    className={`object-cover ${item.position}`}
                  />
                </div>

                <div className="flex flex-1 items-end justify-between gap-5 p-6">
                  <div>
                    <h3 className="t-display text-display-m">{item.title}</h3>
                    <p className="mt-2 max-w-[22rem] text-[0.9rem] leading-relaxed font-light text-tinta">{item.body}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-bordo/30 transition-colors duration-500 group-hover:bg-bordo group-hover:text-blush"
                  >
                    <ArrowRight strokeWidth={1.5} className="h-4 w-4" />
                  </span>
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
    <section id="como-funciona" aria-labelledby="como-titulo" className="bg-blush py-20 lg:py-28">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow text-tinta">{HOW.eyebrow}</p>
        </Reveal>

        <Reveal as="h2" delay={0.08} className="t-display text-display-l mt-8 text-center text-bordo">
          <span id="como-titulo">{HOW.title}</span>
        </Reveal>

        <Stagger
          as="ul"
          className="mt-14 grid border-t border-bordo/15 md:grid-cols-3 md:divide-x md:divide-bordo/15 lg:mt-20"
        >
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
                <p className="mt-2 max-w-[19rem] text-[0.93rem] leading-relaxed font-light text-tinta">{body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   5 · CTA FINAL / FOOTER — fundo bordô, botão pill rosa pálido centralizado
   ═══════════════════════════════════════════════════════════════════════════ */
function Closing() {
  return (
    <footer id="contato" className="on-dark bg-bordo-profundo text-blush">
      <div className="wrap flex flex-col items-center py-24 text-center lg:py-32">
        <Reveal>
          <p className="eyebrow text-petala">{CLOSING.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.12} className="mt-10">
          <div id="encomendar">
            <WhatsAppButton variant="light" size="lg" label={site.whatsapp.ctaFinal} />
          </div>
        </Reveal>
      </div>

      <div className="wrap">
        <div className="flex flex-col gap-3 border-t border-blush/15 py-8 pb-28 text-[0.82rem] text-petala sm:flex-row sm:items-center sm:justify-between md:pb-8">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.locality}
          </p>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="link-draw w-fit text-blush">
            WhatsApp {site.whatsapp.display}
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
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
