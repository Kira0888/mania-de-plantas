import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

type Variant = "primary" | "light" | "outline";
type Size = "md" | "lg";

const VARIANT: Record<Variant, string> = {
  // fundo bordô + texto off-white (contraste 12,6:1)
  primary: "bg-bordo text-blush hover:bg-bordo-profundo",
  // para fundos bordô: pill rosa pálido com texto bordô
  light: "bg-blush text-bordo hover:bg-white",
  outline: "border border-bordo/40 text-bordo hover:bg-bordo hover:text-blush",
};

const SIZE: Record<Size, string> = {
  md: "h-11 px-6 text-[0.68rem]",
  lg: "h-14 px-9 text-[0.72rem]",
};

type Props = {
  message?: string;
  label?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
};

/**
 * CTA oficial: pill totalmente arredondada, MAIÚSCULAS espaçadas e seta (→).
 * Abre o WhatsApp com mensagem pré-preenchida.
 */
export function WhatsAppButton({
  message,
  label = site.whatsapp.cta,
  variant = "primary",
  size = "lg",
  className = "",
}: Props) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-3 rounded-full font-medium tracking-[0.18em] whitespace-nowrap uppercase transition-colors duration-500 ${VARIANT[variant]} ${SIZE[size]} ${className}`}
    >
      <span>{label}</span>
      <ArrowRight
        aria-hidden="true"
        strokeWidth={1.5}
        className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:translate-x-1"
      />
      <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
    </a>
  );
}
