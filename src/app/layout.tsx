import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { site } from "@/content/site";
import "./globals.css";

/** Títulos: Playfair Display — serifada editorial de alto contraste. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

/** Texto e interface: Plus Jakarta Sans — sans moderna e limpa. */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const title = `${site.name} — Floricultura em ${site.locality} | Arranjos, Plantas e Encomendas`;

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
    "arranjos de flores",
    "encomenda de flores",
    "buquê de rosas",
    "plantas ornamentais",
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
  themeColor: "#0f1c18",
  colorScheme: "dark",
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
    addressLocality: "Samambaia",
    addressRegion: "DF",
    addressCountry: "BR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${jakarta.variable}`}>
      <body>
        {/* Sem JS, as entradas animadas não podem deixar o conteúdo invisível */}
        <noscript>
          <style>{`[style*="opacity: 0"],[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <a
          href="#conteudo"
          className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-full bg-mostarda px-5 py-3 text-sm font-semibold text-fundo transition-transform focus:translate-y-0"
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
