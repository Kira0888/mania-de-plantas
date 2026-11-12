"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const VIDEO_SRC = "/hero_bg.mp4";

/** Quando o vídeo pode tocar: sem "reduzir movimento" e sem "economia de dados". Servidor = false. */
const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getSnapshot() {
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  return !window.matchMedia(QUERY).matches && !saveData;
}

const getServerSnapshot = () => false;

type Props = {
  /** foto: é o LCP e o fallback caso o vídeo não exista, falhe ou não deva tocar */
  imageSrc: string;
  imageAlt: string;
  sizes: string;
};

/**
 * Mídia do hero: FOTO primeiro, VÍDEO por cima quando estiver rodando.
 *
 * - A foto (`next/image`, `priority`) é renderizada no servidor → LCP rápido, sem esperar vídeo.
 * - O <video> só é montado no cliente, depois da hidratação, e só se o usuário permitir movimento.
 * - Se `/hero_bg.mp4` não existir ou falhar, o evento `error` remove o vídeo e a foto continua ali.
 * - O vídeo pausa quando sai da tela (IntersectionObserver) — economiza CPU/bateria no celular.
 * - `preload="metadata"`: não baixa o arquivo inteiro de antemão; o autoplay começa o streaming.
 */
export function HeroMedia({ imageSrc, imageAlt, sizes }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canPlay = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const showVideo = canPlay && !failed;

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
    <div ref={boxRef} className="absolute inset-0 overflow-hidden rounded-sm bg-blush-profundo">
      <Image src={imageSrc} alt={imageAlt} fill priority sizes={sizes} className="object-cover" />

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
          className={`absolute inset-0 h-full w-full transform-gpu rounded-sm object-cover transition-opacity duration-1000 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
