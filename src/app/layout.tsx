import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import "./globals.css";
import { StoryProvider } from "@/context/StoryContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { BespokeScentModal } from "@/components/BespokeScentModal";
import { TemplateSelectionModal } from "@/components/TemplateSelectionModal";
import { DesignOrderDrawer } from "@/components/DesignOrderDrawer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thestoryhouse.ae"),
  title: "The Story House — Sensory Photobooks Paired with Signature Scent",
  description:
    "The Story House turns your memories into something you can hold, read, and smell again. Custom heirloom photobooks on 250gsm archival paper paired with artisanal 75ml Eau de Parfum created for your story.",
  keywords: [
    "custom photobook UAE",
    "sensory memory book",
    "perfume photobook pairing",
    "Dubai luxury gift",
    "wedding keepsake book",
    "travel photobook Dubai",
    "The Story House"
  ],
  openGraph: {
    title: "The Story House — Stories to read. Journeys to remember. Scents to keep.",
    description: "Custom photobooks paired with signature perfumes tied to the story being documented.",
    images: [{ url: "/images/hero-sensory-pairing.jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${cormorant.variable} ${poppins.variable}`}>
      <body className="bg-[#FAF6F0] text-[#2A2A2A] font-sans min-h-screen flex flex-col antialiased selection:bg-[#E8C896] selection:text-[#3D1117]">
        <StoryProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <BespokeScentModal />
          <TemplateSelectionModal />
          <DesignOrderDrawer />
        </StoryProvider>
      </body>
    </html>
  );
}
