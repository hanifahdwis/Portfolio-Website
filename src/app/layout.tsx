import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-src",
});

const label = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-label-src",
});

export const metadata: Metadata = {
  title: `${site.displayName} — Portfolio`,
  description: site.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${display.variable} ${label.variable}`}>
      <body className="bg-ink text-parchment antialiased">{children}</body>
    </html>
  );
}