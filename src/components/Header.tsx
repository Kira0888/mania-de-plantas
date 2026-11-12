"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "./ui/icons";

const NAV = [
  { label: "Sobre", href: "#sobre" },
  { label: "Mais Amados", href: "#mais-amados" },
  { label: "Serviços", href: "#servicos" },
] as const;

/** Logo tipográfico: serifada com o "de" em itálico mostarda. */
function Logo() {
  return (
    <span className="t-display text-[1.45rem] leading-none tracking-[-0.01em] text-creme">
      <span className="sr-only">{site.name}</span>
      <span aria-hidden="true">
        Mania <span className="font-normal text-mostarda italic">de</span> Plantas
      </span>
    </span>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  // Sem listener de scroll: um IntersectionObserver observa uma "sentinela" no topo da página.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Menu mobile: trava o scroll do body e fecha com Esc.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 h-14 w-px" />
      <header
        className={`sticky top-0 z-50 border-b transition-[background-color,border-color] duration-500 ${
          scrolled || open ? "border-creme/10 bg-fundo" : "border-transparent bg-fundo/0"
        }`}
      >
        <div className="wrap flex h-[4.75rem] items-center justify-between gap-6">
          <a href="#inicio" aria-label={`${site.name} — início`} onClick={() => setOpen(false)} className="inline-flex h-11 shrink-0 items-center">
            <Logo />
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-10 md:flex">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="link-draw text-[0.92rem] font-medium text-creme/85 hover:text-creme">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-11 items-center gap-2.5 rounded-full bg-mostarda px-5 text-[0.9rem] font-semibold text-fundo transition-colors duration-500 hover:bg-creme sm:inline-flex"
            >
              <WhatsAppIcon className="h-[1.1em] w-[1.1em]" />
              {site.whatsapp.cta}
              <span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>
            </a>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-creme md:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="menu-mobile"
            className="fixed inset-0 z-40 flex transform-gpu flex-col bg-fundo px-6 pt-28 pb-10 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <nav aria-label="Menu" className="flex flex-col">
              {NAV.map((item, i) => (
                <m.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="t-display transform-gpu border-b border-creme/10 py-5 text-4xl"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.08 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item.label}
                </m.a>
              ))}
            </nav>
            <m.a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-auto inline-flex h-14 transform-gpu items-center justify-center gap-3 rounded-full bg-mostarda font-semibold text-fundo"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <WhatsAppIcon className="h-5 w-5" />
              {site.whatsapp.cta}
            </m.a>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
