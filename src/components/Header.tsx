"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

const NAV = [
  { label: "Buquês", href: "#buques" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Contato", href: "#contato" },
] as const;

/** Logo tipográfico: MANIA / DE PLANTAS — serifada em caixa-alta espaçada. */
function Logo() {
  return (
    <span className="t-display text-[1.02rem] leading-none tracking-[0.2em] uppercase sm:text-[1.1rem]">
      <span className="sr-only">{site.name}</span>
      <span aria-hidden="true">
        Mania <span className="opacity-50">/</span> de Plantas
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
        className={`sticky top-0 z-50 border-b bg-blush transition-[border-color] duration-500 ${
          scrolled || open ? "border-bordo/12" : "border-transparent"
        }`}
      >
        <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
          <a href="#inicio" aria-label={`${site.name} — início`} onClick={() => setOpen(false)} className="inline-flex h-11 shrink-0 items-center">
            <Logo />
          </a>

          <nav aria-label="Principal" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="link-draw text-[0.9rem] text-bordo/90 hover:text-bordo">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden h-11 items-center gap-2.5 rounded-full border border-bordo/40 px-5 text-[0.68rem] font-medium tracking-[0.18em] text-bordo uppercase transition-colors duration-500 hover:bg-bordo hover:text-blush sm:inline-flex"
            >
              Encomendar
              <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              <span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>
            </a>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-bordo md:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X aria-hidden="true" strokeWidth={1.5} className="h-6 w-6" /> : <Menu aria-hidden="true" strokeWidth={1.5} className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="menu-mobile"
            className="fixed inset-0 z-40 flex transform-gpu flex-col bg-blush px-6 pt-28 pb-10 will-change-transform md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav aria-label="Menu" className="flex flex-col">
              {NAV.map((item, i) => (
                <m.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="t-display transform-gpu border-b border-bordo/15 py-5 text-4xl will-change-transform"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.06 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
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
              className="mt-auto inline-flex h-14 transform-gpu items-center justify-center gap-3 rounded-full bg-bordo text-[0.72rem] font-medium tracking-[0.18em] text-blush uppercase will-change-transform"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {site.whatsapp.cta}
              <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
            </m.a>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
