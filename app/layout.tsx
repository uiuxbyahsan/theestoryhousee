import type { Metadata } from "next";
import { Playfair_Display, Arimo } from "next/font/google";
import "./globals.css";

// Arimo = metric-compatible with Helvetica/Arial (Section 4.1 fallback).
const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arimo",
  display: "swap",
});

// Playfair Display italic — accent word only.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Story House | Scent Your Story",
  description:
    "Custom photobooks paired with a signature scent, made for the story you never want to forget. Order on WhatsApp across the UAE.",
  openGraph: {
    title: "The Story House | Scent Your Story",
    description:
      "Custom photobooks paired with a signature scent, made for the story you never want to forget.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${arimo.variable} ${playfair.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
