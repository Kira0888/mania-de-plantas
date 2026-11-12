/**
 * Dados do negócio (contato, endereço, prova social).
 * Os textos da landing page ficam no próprio src/app/page.tsx.
 */
export const site = {
  name: "Mania de Plantas",
  descriptor: "Floricultura & Garden Center",
  locality: "Samambaia, DF",
  description:
    "Flores frescas e arranjos artesanais entregues com carinho em Samambaia, DF. Nota 5.0 no Google. Faça sua encomenda pelo WhatsApp.",

  /**
   * Domínio público (canonical, sitemap, dados estruturados).
   * Ordem: NEXT_PUBLIC_SITE_URL (domínio próprio) → URL de produção da Vercel → localhost.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

  whatsapp: {
    /** Formato internacional, só dígitos: 55 + DDD + número */
    number: "5561999842506",
    display: "(61) 99984-2506",
    cta: "Fazer Encomenda",
    ctaFinal: "Falar no WhatsApp",
    defaultMessage: "Olá, Mania de Plantas! Gostaria de fazer uma encomenda.",
  },

  /** Endereço da loja e link direto da localização no Google Maps (abre o app no celular). */
  address: {
    line1: "QR 310 Conjunto 08 lote 01",
    line2: "Samambaia, Brasília - DF",
    full: "QR 310 Conjunto 08 lote 01 - Samambaia, Brasília - DF",
    street: "QR 310 Conjunto 08 lote 01",
    mapsUrl: "https://www.google.com/maps/place//data=!4m2!3m1!19sChIJm2i8aFYtWpMRsffm5f8SFRs",
  },

  /** Prova social informada pelo cliente: 5.0 com 6 avaliações no Google. */
  rating: {
    score: "5.0",
    count: 6,
    source: "Google",
  },
} as const;
