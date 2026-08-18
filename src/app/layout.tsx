import type { Metadata, Viewport } from "next";
import { Lexend, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const title = "EnBandeja — El casino escolar, en un solo lugar.";
const description =
  "Pedidos, pagos, cocina y entregas conectados en una plataforma configurada a tu operación. Software especializado para casinos escolares y concesionarias.";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EnBandeja",
  description:
    "Plataforma especializada para casinos escolares y concesionarias: pedidos, pagos, cocina y entregas conectados en una plataforma configurada a tu operación.",
  ...(siteUrl ? { url: siteUrl, logo: `${siteUrl}/icon.svg` } : {}),
};

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "es_CL",
    siteName: "EnBandeja",
    images: [{ url: "/assets/open-graph.png", width: 1200, height: 630, alt: "EnBandeja: el casino escolar, en un solo lugar" }],
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/open-graph.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#17385f",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${lexend.variable} ${sourceSans.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
