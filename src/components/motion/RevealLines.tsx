"use client";

import { m, type Variants } from "framer-motion";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export type Run = { t: string };

const wrapper: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const lineVariant: Variants = {
  hidden: { y: "108%" },
  show: { y: "0%", transition: { duration: 1.15, ease: EASE } },
};

/** Uma linha do título: sobe de dentro de uma janela de overflow. Libera a camada de GPU ao terminar. */
function Line({ runs }: { runs: readonly Run[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    // padding/margin compensam o corte de ascendentes/descendentes pelo overflow
    <span className="-mb-[0.12em] block overflow-hidden pr-[0.08em] pb-[0.12em]">
      <m.span
        ref={ref}
        className="block transform-gpu will-change-transform"
        variants={lineVariant}
        onAnimationComplete={() => ref.current?.classList.remove("will-change-transform")}
      >
        {runs.map((r, j) => (
          <span key={j}>{r.t}</span>
        ))}
      </m.span>
    </span>
  );
}

type Props = {
  lines: readonly (readonly Run[])[];
  className?: string;
  as?: "h1" | "h2";
  /** anima ao montar (hero) em vez de ao entrar na tela */
  onMount?: boolean;
};

/**
 * Título com "máscara". Anima apenas `transform` (translateY) — sem layout, sem paint por quadro.
 * O texto continua sendo um único <h1>/<h2> para leitores de tela e SEO.
 */
export function RevealLines({ lines, className, as = "h1", onMount = false }: Props) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      variants={wrapper}
      initial="hidden"
      {...(onMount
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, margin: "0px 0px -12% 0px" } })}
    >
      {lines.map((runs, i) => (
        <Line key={i} runs={runs} />
      ))}
    </Tag>
  );
}
