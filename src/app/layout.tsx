import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { site } from "@/content/site";
import "./globals.css";

/**
 * Títulos: Playfair Display — serifada clássica de alto contraste.
 * Só o estilo normal (variável, 1 arquivo): o design não usa itálico, então não baixamos o arquivo itálico.
 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

/** Texto e interface: Inter — sans limpa e moderna, usada em peso leve (1 arquivo variável). */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title = `${site.name} — Floricultura em ${site.locality} | Flores Frescas e Arranjos Artesanais`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  keywords: [
    "floricultura",
    "floricultura em Samambaia",
    "flores Samambaia DF",
    "buquê de flores",
    "encomenda de flores",
    "buquê de rosas",
    "arranjos artesanais",
    "presente com flores",
    "Mania de Plantas",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4e3dd",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

/** Dados estruturados (schema.org/Florist). Só campos informados pelo cliente. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Florist",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: `+${site.whatsapp.number}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: "Samambaia",
    addressRegion: "DF",
    addressCountry: "BR",
  },
  hasMap: site.address.mapsUrl,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        {/* Sem JS, as entradas animadas não podem deixar o conteúdo invisível */}
        <noscript>
          <style>{`[style*="opacity: 0"],[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <a
          href="#conteudo"
          className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-full bg-bordo px-5 py-3 text-sm font-medium text-blush transition-transform focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>

        <MotionProvider>{children}</MotionProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
