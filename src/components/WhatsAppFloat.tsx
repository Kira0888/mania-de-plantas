"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./ui/icons";

/**
 * Pílula de conversão para mobile.
 * Aparece depois do hero e some quando a faixa final de encomenda está na tela.
 * Dois IntersectionObservers — zero listeners de scroll.
 */
export function WhatsAppFloat() {
  const [heroGone, setHeroGone] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const cta = document.getElementById("encomendar");
    const observers: IntersectionObserver[] = [];

    if (hero) {
      const io = new IntersectionObserver(([e]) => setHeroGone(!e.isIntersecting && e.boundingClientRect.top < 0));
      io.observe(hero);
      observers.push(io);
    }
    if (cta) {
      const io = new IntersectionObserver(([e]) => setCtaVisible(e.isIntersecting));
      io.observe(cta);
      observers.push(io);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const show = heroGone && !ctaVisible;

  return (
    <AnimatePresence>
      {show && (
        <m.a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${site.whatsapp.cta} (abre o WhatsApp em nova aba)`}
          className="fixed right-4 bottom-4 left-4 z-40 flex h-14 transform-gpu items-center justify-center gap-3 rounded-full bg-mostarda font-semibold text-fundo shadow-[0_12px_32px_-12px_rgba(0,0,0,0.7)] sm:left-auto sm:px-8 md:hidden"
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <WhatsAppIcon className="h-5 w-5" />
          {site.whatsapp.cta}
        </m.a>
      )}
    </AnimatePresence>
  );
}
