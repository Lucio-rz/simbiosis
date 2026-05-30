import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = 'https://simbiosis-woad.vercel.app'; // ← cambiá por tu URL real de Vercel

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "SIMBIOSIS - Marketplace de Materiales Reciclados",
    template: "%s | SIMBIOSIS",
  },
  description:
    "Comprá y vendé materiales sobrantes: madera, vidrio, plástico, metal y más. Marketplace de economía circular para empresas, talleres y emprendedores de Argentina.",
  keywords: [
    "materiales sobrantes", "reciclaje industrial", "economía circular",
    "compra venta materiales", "madera reciclada", "plástico", "vidrio",
    "marketplace materiales", "sobrantes fábrica", "Bahía Blanca",
  ],
  authors: [{ name: "SIMBIOSIS" }],
  creator: "SIMBIOSIS",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: BASE_URL,
    siteName: "SIMBIOSIS",
    title: "SIMBIOSIS - Marketplace de Materiales Reciclados",
    description:
      "Comprá y vendé materiales sobrantes. Conectamos empresas, talleres y emprendedores para dar nueva vida a los materiales.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SIMBIOSIS Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SIMBIOSIS - Marketplace de Materiales Reciclados",
    description: "Comprá y vendé materiales sobrantes. Economía circular.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: '1aNCz3wE0Escj6ftI9nvR7gFDZwF7VZjkazkCo4xOmY',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>{children}</body>
    </html>
  );
}
