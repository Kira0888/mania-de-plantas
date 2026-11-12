"use client";

import { m, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export type Run = { t: string; em?: boolean };

const wrapper: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const line: Variants = {
  hidden: { y: "108%" },
  show: { y: "0%", transition: { duration: 1.15, ease: EASE } },
};

type Props = {
  lines: readonly (readonly Run[])[];
  className?: string;
  /** classe aplicada ao trecho em itálico */
  emClassName?: string;
  as?: "h1" | "h2";
  /** anima ao montar (hero) em vez de ao entrar na tela */
  onMount?: boolean;
};

/**
 * Título com "máscara": cada linha sobe de dentro de uma janela de overflow.
 * Anima apenas `transform` (translateY) — sem layout, sem paint por quadro.
 * O texto continua sendo um único <h1>/<h2> para leitores de tela e SEO.
 */
export function RevealLines({ lines, className, emClassName = "", as = "h1", onMount = false }: Props) {
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
        // padding/margin compensam o corte de ascendentes/descendentes pelo overflow
        <span key={i} className="-mb-[0.14em] block overflow-hidden pr-[0.08em] pb-[0.14em]">
          <m.span className="block transform-gpu" variants={line}>
            {runs.map((r, j) =>
              r.em ? (
                <span key={j} className={`em-accent ${emClassName}`}>
                  {r.t}
                </span>
              ) : (
                <span key={j}>{r.t}</span>
              ),
            )}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}
