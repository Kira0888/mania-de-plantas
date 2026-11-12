import { ArrowRight, type LucideIcon } from "lucide-react";

type Variant = "primary" | "light" | "outline" | "outlineLight";
type Size = "md" | "lg";

const VARIANT: Record<Variant, string> = {
  // sobre blush: fundo bordô + texto blush (13,1:1)
  primary: "bg-bordo text-blush hover:bg-bordo-claro",
  // sobre bordô: pill blush com texto bordô
  light: "bg-blush text-bordo hover:bg-white",
  outline: "border border-bordo/40 text-bordo hover:bg-bordo hover:text-blush",
  outlineLight: "border border-blush/40 text-blush hover:bg-blush hover:text-bordo",
};

const SIZE: Record<Size, string> = {
  md: "h-11 px-5 text-[0.68rem] sm:px-6",
  // px/gap menores em telas muito estreitas (320 px): o botão do Maps com ícone + seta não pode passar da borda
  lg: "h-14 px-6 text-[0.7rem] sm:px-9 sm:text-[0.72rem]",
};

type Props = {
  href: string;
  label: string;
  /** texto extra só para leitores de tela (ex.: "abre o WhatsApp em nova aba") */
  hint: string;
  variant?: Variant;
  size?: Size;
  icon?: LucideIcon;
  className?: string;
};

/**
 * Botão pill da marca: totalmente arredondado, MAIÚSCULAS espaçadas e seta (→).
 * Sempre abre em nova aba (WhatsApp, Google Maps).
 */
export function PillLink({ href, label, hint, variant = "primary", size = "lg", icon: Icon, className = "" }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex max-w-full items-center justify-center gap-2.5 rounded-full font-medium tracking-[0.14em] whitespace-nowrap uppercase sm:gap-3 sm:tracking-[0.18em] transition-colors duration-500 ${VARIANT[variant]} ${SIZE[size]} ${className}`}
    >
      {Icon && <Icon aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 shrink-0" />}
      <span>{label}</span>
      <ArrowRight
        aria-hidden="true"
        strokeWidth={1.5}
        className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:translate-x-1"
      />
      <span className="sr-only"> ({hint})</span>
    </a>
  );
}
