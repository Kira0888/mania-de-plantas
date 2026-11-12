"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const VIDEO_SRC = "/hero_bg.mp4";

/**
 * Modo de mídia:
 *  - "unknown": servidor / hidratação (ainda não sabemos as preferências do usuário)
 *  - "play":    vídeo permitido
 *  - "still":   usuário pediu menos movimento ou economia de dados → sem vídeo
 */
type Mode = "unknown" | "play" | "still";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getSnapshot(): Mode {
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  return !window.matchMedia(QUERY).matches && !saveData ? "play" : "still";
}

const getServerSnapshot = (): Mode => "unknown";

type Props = {
  /** PRIMEIRO QUADRO do vídeo (hero_inicio.jpg): imagem inicial renderizada no servidor (é o LCP) */
  stillSrc: string;
  stillAlt: string;
  /** foto de fallback: só é carregada se o vídeo falhar ou não puder tocar */
  fallbackSrc: string;
  fallbackAlt: string;
  sizes: string;
};

/**
 * Mídia do hero, sem "pisca":
 *
 * 1. O servidor entrega o PRIMEIRO QUADRO do vídeo como imagem (`priority` → LCP rápido).
 * 2. Depois da hidratação o <video> monta e começa exatamente nesse quadro — a transição
 *    foto → vídeo é invisível, porque são o mesmo pixel (conversão de cor conferida contra o Chromium).
 * 3. Se o vídeo falhar, ou o usuário pedir menos movimento / economia de dados, a foto de
 *    fallback (33611) entra com um fade curto. Nesse caso — e só nele — ela é baixada.
 * 4. O vídeo pausa quando sai da tela (IntersectionObserver); `preload="metadata"`.
 */
export function HeroMedia({ stillSrc, stillAlt, fallbackSrc, fallbackAlt, sizes }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);

  const showVideo = mode === "play" && !failed;
  const showFallback = mode === "still" || failed;

  useEffect(() => {
    const box = boxRef.current;
    const video = videoRef.current;
    if (!showVideo || !box || !video) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(box);
    return () => io.disconnect();
  }, [showVideo]);

  return (
    <div ref={boxRef} className="absolute inset-0 overflow-hidden bg-blush-profundo">
      {/* camada 1 — primeiro quadro do vídeo (SSR) */}
      <Image
        src={stillSrc}
        alt={showFallback ? "" : stillAlt}
        fill
        priority
        sizes={sizes}
        className="object-cover"
      />

      {/* camada 2 — vídeo; o crossfade é imperceptível porque começa no mesmo quadro */}
      {showVideo && (
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full transform-gpu object-cover transition-opacity duration-500 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* camada 3 — foto de fallback (só quando necessário) */}
      {showFallback && (
        <Image
          src={fallbackSrc}
          alt={fallbackAlt}
          fill
          sizes={sizes}
          className="fade-in object-cover"
        />
      )}
    </div>
  );
}
