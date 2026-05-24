import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIMBIOSIS - Marketplace de Materiales",
  description: "Comprá y vendé materiales sobrantes. Economía circular.",
  keywords: ["materiales", "reciclaje", "economía circular", "marketplace", "sobrantes"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>{children}</body>
    </html>
  );
}
