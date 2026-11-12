import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

/** Glifo do WhatsApp (preenchido, herda `currentColor`). */
export function WhatsAppIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export function ArrowIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function StarIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="m12 2.6 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.3 1.3-6.6L2.5 9.5l6.6-.8L12 2.6Z" />
    </svg>
  );
}

export function HeartIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 21s-7.5-4.6-9.5-9.3C1.2 8.6 3 5.5 6.2 5.5c2 0 3.3 1 3.8 2.1.500-1.1 1.8-2.1 3.8-2.1 3.2 0 5 3.1 3.7 6.2C19.5 16.4 12 21 12 21Z" />
    </svg>
  );
}

export function CheckIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function MenuIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M4 8h16M4 16h10" />
    </svg>
  );
}

export function CloseIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

/* ── Ícones de serviço: traço único de 1.25, mesma linguagem do restante ── */
const svc = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/** Flor: roseta de 5 pétalas + haste e folha */
export function FlowerIcon(props: P) {
  return (
    <svg {...svc} {...props}>
      <circle cx="24" cy="17" r="3" />
      {[0, 72, 144, 216, 288].map((a) => (
        <path key={a} d="M24 14c-3.5-4-3-8.5 0-10 3 1.5 3.5 6 0 10Z" transform={`rotate(${a} 24 17)`} />
      ))}
      <path d="M24 26v18" />
      <path d="M24 36c-5 0-8.5-2.5-9-7 5 0 8.5 2.5 9 7Z" />
    </svg>
  );
}

/** Arranjo vivo: tigela com brotos */
export function BowlIcon(props: P) {
  return (
    <svg {...svc} {...props}>
      <path d="M7 28h34c0 8-7 14-17 14S7 36 7 28Z" />
      <path d="M24 28V14" />
      <path d="M24 20c-6 0-9-3.5-9-8 6 0 9 3.5 9 8Z" />
      <path d="M24 17c0-5 3-8 8-8 0 5-3 8-8 8Z" />
      <path d="M33 28v-5M15 28v-4" />
    </svg>
  );
}

/** Planta ornamental: vaso com folhas */
export function PotIcon(props: P) {
  return (
    <svg {...svc} {...props}>
      <path d="M13 28h22l-3 14a2 2 0 0 1-2 1.6H18a2 2 0 0 1-2-1.6L13 28Z" />
      <path d="M24 28V14" />
      <path d="M24 22c-7 0-11-4-11-10 7 0 11 4 11 10Z" />
      <path d="M24 18c0-6 4-10 11-10 0 6-4 10-11 10Z" />
    </svg>
  );
}

/** Variedade botânica: broto */
export function SproutIcon(props: P) {
  return (
    <svg {...svc} {...props}>
      <path d="M24 42V24" />
      <path d="M24 28c-9 0-14-5.5-14-13 9 0 14 5.5 14 13Z" />
      <path d="M24 22c0-7 5-12 14-12 0 7-5 12-14 12Z" />
      <path d="M16 42h16" />
    </svg>
  );
}

/** Presente: caixa com laço */
export function GiftIcon(props: P) {
  return (
    <svg {...svc} {...props}>
      <rect x="8" y="20" width="32" height="22" rx="2" />
      <path d="M6 14h36v6H6zM24 14v28" />
      <path d="M24 14c-3-7-11-8-11-3.5 0 2.5 5 3.5 11 3.5Zm0 0c3-7 11-8 11-3.5 0 2.5-5 3.5-11 3.5Z" />
    </svg>
  );
}

/** Decoração: janela em arco (a forma-assinatura da marca) */
export function ArchIcon(props: P) {
  return (
    <svg {...svc} {...props}>
      <path d="M10 43V22a14 14 0 0 1 28 0v21Z" />
      <path d="M24 8v35M10 26h28" />
      <path d="M4 43h40" />
    </svg>
  );
}
