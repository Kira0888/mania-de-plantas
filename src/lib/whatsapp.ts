import { site } from "@/content/site";

/** Monta o link oficial wa.me com mensagem pré-preenchida. */
export function waLink(message: string = site.whatsapp.defaultMessage): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
