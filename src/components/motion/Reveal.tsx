"use client";

import { m, type Variants } from "framer-motion";
import { useRef, type ElementType, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

/**
 * Camada de GPU só enquanto anima.
 * `transform-gpu will-change-transform` promovem o elemento a uma camada de composição
 * para a animação rodar sem repaint; ao terminar, `will-change` é removido para a
 * memória de GPU voltar (no celular, dezenas de camadas permanentes causam lag).
 */
const GPU = "transform-gpu will-change-transform";
const release = (el: HTMLElement | null) => el?.classList.remove("will-change-transform");

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** atraso em segundos */
  delay?: number;
  /** deslocamento vertical inicial em px */
  y?: number;
  as?: "div" | "p" | "li" | "span" | "h1" | "h2" | "h3" | "figure" | "blockquote";
  /** anima ao montar (conteúdo da primeira dobra) em vez de esperar entrar na tela */
  onMount?: boolean;
};

/**
 * Entrada suave: fade + subida curta, UMA vez, quando o elemento chega à tela.
 * Usa IntersectionObserver (via whileInView) — nenhum listener de scroll.
 * Só anima `opacity` e `transform`.
 */
export function Reveal({ children, className = "", delay = 0, y = 22, as = "div", onMount = false }: RevealProps) {
  const Tag = m[as] as ElementType;
  const ref = useRef<HTMLElement>(null);
  return (
    <Tag
      ref={ref}
      className={`${GPU} ${className}`}
      initial={{ opacity: 0, y }}
      {...(onMount ? { animate: { opacity: 1, y: 0 } } : { whileInView: { opacity: 1, y: 0 }, viewport: VIEWPORT })}
      transition={{ duration: 0.95, ease: EASE, delay }}
      onAnimationComplete={() => release(ref.current)}
    >
      {children}
    </Tag>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.95, ease: EASE } },
};

/** Grupo com entrada escalonada. Filhos devem ser <StaggerItem>. O contêiner em si não anima. */
export function Stagger({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const Tag = m[as] as ElementType;
  return (
    <Tag className={className} variants={container} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Tag = m[as] as ElementType;
  const ref = useRef<HTMLElement>(null);
  return (
    <Tag ref={ref} className={`${GPU} ${className}`} variants={item} onAnimationComplete={() => release(ref.current)}>
      {children}
    </Tag>
  );
}
