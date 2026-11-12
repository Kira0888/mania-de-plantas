import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import { ArrowUpRightIcon, WhatsAppIcon } from "./icons";

type Variant = "primary" | "outline";
type Size = "md" | "lg";

const VARIANT: Record<Variant, string> = {
  // CTA principal: mostarda suave com texto verde profundo (contraste 10:1)
  primary: "bg-mostarda text-fundo hover:bg-creme",
  outline: "border border-creme/30 text-creme hover:border-mostarda hover:text-mostarda",
};

const SIZE: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9rem]",
  lg: "h-14 px-7 text-[0.98rem]",
};

type Props = {
  message?: string;
  label?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** mostra a seta que sobe no hover */
  arrow?: boolean;
};

/**
 * CTA oficial: sempre o mesmo rótulo ("Fazer Encomenda") e a mesma forma de pílula.
 * Abre o WhatsApp com mensagem pré-preenchida.
 */
export function WhatsAppButton({
  message,
  label = site.whatsapp.cta,
  variant = "primary",
  size = "lg",
  className = "",
  arrow = true,
}: Props) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex transform-gpu items-center justify-center gap-3 rounded-full font-semibold tracking-[0.005em] whitespace-nowrap transition-colors duration-500 ${VARIANT[variant]} ${SIZE[size]} ${className}`}
    >
      <WhatsAppIcon className="h-[1.15em] w-[1.15em] shrink-0" />
      <span>{label}</span>
      {arrow && (
        <ArrowUpRightIcon className="h-[1.1em] w-[1.1em] shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
      <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
    </a>
  );
}
