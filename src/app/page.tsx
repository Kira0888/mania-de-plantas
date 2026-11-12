import Image from "next/image";
import { Header } from "@/components/Header";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { ParallaxFrame } from "@/components/motion/ParallaxFrame";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { RevealLines } from "@/components/motion/RevealLines";
import {
  ArchIcon,
  ArrowUpRightIcon,
  BowlIcon,
  CheckIcon,
  FlowerIcon,
  GiftIcon,
  HeartIcon,
  PotIcon,
  SproutIcon,
  StarIcon,
} from "@/components/ui/icons";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

/* ═══════════════════════════════════════════════════════════════════════════
   IMAGENS — arquivos na raiz de /public (caminhos exatos do briefing)
   ═══════════════════════════════════════════════════════════════════════════ */
const IMG = {
  heroMain: "/33611.png", // buquê de rosas vermelhas
  heroDeco: "/33612.png", // jibóia com tucanos
  best1: "/33608.png", // rosas vermelhas, lírios amarelos e flores azuis
  best2: "/33610.png", // vaso de hortênsia azul
  best3: "/33609.png", // buquê de rosas em cone de papel pardo
  about: "/33607.png", // arranjo rosa com lírios
  aboutAlt: "/33606.png", // buquê redondo de rosas
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   COPY
   ═══════════════════════════════════════════════════════════════════════════ */
const HERO = {
  eyebrow: "Floricultura · Samambaia, DF",
  titleLines: [
    [{ t: "Plantas e" }],
    [{ t: "Arranjos Para" }],
    [{ t: "Todos os" }],
    [{ t: "Momentos.", em: true }],
  ],
  lead: "Curadoria botânica e arranjos artesanais feitos com carinho. Aceitamos encomendas exclusivas para presentes e decoração em Samambaia, DF.",
} as const;

const ABOUT = {
  eyebrow: "Sobre a Mania",
  title: { before: "Onde as Plantas Encontram as ", em: "Suas Pessoas." },
  body: "Na Mania de Plantas, cada flor e cada folha é escolhida com carinho e montada à mão. Aqui você conversa com quem entende de planta — e sai com o presente certo ou com a planta que combina com o seu cantinho.",
  points: ["Curadoria botânica", "Arranjos artesanais", "Atendimento acolhedor"],
} as const;

const BEST = {
  eyebrow: "Mais Vendidos",
  title: { before: "Nossos Arranjos ", em: "Mais Amados" },
  lead: "Os preferidos de quem encomenda. Cada arranjo pode ser adaptado à ocasião, à paleta e ao seu orçamento.",
  items: [
    {
      n: "01",
      src: IMG.best1,
      alt: "Arranjo com rosas vermelhas, lírios amarelos e flores azuis",
      title: "Rosas, Lírios & Flores Azuis",
      body: "Rosas vermelhas, lírios amarelos e toques de azul em uma composição cheia de vida.",
      message: "Olá, Mania de Plantas! Quero encomendar o arranjo de rosas vermelhas, lírios amarelos e flores azuis.",
    },
    {
      n: "02",
      src: IMG.best2,
      alt: "Vaso de hortênsia azul",
      title: "Hortênsia Azul em Vaso",
      body: "Uma hortênsia exuberante em vaso, pronta para presentear ou decorar.",
      message: "Olá, Mania de Plantas! Quero encomendar a hortênsia azul em vaso.",
    },
    {
      n: "03",
      src: IMG.best3,
      alt: "Buquê de rosas vermelhas em cone de papel pardo",
      title: "Buquê no Cone Kraft",
      body: "Rosas vermelhas embrulhadas em papel pardo: um clássico que nunca erra.",
      message: "Olá, Mania de Plantas! Quero encomendar o buquê de rosas vermelhas no cone de papel pardo.",
    },
  ],
} as const;

const MARQUEE = ["Entrega Local", "Flores Frescas", "Encomendas Rápidas", "Atendimento Especializado"] as const;

const SERVICES = {
  eyebrow: "O que fazemos",
  title: { before: "Serviços que ", em: "Oferecemos" },
  lead: "Do presente de última hora à decoração planejada, a gente cuida de cada detalhe com atenção.",
  items: [
    { Icon: FlowerIcon, title: "Encomendas de Flores", body: "Buquês e arranjos sob medida para a ocasião, a paleta e o orçamento que você tiver." },
    { Icon: BowlIcon, title: "Arranjos Vivos", body: "Composições artesanais com plantas vivas, vasos e cachepôs escolhidos a dedo." },
    { Icon: PotIcon, title: "Plantas Ornamentais", body: "Folhagens e plantas selecionadas, com a indicação certa de luz, rega e vaso." },
    { Icon: SproutIcon, title: "Variedades Botânicas", body: "Espécies diferentes para quem coleciona, experimenta e gosta de descobrir." },
    { Icon: GiftIcon, title: "Presentes Especiais", body: "Aniversário, agradecimento ou saudade: o presente certo para cada momento." },
    { Icon: ArchIcon, title: "Decoração de Ambientes", body: "Plantas e arranjos para deixar a casa e o escritório mais acolhedores." },
  ],
  cta: { title: "Conte a ocasião. A gente cuida do resto.", note: "Respondemos pelo WhatsApp." },
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   PEQUENOS BLOCOS REUTILIZÁVEIS
   ═══════════════════════════════════════════════════════════════════════════ */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow inline-flex items-center gap-3 text-mostarda">
      <span aria-hidden="true" className="h-px w-8 bg-mostarda/60" />
      {children}
    </p>
  );
}

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="flex gap-0.5 text-mostarda" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className={className} />
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   2 · HERO
   ═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="inicio" className="relative overflow-x-clip pt-6 pb-24 lg:pt-10 lg:pb-36">
      {/* brilho estático e discreto atrás da composição (sem animação, sem repaint) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_78%_42%,rgba(46,92,72,0.34),transparent_72%)]"
      />

      <div className="wrap grid items-center gap-20 lg:grid-cols-12 lg:gap-10">
        {/* Texto */}
        <div className="lg:col-span-7">
          <Reveal delay={0.05}>
            <Eyebrow>{HERO.eyebrow}</Eyebrow>
          </Reveal>

          <RevealLines
            lines={HERO.titleLines}
            onMount
            className="t-display text-display-xl mt-7 text-creme"
          />

          <Reveal delay={0.55} className="mt-8">
            <p className="max-w-[34rem] text-lead text-neblina">{HERO.lead}</p>
          </Reveal>

          <Reveal delay={0.7} className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-9">
            <WhatsAppButton variant="primary" size="lg" />
            <a href="#mais-amados" className="link-draw text-[0.95rem] font-medium text-creme">
              Ver os mais amados
            </a>
          </Reveal>
        </div>

        {/* Composição: imagem principal + decorativa + cards flutuantes */}
        <div className="relative mx-auto w-full max-w-[30rem] lg:col-span-5 lg:max-w-none">
          <ParallaxFrame className="aspect-[4/5] w-full rounded-[2.75rem] bg-superficie-alta">
            <Image
              src={IMG.heroMain}
              alt="Lindo buquê de rosas vermelhas"
              fill
              priority
              sizes="(min-width: 1024px) 38vw, 92vw"
              className="object-cover"
            />
          </ParallaxFrame>

          {/* Imagem decorativa secundária */}
          <Reveal delay={0.9} className="absolute -bottom-9 -left-4 w-[36%] sm:-left-10 lg:-left-14">
            <div className="flutua-2">
              <div className="relative isolate aspect-square overflow-hidden rounded-[2rem] border-[6px] border-fundo bg-superficie-alta">
                <Image
                  src={IMG.heroDeco}
                  alt="Jibóia com tucanos decorativos"
                  fill
                  sizes="(min-width: 1024px) 14vw, 34vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          {/* Card flutuante: avaliações */}
          <Reveal delay={1.05} className="absolute top-8 -left-3 sm:-left-9 lg:top-12 lg:-left-12">
            <div className="flutua">
              <div className="flex items-center gap-4 rounded-2xl border border-creme/10 bg-superficie-alta px-5 py-4 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.85)]">
                <span className="t-display text-[2.5rem] leading-none text-creme">{site.rating.score}</span>
                <div>
                  <Stars className="h-3.5 w-3.5" />
                  <p className="mt-1.5 text-[0.78rem] leading-tight text-neblina">
                    {site.rating.count} Avaliações no {site.rating.source}
                  </p>
                </div>
                <p className="sr-only">
                  Nota {site.rating.score} de 5, com {site.rating.count} avaliações no {site.rating.source}.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Badge flutuante: atendimento */}
          <Reveal delay={1.2} className="absolute -right-3 -bottom-5 sm:-right-6 lg:-right-8">
            <div className="flutua-2">
              <div className="flex items-center gap-2.5 rounded-full bg-mostarda px-5 py-3 text-[0.85rem] font-semibold text-fundo shadow-[0_18px_40px_-18px_rgba(0,0,0,0.85)]">
                <HeartIcon className="h-4 w-4" />
                Atendimento Acolhedor
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   3 · SEÇÃO INTERMEDIÁRIA — imagem grande à esquerda, texto e CTA à direita
   ═══════════════════════════════════════════════════════════════════════════ */
