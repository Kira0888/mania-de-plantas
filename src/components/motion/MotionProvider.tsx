"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Um único provider para o site inteiro.
 * - LazyMotion + domAnimation: só as features de animação/gestos/inView (≈15 KB).
 * - `strict`: lança erro se alguém importar `motion.*` por engano (use sempre `m.*`).
 * - reducedMotion="user": respeita a preferência do sistema em TODAS as animações.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
