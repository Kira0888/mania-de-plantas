"use client";

import { m } from "framer-motion";
import { useRef, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -8% 0px" } as const;

/** Camada de GPU só enquanto anima (ver Reveal.tsx). */
const GPU = "transform-gpu will-change-transform";
const release = (el: HTMLElement | null) => el?.classList.remove("will-change-transform");

/**
 * Fio de 1px que "desenha" da esquerda para a direita quando entra na tela.
 * Anima só `transform: scaleX` (compositor) — uma vez.
 */
export function Rule({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <m.div
      ref={ref}
      aria-hidden="true"
      className={`${GPU} h-px origin-left ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.4, ease: EASE, delay }}
      onAnimationComplete={() => release(ref.current)}
    />
  );
}

/**
 * Foto que entra com zoom leve (1.08 → 1) + fade, UMA vez. O contêiner pai precisa de
 * `relative overflow-hidden`. Anima só `transform` e `opacity`.
 */
export function ImageReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <m.div
      ref={ref}
      className={`${GPU} absolute inset-0`}
      initial={{ scale: 1.08, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.5, ease: EASE }}
      onAnimationComplete={() => release(ref.current)}
    >
      {children}
    </m.div>
  );
}