function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="py-24 lg:py-36">
      <div className="wrap grid items-center gap-20 lg:grid-cols-12 lg:gap-10">
        <Reveal className="relative mx-auto w-full max-w-[32rem] lg:col-span-6 lg:max-w-none" y={34}>
          <div className="foto-zoom relative isolate aspect-[4/5] w-full overflow-hidden rounded-[2.75rem] bg-superficie-alta lg:aspect-[5/6]">
            <Image
              src={IMG.about}
              alt="Arranjo em tons de rosa com lírios"
              fill
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="object-cover"
            />
          </div>
          <div className="foto-zoom absolute -right-3 -bottom-10 isolate aspect-square w-[40%] overflow-hidden rounded-full border-[8px] border-fundo bg-superficie-alta sm:-right-8 lg:-right-10">
            <Image
              src={IMG.aboutAlt}
              alt="Buquê redondo de rosas"
              fill
              sizes="(min-width: 1024px) 18vw, 38vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <Eyebrow>{ABOUT.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal as="h2" delay={0.08} className="t-display text-display-l mt-7 text-creme">
            <span id="sobre-titulo">
              {ABOUT.title.before}
              <span className="em-accent">{ABOUT.title.em}</span>
            </span>
          </Reveal>

          <Reveal delay={0.16} className="mt-8">
            <p className="text-lead text-neblina">{ABOUT.body}</p>
          </Reveal>

          <Stagger as="ul" className="mt-9 space-y-4">
            {ABOUT.points.map((p) => (
              <StaggerItem as="li" key={p} className="flex list-none items-center gap-4 text-[1.02rem] text-creme">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mostarda text-fundo">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                {p}
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2} className="mt-11">
            <WhatsAppButton variant="primary" size="lg" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   4 · BEST SELLERS — 3 cards verticais com topo em arco
   ═══════════════════════════════════════════════════════════════════════════ */
function BestSellers() {
  return (
    <section id="mais-amados" aria-labelledby="mais-amados-titulo" className="pt-12 pb-28 lg:pt-20 lg:pb-40">
      <div className="wrap">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{BEST.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal as="h2" delay={0.08} className="t-display text-display-l mt-7 text-creme">
              <span id="mais-amados-titulo">
                {BEST.title.before}
                <span className="em-accent">{BEST.title.em}</span>
              </span>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <p className="text-lead text-neblina">{BEST.lead}</p>
          </Reveal>
        </header>

        <Stagger as="ul" className="mt-16 grid gap-x-7 gap-y-14 md:grid-cols-3 lg:mt-24">
          {BEST.items.map((item, i) => (
            <StaggerItem as="li" key={item.n} className={`list-none ${i === 1 ? "md:mt-16" : ""}`}>
              <article className="group relative flex h-full flex-col rounded-t-full rounded-b-[2rem] border border-creme/10 bg-superficie px-3 pt-3 pb-7 transition-colors duration-500 hover:border-mostarda/40">
                <div className="foto-zoom relative isolate aspect-[4/5] w-full overflow-hidden rounded-t-full rounded-b-[1.5rem] bg-superficie-alta">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 92vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-4 left-4 rounded-full bg-mostarda px-3.5 py-1.5 text-[0.72rem] font-bold tracking-wider text-fundo">
                    {item.n}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-3 pt-6">
                  <h3 className="t-display text-display-m text-creme">{item.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-neblina">{item.body}</p>
                  <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                    {/* o ::after estica a área clicável sobre o card inteiro */}
                    <a
                      href={waLink(item.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 items-center text-[0.92rem] font-semibold text-mostarda after:absolute after:inset-0 after:rounded-[inherit] after:content-['']"
                    >
                      Fazer Encomenda
                      <span className="sr-only"> — {item.title} (abre o WhatsApp em nova aba)</span>
                    </a>
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mostarda text-fundo transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-12"
                    >
                      <ArrowUpRightIcon className="h-5 w-5" />
                    </span>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   5 · MARQUEE MOSTARDA
   Duas metades idênticas + translate3d(-50%) = loop sem emenda, só no compositor.
   ═══════════════════════════════════════════════════════════════════════════ */
function Marquee() {
  const group = (
    <div className="flex shrink-0 items-center">
      {[0, 1].flatMap((rep) =>
        MARQUEE.map((text) => (
          <span key={`${rep}-${text}`} className="flex items-center">
            <span className="t-display px-7 text-[1.35rem] whitespace-nowrap italic sm:px-10 sm:text-[1.7rem]">{text}</span>
            <span aria-hidden="true" className="text-[1.1rem] sm:text-[1.3rem]">
              •
            </span>
          </span>
        )),
      )}
    </div>
  );

  return (
    <div className="overflow-hidden bg-mostarda py-4 text-fundo sm:py-5">
      <p className="sr-only">{MARQUEE.join(" • ")}</p>
      <div aria-hidden="true" className="marquee-track transform-gpu">
        {group}
        {group}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   6 · SERVIÇOS — grid de caixas minimalistas, verde sólido + contorno sutil
   ═══════════════════════════════════════════════════════════════════════════ */
function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="pt-28 pb-20 lg:pt-40 lg:pb-28">
      <div className="wrap">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{SERVICES.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal as="h2" delay={0.08} className="t-display text-display-l mt-7 text-creme">
              <span id="servicos-titulo">
                {SERVICES.title.before}
                <span className="em-accent">{SERVICES.title.em}</span>
              </span>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <p className="text-lead text-neblina">{SERVICES.lead}</p>
          </Reveal>
        </header>

        <Stagger as="ul" className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {SERVICES.items.map(({ Icon, title, body }, i) => (
            <StaggerItem as="li" key={title} className="list-none">
              <article className="group flex h-full min-h-[17rem] flex-col rounded-[1.75rem] border border-creme/10 bg-superficie p-8 transition-colors duration-500 hover:border-mostarda/50">
                <div className="flex items-start justify-between">
                  <Icon className="h-12 w-12 text-mostarda" />
                  <span className="eyebrow text-neblina/70">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="t-display text-display-m mt-auto pt-10 text-creme">{title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-neblina">{body}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Fechamento da seção: CTA de encomenda (alvo do botão flutuante no mobile) */}
        <Reveal
          className="mt-20 flex flex-col items-start justify-between gap-8 border-t border-creme/10 pt-12 lg:mt-28 lg:flex-row lg:items-center"
        >
          <div id="encomendar" className="scroll-mt-24">
            <p className="t-display text-display-m max-w-xl text-creme">{SERVICES.cta.title}</p>
            <p className="mt-2 text-[0.95rem] text-neblina">
              {SERVICES.cta.note} <span className="text-creme">{site.whatsapp.display}</span>
            </p>
          </div>
          <WhatsAppButton variant="primary" size="lg" />
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   RODAPÉ MÍNIMO (apenas contato + direitos; não é uma seção de conteúdo)
   ═══════════════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="border-t border-creme/10 py-10 pb-28 md:pb-10">
      <div className="wrap flex flex-col gap-3 text-[0.85rem] text-neblina sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.locality}
        </p>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="link-draw w-fit text-creme">
          WhatsApp {site.whatsapp.display}
          <span className="sr-only"> (abre em nova aba)</span>
        </a>
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
        <About />
        <BestSellers />
        <Marquee />
        <Services />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
