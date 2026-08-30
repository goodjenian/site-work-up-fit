import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { BrandSprite } from "@/components/brand/BrandSprite";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/url";
import { JsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["800"],
  style: ["normal", "italic"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Work Up Fit — Certificação em metodologias fitness coletivas",
    template: "%s | Work Up Fit",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "certificação educação física",
    "metodologia fitness",
    "aulas coletivas",
    "certificação instrutor",
    "licenciamento academia",
    "Work Up Fit",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: "Work Up Fit — Certificação em metodologias fitness coletivas",
    description: site.description,
    // Stated explicitly so this matches every other page. Left implicit, the
    // `opengraph-image` file convention fills it with an extension-less URL
    // that static hosts serve as octet-stream.
    images: [{ url: absoluteUrl("/og.png"), width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#070B14",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${barlowCondensed.variable}`}>
      <body className="min-h-dvh antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${site.url}/#organization`,
                name: site.name,
                url: site.url,
                description: site.description,
                logo: `${site.url}/brand/logo-lockup.png`,
                areaServed: { "@type": "Country", name: "Brasil" },
              },
              {
                "@type": "WebSite",
                "@id": `${site.url}/#website`,
                url: site.url,
                name: site.name,
                inLanguage: "pt-BR",
                publisher: { "@id": `${site.url}/#organization` },
              },
            ],
          }}
        />
        <BrandSprite />
        <MotionProvider>
          <Navbar />
          <main id="conteudo">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
