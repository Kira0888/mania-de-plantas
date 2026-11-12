import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import { PillLink } from "./PillLink";

type Props = {
  message?: string;
  label?: string;
  variant?: "primary" | "light" | "outline";
  size?: "md" | "lg";
  className?: string;
};

/** CTA oficial: pill + seta, abre o WhatsApp com mensagem pré-preenchida. */
export function WhatsAppButton({ message, label = site.whatsapp.cta, variant = "primary", size = "lg", className }: Props) {
  return (
    <PillLink
      href={waLink(message)}
      label={label}
      hint="abre o WhatsApp em nova aba"
      variant={variant}
      size={size}
      className={className}
    />
  );
}
