"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef, useSyncExternalStore, type ReactNode } from "react";

/** Parallax só em telas largas com mouse. Em mobile / motion reduzido a camada fica parada. */
const QUERY = "(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

type Props = {
  children: ReactNode;
  className?: string;
  /** quanto a camada interna desliza (em % da própria altura) */
  strength?: number;
};

/**
 * Moldura de foto com parallax de UMA camada (só o hero usa).
 *
 * - `useScroll` + `useTransform` geram MotionValues: o framer escreve o `transform`
 *   direto no DOM, sem re-render do React.
 * - A árvore de elementos é SEMPRE a mesma (nada remonta após a hidratação);
 *   quem liga/desliga o efeito é só o valor de `y`.
 * - A camada interna é maior que a moldura (inset negativo) → nunca mostra "buraco".
 * - Entrada: scale 1.12 → 1 + fade (compositor).
 */
export function ParallaxFrame({ children, className = "", strength = 7 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${strength}%`]);

  return (
    <div ref={ref} className={`relative isolate overflow-hidden ${className}`}>
      <m.div
        className="absolute inset-x-0 -top-[8%] -bottom-[8%] transform-gpu will-change-transform"
        style={{ y: enabled ? y : 0 }}
      >
        <m.div
          className="absolute inset-0 transform-gpu"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </m.div>
      </m.div>
    </div>
  );
}
