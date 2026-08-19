"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { 
  Sparkles, 
  Plus, 
  Minus, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  CheckCircle2,
  Droplets,
  ArrowRight
} from "lucide-react";
import { 
  STORY_THEMES, 
  BUNDLES, 
  BASE_PAGES, 
  EXTRA_PAGE_PRICE_AED, 
  FAQS, 
} from "@/data/products";
import { useStory } from "@/context/StoryContext";
import { generateWhatsAppOrderUrl } from "@/utils/whatsapp";

function ProductDetailContent() {
  const searchParams = useSearchParams();
  const themeParam = searchParams.get("theme");

  const { 
    selectedTheme, 
    setSelectedTheme, 
    selectedBundle, 
    setSelectedBundle, 
    selectedTemplate,
    extraPages, 
    setExtraPages,
    setIsTemplateModalOpen,
  } = useStory();

  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [selectedImgIndex, setSelectedImgIndex] = useState<number>(0);

  const galleryPhotos = [
    { src: "/images/photo-lisbon-yellow.png", label: "Cover & Spreads" },
    { src: "/images/photo-croatia-shell.png", label: "Hand-Bound Linen" },
    { src: "/images/photo-table-display.png", label: "Coffee Table Set" },
    { src: "/images/photo-girls-wine.png", label: "Everyday Moments" },
  ];

  const visualReviews = [
    {
      img: "/images/photo-table-display.png",
      name: "Thomas D.",
      time: "2 weeks ago",
      quote: "It's exactly what I had in mind, no bad surprises at all.",
    },
    {
      img: "/images/photo-girl-paris.png",
      name: "Sophie M.",
      time: "3 weeks ago",
      quote: "I loved it so much I already ordered one for a friend",
    },
    {
      img: "/images/photo-girls-wine.png",
      name: "Léa B.",
      time: "1 month ago",
      quote: "I was scared I wasn't creative enough but there are so many templates it's actually really easy",
    },
    {
      img: "/images/photo-croatia-shell.png",
      name: "Clara V.",
      time: "1 month ago",
      quote: "I had my doubts about the final print, but when it arrived I was completely satisfied",
    },
  ];

  useEffect(() => {
    if (themeParam) {
      const found = STORY_THEMES.find((t) => t.id === themeParam);
      if (found) {
        setSelectedTheme(found);
      }
    }
  }, [themeParam, setSelectedTheme]);

  const currentTheme = selectedTheme;
  const currentBundle = selectedBundle;

  const totalPages = BASE_PAGES + extraPages;
  const extraPrice = extraPages * EXTRA_PAGE_PRICE_AED;
  const totalPrice = currentBundle.price + extraPrice;

  // Generate direct WhatsApp link with instant quote
  const directWhatsAppUrl = generateWhatsAppOrderUrl({
    bundleName: currentBundle.name,
    themeName: currentTheme.name,
    templateName: selectedTemplate?.name,
    basePages: BASE_PAGES,
    extraPages,
    scentName: currentTheme.scent.name,
    photoCount: 0,
    minPhotos: 40,
    bookTitle: selectedTemplate?.name || currentTheme.name,
    bookSubtitle: `${currentTheme.name} Edition`,
    totalPriceAed: totalPrice,
  });

  return (
    <div className="bg-[#FFFFFF] text-[#2A2A2A] pt-24 pb-0">
      
      {/* 2-COLUMN SECTION: Sticky Image Gallery (Left) + Simple 3-Step Purchase Panel (Right) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#FFFFFF]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* 1. Image Gallery (Left Column - Sticky) */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 space-y-4">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-warm-md border border-[#E5DDD5] bg-[#FFFFFF]">
              <Image
                src={galleryPhotos[selectedImgIndex].src}
                alt={`${currentTheme.name} Photobook`}
                fill
                priority
                className="object-cover transition-all duration-500"
              />

              <div className="absolute top-4 left-4 bg-[#3D1117]/90 backdrop-blur-md text-[#FAF6F0] px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A769]" />
                <span>Heirloom Photobook + 75ml Scent Pairing</span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-3">
              {galleryPhotos.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImgIndex === idx ? "border-[#3D1117] shadow-sm scale-[1.02]" : "border-[#E5DDD5] opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={item.src} alt={item.label} fill className="object-cover" />
                  <span className="absolute bottom-1 left-1 right-1 text-[8px] sm:text-[9px] font-bold text-center bg-[#3D1117]/80 text-[#FAF6F0] py-0.5 rounded truncate">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Purchase Panel (Right Column - Simple 3-Step Flow: Cover -> Thickness -> WhatsApp Quote) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Rating badge & review count */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-[#FBBC05]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#3D1117]">4.9 (320+ Google Reviews)</span>
            </div>

            {/* Product Headline & Scent Note */}
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D1117] leading-tight">
                {currentTheme.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#2A2A2A]/80 mt-1">
                Paired with <strong>{currentTheme.scent.name}</strong> (75ml Eau de Parfum)
              </p>
            </div>

            {/* Price using #3D1117 */}
            <div className="flex items-baseline gap-3 pb-2 border-b border-[#E5DDD5]">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#3D1117]">
                {totalPrice.toLocaleString()} AED
              </span>
              {currentBundle.originalPrice && (
                <span className="text-sm text-[#2A2A2A]/50 line-through">
                  {(currentBundle.originalPrice + extraPrice).toLocaleString()} AED
                </span>
              )}
              <span className="text-xs font-bold text-[#3D1117] bg-[#F0E8DC] px-2.5 py-0.5 rounded-full ml-auto">
                {totalPages} Pages
              </span>
            </div>

            {/* CHOOSE COVER TEMPLATE */}
            <div className="space-y-2">
              <label className="block text-xs uppercase font-bold tracking-wider text-[#3D1117]">
                Cover Template
              </label>
              <button
                type="button"
                onClick={() => setIsTemplateModalOpen(true)}
                className="w-full p-3.5 rounded-2xl border-2 border-[#3D1117] bg-[#FFFFFF] hover:bg-[#FAF6F0] text-[#3D1117] transition-all flex items-center justify-between shadow-warm-sm group"
              >
                <div className="flex items-center gap-3">
                  {selectedTemplate ? (
                    <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-[#FAF6F0] border border-[#E5DDD5] shrink-0">
                      <Image
                        src={selectedTemplate.thumbnail}
                        alt={selectedTemplate.name}
                        fill
                        className="object-contain p-0.5"
                      />
                    </div>
                  ) : (
                    <div className="w-11 h-11 rounded-lg bg-[#FAF6F0] border border-[#E5DDD5] shrink-0 flex items-center justify-center text-[#3D1117]">
                      <LayoutGrid className="w-5 h-5 text-[#C9A769]" />
                    </div>
                  )}
                  <div className="text-left">
                    <span className="font-serif font-bold text-sm text-[#3D1117] block">
                      {selectedTemplate ? selectedTemplate.name : "Select Cover Template"}
                    </span>
                    <span className="text-[11px] text-[#2A2A2A]/70 block">
                      {selectedTemplate ? selectedTemplate.colorScheme : "Choose your cover layout & typography"}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#C9A769] font-sans group-hover:underline">
                  Select Cover →
                </span>
              </button>
            </div>

            {/* WHAT'S INCLUDED IN THE BUNDLE */}
            <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EAE3D9] space-y-2.5 text-xs text-[#2A2A2A]">
              <span className="font-serif font-bold text-xs uppercase tracking-wider text-[#3D1117] block">
                The Story + Scent Includes:
              </span>
              <ul className="space-y-1.5 text-[11px] text-[#2A2A2A]/80">
                <li className="flex items-center gap-2">
                  <span className="text-[#C9A769] font-bold">✓</span>
                  <span>1× Handcrafted 20-Page Hardcover Heirloom Book (21cm × 26cm)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#C9A769] font-bold">✓</span>
                  <span>1× 75ml Eau de Parfum Pairing ({currentTheme.scent.name})</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#C9A769] font-bold">✓</span>
                  <span>Archival 250gsm Textured Fine Art Paper (Lay-flat binding)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#C9A769] font-bold">✓</span>
                  <span>Digital Flip-Proof Review on WhatsApp before printing</span>
                </li>
              </ul>
            </div>

            {/* PRIMARY CTA: START MY DESIGN ORDER */}
            <div className="pt-2">
              <Link
                href={`/builder?theme=${currentTheme.id}&template=${selectedTemplate?.id || "tpl-1"}`}
                className="w-full py-4 px-6 rounded-full bg-[#3D1117] hover:bg-[#5C1A22] text-[#FAF6F0] font-bold text-sm tracking-wide flex items-center justify-center gap-3 shadow-warm-md transition-all duration-300 transform hover:-translate-y-0.5 text-center"
              >
                <span>Start My Design Order</span>
                <ArrowRight className="w-4 h-4 text-[#C9A769]" />
              </Link>
            </div>

            {/* Expandable Accordions: Exact Clean Hairline List Style from User Image */}
            <div className="border-t border-[#E5DDD5] divide-y divide-[#E5DDD5] mt-6">
              <div className="py-0">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === "phone" ? null : "phone")}
                  className="w-full py-4 text-left font-sans text-sm sm:text-[15px] font-medium text-[#2A2A2A] flex items-center justify-between hover:text-[#3D1117] transition-colors"
                >
                  <span>Is this made for my phone photos?</span>
                  <ChevronDown className={`w-4 h-4 text-[#888888] transition-transform duration-200 ${activeAccordion === "phone" ? "rotate-180 text-[#3D1117]" : ""}`} />
                </button>
                {activeAccordion === "phone" && (
                  <div className="pb-4 text-xs sm:text-sm text-[#2A2A2A]/80 leading-relaxed pt-0 animate-in fade-in duration-200">
                    Yes, absolutely. Our layout engine and 250gsm fine art printing are calibrated specifically for high-definition iPhone, Android, and WhatsApp photo exports.
                  </div>
                )}
              </div>

              <div className="py-0">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === "format" ? null : "format")}
                  className="w-full py-4 text-left font-sans text-sm sm:text-[15px] font-medium text-[#2A2A2A] flex items-center justify-between hover:text-[#3D1117] transition-colors"
                >
                  <span>Format & Paper</span>
                  <ChevronDown className={`w-4 h-4 text-[#888888] transition-transform duration-200 ${activeAccordion === "format" ? "rotate-180 text-[#3D1117]" : ""}`} />
                </button>
                {activeAccordion === "format" && (
                  <div className="pb-4 text-xs sm:text-sm text-[#2A2A2A]/80 leading-relaxed pt-0 space-y-1 animate-in fade-in duration-200">
                    <p>• <strong>Size:</strong> 21cm × 26cm Heirloom Hardcover</p>
                    <p>• <strong>Paper:</strong> 250gsm archival matte textured fine art paper</p>
                    <p>• <strong>Binding:</strong> Lay-flat hand-bound linen spine</p>
                    <p>• <strong>Pages:</strong> 20 base pages (expandable up to 80 pages)</p>
                    <p>• <strong>Scent Flacon:</strong> 75ml Eau de Parfum in bespoke glass bottle</p>
                  </div>
                )}
              </div>

              <div className="py-0 border-b border-[#E5DDD5]">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === "delivery" ? null : "delivery")}
                  className="w-full py-4 text-left font-sans text-sm sm:text-[15px] font-medium text-[#2A2A2A] flex items-center justify-between hover:text-[#3D1117] transition-colors"
                >
                  <span>Delivery & Returns</span>
                  <ChevronDown className={`w-4 h-4 text-[#888888] transition-transform duration-200 ${activeAccordion === "delivery" ? "rotate-180 text-[#3D1117]" : ""}`} />
                </button>
                {activeAccordion === "delivery" && (
                  <div className="pb-4 text-xs sm:text-sm text-[#2A2A2A]/80 leading-relaxed pt-0 animate-in fade-in duration-200">
                    Review your complete digital flip proof on WhatsApp before printing. Production takes 2–3 working days, delivered via temperature-controlled courier within 24–48 hours across UAE. 100% reprint guarantee if anything is damaged.
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. GOOGLE REVIEWS STRIP */}
      <section className="bg-[#FFFFFF] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
                Rated 4.9/5 on Google Reviews
              </h2>
              <div className="flex items-center text-[#FBBC05]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FBBC05] text-[#FBBC05]" />
                ))}
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <button className="w-9 h-9 rounded-full border border-[#D9D9D9] hover:bg-[#F2F2F2] flex items-center justify-center text-[#2A2A2A] shadow-sm">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="w-9 h-9 rounded-full border border-[#D9D9D9] hover:bg-[#F2F2F2] flex items-center justify-center text-[#2A2A2A] shadow-sm">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visualReviews.map((rev, i) => (
              <div key={i} className="bg-[#FAF6F0] rounded-2xl overflow-hidden border border-[#E5DDD5] shadow-warm-sm flex flex-col justify-between">
                <div className="relative aspect-square w-full bg-[#EAEAEA]">
                  <Image
                    src={rev.img}
                    alt={rev.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4 space-y-2 bg-[#FFFFFF] flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-[#FBBC05]">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#888888]">{rev.time}</span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-xs font-bold text-[#1A1A1A]">
                      <span>{rev.name}</span>
                      <span className="text-[10px] text-[#4285F4] font-medium flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3 text-[#34A853]" /> Google Verified
                      </span>
                    </div>

                    <p className="text-xs text-[#2A2A2A]/80 leading-relaxed mt-2 italic">
                      &quot;{rev.quote}&quot;
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. UGC CONTENT ROW (Real User Photos) */}
      <section className="py-16 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C9A769]">
                Community Stories
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D1117]">
                They say it better than we do
              </h2>
            </div>
            <a
              href="https://www.instagram.com/theestoryhousee/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#3D1117] font-semibold hover:underline"
            >
              @theestoryhousee
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-warm-sm border border-[#E5DDD5] group">
              <Image src="/images/photo-girl-paris.png" alt="Paris photobook" fill className="object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-xs font-serif italic">Paris & Morning Espresso</span>
              </div>
            </div>

            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-warm-sm border border-[#E5DDD5] group">
              <Image src="/images/photo-croatia-shell.png" alt="Croatia shell book" fill className="object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-xs font-serif italic">Croatia Spirit & Linen Hardcover</span>
              </div>
            </div>

            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-warm-sm border border-[#E5DDD5] group">
              <Image src="/images/photo-girls-wine.png" alt="Girls browsing books" fill className="object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-xs font-serif italic">Living Room Memories</span>
              </div>
            </div>

            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-warm-sm border border-[#E5DDD5] group">
              <Image src="/images/photo-table-display.png" alt="Table books set" fill className="object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-xs font-serif italic">Coffee Table Collection</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ ACCORDION */}
      <section id="faq" className="py-16 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C9A769]">
              Inquiries & Answers
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#3D1117]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = activeFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#FFFFFF] rounded-2xl overflow-hidden shadow-warm-sm"
                >
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left font-serif font-bold text-sm sm:text-base text-[#3D1117] flex items-center justify-between gap-4 hover:text-[#5C1A22]"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#C9A769]" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#2A2A2A]/80 leading-relaxed pt-1">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center font-serif text-lg text-[#3D1117]">Loading sensory pairing...</div>}>
      <ProductDetailContent />
    </Suspense>
  );
}
