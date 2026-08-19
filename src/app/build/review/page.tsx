"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Pencil, 
  Send, 
  Copy, 
  CheckCircle2, 
  ExternalLink, 
  Droplets, 
  BookOpen, 
  Sparkles,
  ArrowLeft,
  User,
  MapPin,
  Camera
} from "lucide-react";
import { useStory } from "@/context/StoryContext";
import { BASE_PAGES, MIN_PHOTOS_REQUIRED, WHATSAPP_NUMBER } from "@/data/products";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export default function BuildReviewPage() {
  const router = useRouter();
  const {
    selectedTheme,
    selectedTemplate,
    selectedScentName,
    hasScent,
    extraPages,
    photos,
    bookTitle,
    dedication,
    customerName,
    deliveryArea,
    totalPriceAed,
  } = useStory();

  const [isSent, setIsSent] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const productName = selectedTemplate?.name || selectedTheme.name;
  const totalPages = BASE_PAGES + extraPages;

  // Construct structured WhatsApp message strictly following prompt format
  const constructWhatsAppMessage = () => {
    const bundleName = hasScent ? "The Story + Scent" : "The Story (Photobook Only)";
    const templateName = selectedTemplate?.name || "Bespoke Cover Template";
    const pageDetails = extraPages > 0 
      ? `${BASE_PAGES} + ${extraPages} extra (${totalPages} total)` 
      : `${BASE_PAGES}`;

    const lines = [
      `Hi The Story House! 👋 I'd like to order:`,
      ``,
      `Bundle: ${bundleName}`,
      `Theme: ${selectedTheme.name}`,
      `Template: ${templateName}`,
      `Pages: ${pageDetails}`,
    ];

    if (hasScent) {
      lines.push(`Scent: ${selectedScentName}`);
    }

    lines.push(
      `Photos uploaded: ${photos.length}/${MIN_PHOTOS_REQUIRED}`,
      `Book title: ${bookTitle || productName}`,
    );

    if (dedication && dedication.trim()) {
      lines.push(`Dedication: ${dedication.trim()}`);
    }

    lines.push(
      ``,
      `Name: ${customerName.trim() || "Friend"}`,
      `Delivery area: ${deliveryArea}`,
      ``,
      `Total Price: ${totalPriceAed.toLocaleString()} AED`,
      ``,
      `Thank you!`
    );

    return lines.join("\n");
  };

  const handleSendToWhatsApp = () => {
    const message = constructWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

    // Track conversion analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "whatsapp_order_initiated", {
        theme: selectedTheme.name,
        price: totalPriceAed,
        photos: photos.length,
      });
    }

    window.open(url, "_blank");
    setIsSent(true);
  };

  const handleCopyMessage = () => {
    const message = constructWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const whatsappMessage = constructWhatsAppMessage();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3D1117] tracking-tight">
          Review Your Story
        </h1>
        <p className="text-sm sm:text-base text-[#2A2A2A]/75 max-w-2xl leading-relaxed">
          Everything look good? Let&apos;s send it to WhatsApp
        </p>
      </div>

      {!isSent ? (
        /* Receipt-Style Summary Card */
        <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5DDD5] p-6 sm:p-10 space-y-6 shadow-warm-md divide-y divide-[#E5DDD5]">
          
          {/* 1. Cover & Template Row */}
          <div className="flex items-center justify-between pb-5">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FAF6F0] border border-[#E5DDD5] overflow-hidden shrink-0 shadow-xs">
                <Image
                  src={selectedTemplate?.thumbnail || "/images/photo-table-display.png"}
                  alt={productName}
                  fill
                  className="object-contain p-1.5"
                />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888] block">
                  Cover Template & Theme
                </span>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#3D1117]">
                  {productName}
                </h3>
                <span className="text-xs text-[#2A2A2A]/70 block">
                  Theme: {selectedTheme.name} ({selectedTheme.category})
                </span>
              </div>
            </div>

            <Link
              href="/product"
              className="p-2.5 rounded-xl border border-[#E5DDD5] bg-[#FAF6F0] hover:bg-[#FFFFFF] text-[#3D1117] flex items-center gap-1.5 text-xs font-semibold shadow-2xs transition-all hover:scale-105"
              title="Edit Cover Template"
            >
              <Pencil className="w-3.5 h-3.5 text-[#C9A769]" />
              <span className="hidden sm:inline">Edit</span>
            </Link>
          </div>

          {/* 2. Scent Row */}
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] border border-[#E5DDD5] text-[#3D1117] flex items-center justify-center shrink-0">
                <Droplets className="w-6 h-6 text-[#C9A769]" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888] block">
                  Paired Scent
                </span>
                <span className="font-serif font-bold text-base sm:text-lg text-[#3D1117] block">
                  {hasScent ? selectedScentName : "No Scent Added"}
                </span>
                <span className="text-xs text-[#2A2A2A]/70 block">
                  {hasScent ? "75ml Artisanal Eau de Parfum Flacon" : "Photobook Only (Saved 170 AED)"}
                </span>
              </div>
            </div>

            <Link
              href="/build/scent"
              className="p-2.5 rounded-xl border border-[#E5DDD5] bg-[#FAF6F0] hover:bg-[#FFFFFF] text-[#3D1117] flex items-center gap-1.5 text-xs font-semibold shadow-2xs transition-all hover:scale-105"
              title="Edit Scent"
            >
              <Pencil className="w-3.5 h-3.5 text-[#C9A769]" />
              <span className="hidden sm:inline">Edit</span>
            </Link>
          </div>

          {/* 3. Pages Row */}
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] border border-[#E5DDD5] text-[#3D1117] flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-[#C9A769]" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888] block">
                  Book Specifications
                </span>
                <span className="font-serif font-bold text-base sm:text-lg text-[#3D1117] block">
                  {totalPages} Pages {extraPages > 0 ? `(${BASE_PAGES} base + ${extraPages} extra)` : ""}
                </span>
                <span className="text-xs text-[#2A2A2A]/70 block">
                  250gsm Fine Art Archival Matte Paper • 180° Lay-Flat
                </span>
              </div>
            </div>

            <Link
              href="/build/pages"
              className="p-2.5 rounded-xl border border-[#E5DDD5] bg-[#FAF6F0] hover:bg-[#FFFFFF] text-[#3D1117] flex items-center gap-1.5 text-xs font-semibold shadow-2xs transition-all hover:scale-105"
              title="Edit Pages"
            >
              <Pencil className="w-3.5 h-3.5 text-[#C9A769]" />
              <span className="hidden sm:inline">Edit</span>
            </Link>
          </div>

          {/* 4. Photos Row */}
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] border border-[#E5DDD5] text-[#3D1117] flex items-center justify-center shrink-0">
                <Camera className="w-6 h-6 text-[#C9A769]" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888] block">
                  Photo Curation
                </span>
                <span className="font-serif font-bold text-base sm:text-lg text-[#3D1117] block">
                  {photos.length} High-Definition Photos Ready
                </span>
                <span className="text-xs text-emerald-700 font-semibold block">
                  ✓ Heirloom minimum fulfilled
                </span>
              </div>
            </div>

            <Link
              href="/build/photos"
              className="p-2.5 rounded-xl border border-[#E5DDD5] bg-[#FAF6F0] hover:bg-[#FFFFFF] text-[#3D1117] flex items-center gap-1.5 text-xs font-semibold shadow-2xs transition-all hover:scale-105"
              title="Edit Photos"
            >
              <Pencil className="w-3.5 h-3.5 text-[#C9A769]" />
              <span className="hidden sm:inline">Edit</span>
            </Link>
          </div>

          {/* 5. Personalization & Delivery Row */}
          <div className="flex items-center justify-between py-5">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888] block">
                Personalization & Destination
              </span>
              <span className="font-serif font-bold text-base sm:text-lg text-[#3D1117] block">
                &ldquo;{bookTitle || productName}&rdquo;
              </span>
              {dedication && (
                <p className="text-xs text-[#2A2A2A]/75 italic max-w-md">
                  &ldquo;{dedication}&rdquo;
                </p>
              )}
              <span className="text-xs font-medium text-[#3D1117] block pt-1">
                Recipient: <strong>{customerName || "Friend"}</strong> • Delivery: <strong>{deliveryArea}</strong>
              </span>
            </div>

            <Link
              href="/build/personalize"
              className="p-2.5 rounded-xl border border-[#E5DDD5] bg-[#FAF6F0] hover:bg-[#FFFFFF] text-[#3D1117] flex items-center gap-1.5 text-xs font-semibold shadow-2xs transition-all hover:scale-105"
              title="Edit Personalization"
            >
              <Pencil className="w-3.5 h-3.5 text-[#C9A769]" />
              <span className="hidden sm:inline">Edit</span>
            </Link>
          </div>

          {/* 6. Grand Investment Total */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#888888] block">
                TOTAL
              </span>
              <span className="text-xs text-emerald-700 font-semibold block mt-0.5">
                Free UAE temperature-controlled delivery included
              </span>
            </div>

            <div className="text-center sm:text-right">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-[#3D1117] block leading-none">
                {totalPriceAed.toLocaleString()} AED
              </span>
              <span className="text-[11px] text-[#888888] block mt-1">
                Digital Flip-Proof Approval on WhatsApp prior to printing
              </span>
            </div>
          </div>

        </div>
      ) : (
        /* Immediate Lightweight Hand-off Confirmation Screen */
        <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5DDD5] p-8 sm:p-14 text-center space-y-6 shadow-warm-md max-w-xl mx-auto animate-in fade-in duration-300">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-10 h-10 text-emerald-700" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif font-bold text-3xl text-[#3D1117]">
              Connecting to WhatsApp Atelier...
            </h2>
            <p className="text-sm text-[#2A2A2A]/80 leading-relaxed max-w-md mx-auto">
              Your story order is on its way. Continue the conversation on WhatsApp to review your digital flip-proof before printing.
            </p>
          </div>

          {/* Fallback Box */}
          <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#E5DDD5] space-y-4 text-left">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="font-semibold text-[#3D1117]">Atelier WhatsApp:</span>
              <span className="font-mono font-bold text-[#2A2A2A]">+971 50 000 0000</span>
            </div>

            <p className="text-[11px] text-[#888888] leading-tight">
              If WhatsApp didn&apos;t open automatically, tap below to open manually or copy your prefilled order message:
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleCopyMessage}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl border border-[#E5DDD5] bg-[#FFFFFF] hover:bg-[#FAF6F0] text-xs font-bold text-[#3D1117] flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <Copy className="w-4 h-4 text-[#C9A769]" />
                <span>{copiedMessage ? "Copied Message! ✓" : "Copy Message"}</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/product"
              className="text-xs text-[#2A2A2A]/60 hover:text-[#3D1117] font-medium underline"
            >
              ← Return to Product Page
            </Link>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* PERSISTENT BOTTOM ACTION BAR */}
      {/* ============================================================ */}
      {!isSent && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-t border-[#E5DDD5] px-4 sm:px-8 py-4 shadow-warm-lg">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <Link
              href="/build/personalize"
              className="w-full sm:w-auto px-5 py-3 rounded-full border border-[#E5DDD5] bg-[#FFFFFF] hover:bg-[#FAF6F0] text-[#3D1117] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors order-2 sm:order-1"
            >
              <ArrowLeft className="w-4 h-4 text-[#C9A769]" />
              <span>Back</span>
            </Link>

            <div className="w-full sm:w-auto flex-1 flex flex-col items-center sm:items-end gap-1.5 order-1 sm:order-2">
              <button
                type="button"
                onClick={handleSendToWhatsApp}
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-3 shadow-warm-md transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>Send My Story to WhatsApp</span>
              </button>

              <span className="text-[11px] text-[#888888] text-center sm:text-right font-normal">
                You&apos;ll be redirected to WhatsApp to confirm your order — no payment happens here.
              </span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
