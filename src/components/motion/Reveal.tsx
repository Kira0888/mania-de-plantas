"use client";

import { m, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** atraso em segundos */
  delay?: number;
  /** deslocamento vertical inicial em px */
  y?: number;
  as?: "div" | "p" | "li" | "span" | "h1" | "h2" | "h3" | "figure" | "blockquote";
};

/**
 * Entrada suave: fade + subida curta, UMA vez, quando o elemento chega à tela.
 * Usa IntersectionObserver (via whileInView) — nenhum listener de scroll.
 * Só anima `opacity` e `transform`.
 */
export function Reveal({ children, className, delay = 0, y = 22, as = "div" }: RevealProps) {
  const Tag = m[as] as ElementType;
  return (
    <Tag
      className={`transform-gpu ${className ?? ""}`}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.95, ease: EASE, delay }}
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

/** Grupo com entrada escalonada. Filhos devem ser <StaggerItem>. */
export function Stagger({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const Tag = m[as] as ElementType;
  return (
    <Tag
      className={`transform-gpu ${className ?? ""}`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Tag = m[as] as ElementType;
  return (
    <Tag className={`transform-gpu ${className ?? ""}`} variants={item}>
      {children}
    </Tag>
  );
}
