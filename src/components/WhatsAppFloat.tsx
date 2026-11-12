"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

/**
 * Pílula de conversão para mobile.
 * Aparece depois do hero e some quando o CTA final está na tela.
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
          className="fixed right-4 bottom-4 left-4 z-40 flex h-14 transform-gpu items-center justify-center gap-3 rounded-full bg-bordo text-[0.72rem] font-medium tracking-[0.18em] text-blush uppercase shadow-[0_12px_30px_-12px_rgba(61,16,28,0.6)] will-change-transform sm:left-auto sm:px-9 md:hidden"
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {site.whatsapp.cta}
          <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
        </m.a>
      )}
    </AnimatePresence>
  );
}
