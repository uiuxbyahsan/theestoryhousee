"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Check, 
  Star, 
  Camera, 
  Leaf, 
  CheckCircle, 
  Recycle, 
  PenTool,
  Instagram,
  Droplets,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Eye
} from "lucide-react";
import { useStory } from "@/context/StoryContext";
import { STORY_THEMES, StoryTheme } from "@/data/products";
import { ScentQuickViewModal } from "@/components/ScentQuickViewModal";

export default function HomePage() {
  const { setIsTemplateModalOpen } = useStory();
  const [quickViewTheme, setQuickViewTheme] = useState<StoryTheme | null>(null);
  const scentScrollRef = useRef<HTMLDivElement>(null);

  const handleScrollScent = (dir: "left" | "right") => {
    if (scentScrollRef.current) {
      const amount = dir === "left" ? -360 : 360;
      scentScrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#FAF6F0] text-[#2A2A2A] overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#2A0C10]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/photo-stack-deserve.png"
            alt="The Story House Photobooks"
            fill
            priority
            className="object-cover object-center brightness-[0.78] contrast-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3D1117]/75 via-[#3D1117]/35 to-[#3D1117]/50"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 pt-12">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FAF6F0] leading-[1.08] drop-shadow-md">
            Life is all about <br />
            <span className="italic font-normal text-[#E8C896]">
              creating memories.
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-[#FAF6F0]/90 max-w-xl mx-auto font-normal leading-relaxed">
            Custom heirloom photobooks paired with a signature scent created for your story.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/product"
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#3D1117] hover:bg-[#5C1A22] text-[#FAF6F0] font-sans font-semibold text-[15px] tracking-wide uppercase border border-[#C9A769]/50 shadow-warm-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              <span>Create my photobook</span>
              <ArrowRight className="w-4 h-4 text-[#C9A769]" />
            </Link>

            <Link
              href="/product"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FAF6F0]/15 hover:bg-[#FAF6F0]/25 backdrop-blur-sm text-[#FAF6F0] font-sans font-medium text-[15px] tracking-wide border border-[#FAF6F0]/30 transition-all text-center"
            >
              Explore Photo Books
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SECTION AFTER HERO: "In a world of digital Memories deserve better." */}
      <section className="py-20 lg:py-28 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          {/* Google Reviews header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FAF6F0] border border-[#E5DDD5] shadow-xs">
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                ))}
              </div>
              <span className="font-sans text-xs font-semibold tracking-wide text-[#2A2A2A]">
                4.9 ★ Google Reviews
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2A2A2A] tracking-tight leading-tight">
              In a world of digital <br />
              <span className="text-[#3D1117]">Memories deserve better.</span>
            </h2>
          </div>

          {/* 4 Side-by-Side Book Mockups using authentic 3D renders */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-4">
            
            {/* 1: COUPLE (amor.) */}
            <Link
              href="/product"
              className="group cursor-pointer space-y-4 flex flex-col items-center"
            >
              <div className="relative w-full aspect-[3/4] rounded-xl shadow-warm-md group-hover:shadow-warm-lg transition-all duration-300 transform group-hover:-translate-y-2 bg-[#FAF6F0] border border-[#E8D6D2] overflow-hidden flex items-center justify-center p-3">
                <Image
                  src="/images/Amor_Mitte.webp"
                  alt="amor. Couple Photobook"
                  fill
                  className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="font-sans text-xs sm:text-sm font-bold tracking-widest text-[#2A2A2A] uppercase group-hover:text-[#3D1117] transition-colors">
                COUPLE
              </span>
            </Link>

            {/* 2: TRAVEL (IBIZA) */}
            <Link
              href="/product"
              className="group cursor-pointer space-y-4 flex flex-col items-center"
            >
              <div className="relative w-full aspect-[3/4] rounded-xl shadow-warm-md group-hover:shadow-warm-lg transition-all duration-300 transform group-hover:-translate-y-2 bg-[#E62B2B] overflow-hidden flex flex-col justify-between p-4 sm:p-6 text-center">
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/25 to-transparent"></div>
                <div className="relative z-10">
                  <span className="font-sans font-black text-2xl sm:text-3xl tracking-tight text-[#FFDE59] uppercase block leading-none">
                    IBIZA
                  </span>
                </div>
                <div className="my-auto py-2">
                  <div className="text-4xl sm:text-5xl">🍒</div>
                </div>
                <span className="text-[10px] text-white/80 font-mono tracking-widest">
                  2025
                </span>
              </div>
              <span className="font-sans text-xs sm:text-sm font-bold tracking-widest text-[#2A2A2A] uppercase group-hover:text-[#3D1117] transition-colors">
                TRAVEL
              </span>
            </Link>

            {/* 3: ANNIVERSARY (ONE YEAR WITH YOU) */}
            <Link
              href="/product"
              className="group cursor-pointer space-y-4 flex flex-col items-center"
            >
              <div className="relative w-full aspect-[3/4] rounded-xl shadow-warm-md group-hover:shadow-warm-lg transition-all duration-300 transform group-hover:-translate-y-2 bg-[#EBE7E0] border border-[#DDD5CA] overflow-hidden flex flex-col justify-between p-5 text-center">
                <div className="absolute left-0 top-0 bottom-0 w-3.5 bg-gradient-to-r from-black/20 to-transparent"></div>
                <div className="my-auto space-y-2">
                  <span className="font-serif text-3xl text-[#C9A769] block">💍</span>
                  <span className="font-serif font-bold text-base sm:text-lg leading-snug uppercase text-[#2A2A2A] block tracking-wide">
                    ONE YEAR WITH YOU
                  </span>
                  <span className="font-sans text-[11px] text-[#2A2A2A]/60 block uppercase tracking-widest">
                    Vol. I • 2025
                  </span>
                </div>
                <span className="text-[10px] text-[#2A2A2A]/40 font-mono tracking-widest">
                  HEIRLOOM EDITION
                </span>
              </div>
              <span className="font-sans text-xs sm:text-sm font-bold tracking-widest text-[#2A2A2A] uppercase group-hover:text-[#3D1117] transition-colors">
                ANNIVERSARY
              </span>
            </Link>

            {/* 4: FRIENDS (pics we can never post) */}
            <Link
              href="/product"
              className="group cursor-pointer space-y-4 flex flex-col items-center"
            >
              <div className="relative w-full aspect-[3/4] rounded-xl shadow-warm-md group-hover:shadow-warm-lg transition-all duration-300 transform group-hover:-translate-y-2 bg-[#FAF6F0] border border-[#E5DDD5] overflow-hidden flex items-center justify-center p-3">
                <Image
                  src="/images/Pics_We_Can_Never_Post.webp"
                  alt="pics we can never post Friends Photobook"
                  fill
                  className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="font-sans text-xs sm:text-sm font-bold tracking-widest text-[#2A2A2A] uppercase group-hover:text-[#3D1117] transition-colors">
                FRIENDS
              </span>
            </Link>

          </div>

          {/* Explore Categories Button (Brown #3D1117) */}
          <div className="pt-4 text-center">
            <Link
              href="/product"
              className="px-8 py-3.5 rounded-full border-2 border-[#3D1117] bg-[#FFFFFF] hover:bg-[#3D1117] hover:text-[#FAF6F0] text-[#3D1117] font-sans font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 inline-flex items-center gap-2 shadow-sm"
            >
              <span>Explore categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 3. CO-FOUNDER QUOTE SECTION (Top border removed per user request) */}
      <section id="story" className="py-20 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6">
              <div className="relative aspect-[3/4] sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-warm-md border border-[#E5DDD5]">
                <Image
                  src="/images/photo-table-display.png"
                  alt="Memories are meant to be held - The Story House"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl italic font-bold text-[#2A2A2A] leading-tight">
                &ldquo;Memories are meant to be held, not scrolled.&rdquo;
              </h2>

              <p className="font-sans font-bold text-sm text-[#2A2A2A]">
                Neha - Co founder
              </p>

              <div className="space-y-4 pt-2 text-xs sm:text-sm text-[#2A2A2A]">
                <div className="flex items-start gap-3">
                  <Camera className="w-5 h-5 text-[#2A2A2A] shrink-0 mt-0.5" />
                  <span className="font-sans font-medium">Made perfect for phone pictures</span>
                </div>
                <div className="flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-[#2A2A2A] shrink-0 mt-0.5" />
                  <span className="font-sans font-medium">Print quality guarantee or we reprint it directly</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2A2A2A] shrink-0 mt-0.5" />
                  <span className="font-sans font-medium">Eco-friendly printing at the facility closest to you — one of 32 worldwide</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. 3-STEP SECTION: "Your photobooks created in 3 steps (and 3min)" */}
      <section className="py-20 lg:py-28 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          
          <div className="space-y-3">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2A2A2A] tracking-tight">
              Your photobooks created in 3 steps (and 3min)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            
            {/* Step 1: Group_10496.webp */}
            <div className="space-y-6 flex flex-col items-center">
              <div className="relative w-52 h-44 flex items-center justify-center">
                <Image
                  src="/images/Group_10496.webp"
                  alt="1/ Choose your template"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#2A2A2A]">
                  1/ Choose your template
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#2A2A2A]/70 max-w-xs mx-auto leading-relaxed">
                  Pick the destination or milestone you visited
                </p>
              </div>
            </div>

            {/* Step 2: ii2.webp */}
            <div className="space-y-6 flex flex-col items-center">
              <div className="relative w-52 h-44 flex items-center justify-center">
                <Image
                  src="/images/ii2.webp"
                  alt="2/ Add your photos"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#2A2A2A]">
                  2/ Add your photos
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#2A2A2A]/70 max-w-xs mx-auto leading-relaxed">
                  We lay out and organize everything automatically
                </p>
              </div>
            </div>

            {/* Step 3: 7.webp */}
            <div className="space-y-6 flex flex-col items-center">
              <div className="relative w-52 h-44 flex items-center justify-center">
                <Image
                  src="/images/7.webp"
                  alt="3/ We take care of the rest"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#2A2A2A]">
                  3/ We take care of the rest
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#2A2A2A]/70 max-w-xs mx-auto leading-relaxed">
                  Fast, premium printing and doorstep delivery
                </p>
              </div>
            </div>

          </div>

          <div className="pt-4">
            <Link
              href="/product"
              className="inline-block px-10 py-4 rounded-full bg-[#3D1117] hover:bg-[#5C1A22] text-[#FAF6F0] font-sans font-bold text-sm uppercase tracking-wider shadow-warm-md transition-all duration-300 transform hover:-translate-y-1"
            >
              Create my photobook
            </Link>
          </div>

        </div>
      </section>

      {/* 5. CRAFTSMANSHIP SENSORY SECTION */}
      <section className="py-20 lg:py-28 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#3D1117] tracking-tight">
                Hold your story. <br />
                <span className="italic font-normal text-[#C9A769]">
                  Smell the memory.
                </span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#2A2A2A]/80 leading-relaxed font-normal">
                Every memory book is custom handcrafted with heavy 250gsm fine art pages and paired with an artisanal 75ml Eau de Parfum created specifically for that journey.
              </p>
              <div className="pt-2">
                <Link
                  href="/product"
                  className="inline-flex items-center gap-2 text-xs uppercase font-bold text-[#3D1117] tracking-wider hover:text-[#C9A769] transition-colors"
                >
                  <span>Explore the Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-warm-lg border border-[#E5DDD5]">
                <Image
                  src="/images/craftsmanship-ritual.jpg"
                  alt="Fine Art Photobook Craftsmanship"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5.5 SENSORY FRAGRANCE PAIRINGS SHOWCASE SECTION (4-Column Smooth Carousel) */}
      <section id="scents" className="py-20 lg:py-28 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header with Navigation Arrows */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
                Popular Perfumes
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#2A2A2A]/75 leading-relaxed">
                Custom photobooks paired with a signature 75ml perfume crafted for your story.
              </p>
            </div>

            {/* Carousel Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScrollScent("left")}
                className="w-10 h-10 rounded-full border border-[#E5DDD5] hover:bg-[#FAF6F0] flex items-center justify-center text-[#2A2A2A] shadow-xs transition-colors"
                aria-label="Previous perfume"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScrollScent("right")}
                className="w-10 h-10 rounded-full border border-[#E5DDD5] hover:bg-[#FAF6F0] flex items-center justify-center text-[#2A2A2A] shadow-xs transition-colors"
                aria-label="Next perfume"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scent Carousel: 4 Visible Cards on Desktop / Smooth Side Scroll */}
          <div
            ref={scentScrollRef}
            className="flex items-stretch gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pt-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {STORY_THEMES.map((theme) => (
              <div
                key={theme.id}
                className="snap-start shrink-0 w-[280px] sm:w-[320px] lg:w-[calc(25%-18px)] group bg-[#F4F2EE] rounded-2xl overflow-hidden p-0 flex flex-col justify-between hover:shadow-warm-md transition-all duration-300 border border-[#E5DDD5]/80 hover:border-[#3D1117]/30"
              >
                {/* Full-Bleed Perfume Bottle Image (No Padding) + Hover Quick View */}
                <div className="relative aspect-square w-full overflow-hidden bg-white/40">
                  <Image
                    src={theme.scent.image}
                    alt={theme.scent.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Hover Overlay with Quick View Button */}
                  <div className="absolute inset-0 bg-[#2A0C10]/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                    <button
                      type="button"
                      onClick={() => setQuickViewTheme(theme)}
                      className="px-4 py-2.5 rounded-full bg-white/95 hover:bg-white text-[#1A1A1A] font-sans font-semibold text-xs tracking-wider uppercase shadow-warm-md flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 cursor-pointer hover:scale-105"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#3D1117]" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Bottom Row: Info on Left + Button on Right */}
                <div className="p-4 sm:p-5 flex items-end justify-between gap-2 border-t border-[#E5DDD5]/60 bg-[#F4F2EE]">
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-[#888888] tracking-wider block truncate">
                      FOR {theme.category.toUpperCase()} • 75 ML
                    </span>
                    <h3 className="font-sans font-bold text-xs sm:text-[13px] text-[#1A1A1A] tracking-wide uppercase truncate">
                      {theme.scent.name}
                    </h3>
                  </div>

                  <Link
                    href="/product"
                    className="shrink-0 px-3.5 py-2 rounded-lg bg-[#FFFFFF] hover:bg-[#3D1117] hover:text-[#FAF6F0] text-[#1A1A1A] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-xs transition-all duration-200 border border-[#E5DDD5] hover:border-[#3D1117] text-center whitespace-nowrap"
                  >
                    PAIR SCENT
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. QUALITY MATTERS SECTION (All headings Cormorant) */}
      <section className="py-20 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-warm-md border border-[#E5DDD5]">
              <Image
                src="/images/photo-croatia-shell.png"
                alt="Quality matters"
                fill
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A2A2A] tracking-tight">
                Quality matters.
              </h2>

              <p className="font-sans text-xs sm:text-sm text-[#2A2A2A]/80 leading-relaxed font-normal">
                We create beautiful products that make a difference in people&apos;s lives.
              </p>

              <div className="space-y-5 pt-2 text-xs sm:text-sm text-[#2A2A2A]">
                <div className="flex items-start gap-3.5">
                  <Camera className="w-5 h-5 text-[#2A2A2A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-serif block font-bold text-base text-[#2A2A2A]">Clear pictures, even with phone</strong>
                    <span className="font-sans text-[#2A2A2A]/70">Your photos, printed in premium quality. Sharp. Bright. Beautiful.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Recycle className="w-5 h-5 text-[#2A2A2A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-serif block font-bold text-base text-[#2A2A2A]">Locally printed</strong>
                    <span className="font-sans text-[#2A2A2A]/70">We print your album locally, with love and high-quality materials. Better for the earth, faster for you, perfect for your stories.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <PenTool className="w-5 h-5 text-[#2A2A2A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-serif block font-bold text-base text-[#2A2A2A]">Hand-made designs, crafted by real artists</strong>
                    <span className="font-sans text-[#2A2A2A]/70">Our albums don&apos;t come from templates. Each cover is drawn, designed, and inspired by real places, cultures, and feelings.</span>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  href="/product"
                  className="inline-block px-10 py-4 rounded-full bg-[#3D1117] hover:bg-[#5C1A22] text-[#FAF6F0] font-sans font-bold text-sm uppercase tracking-wider shadow-warm-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  Create my photobook
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 7. 3-COLUMN TRUST & SERVICE STRIP (Clean floating icons, no icon border boxes) */}
      <section className="py-20 bg-[#3D1117] text-[#FAF6F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            
            {/* 1: Fast Shipping */}
            <div className="space-y-4 px-4 flex flex-col items-center">
              <div className="text-[#E8C896] flex items-center justify-center">
                <svg className="w-9 h-9 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V15m0 0H3.375" />
                </svg>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#FAF6F0]">
                Fast shipping
              </h3>
              <p className="font-sans text-xs sm:text-[13px] text-[#FAF6F0]/85 leading-relaxed max-w-xs mx-auto font-normal">
                Get your photobooks delivered quickly and efficiently. We ensure prompt delivery so you can enjoy your memories without delay.
              </p>
            </div>

            {/* 2: 100% Satisfaction Guarantee */}
            <div className="space-y-4 px-4 flex flex-col items-center">
              <div className="text-[#E8C896] flex items-center justify-center">
                <svg className="w-9 h-9 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#FAF6F0]">
                100% satisfaction guarantee
              </h3>
              <p className="font-sans text-xs sm:text-[13px] text-[#FAF6F0]/85 leading-relaxed max-w-xs mx-auto font-normal">
                We stand by the quality of our photobooks. If you’re not completely satisfied, we’ll make it right with our satisfaction guarantee.
              </p>
            </div>

            {/* 3: 100,000+ Happy Customers */}
            <div className="space-y-4 px-4 flex flex-col items-center">
              <div className="text-[#E8C896] flex items-center justify-center">
                <svg className="w-9 h-9 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#FAF6F0]">
                100,000+ happy customers
              </h3>
              <p className="font-sans text-xs sm:text-[13px] text-[#FAF6F0]/85 leading-relaxed max-w-xs mx-auto font-normal">
                Join our community of satisfied customers who have preserved their adventures with us. Your memories are in good hands.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 8. INSTAGRAM / COMMUNITY SECTION ABOVE FOOTER */}
      <section className="py-16 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Instagram className="w-5 h-5 text-[#3D1117]" />
              <span className="font-serif font-bold text-lg text-[#3D1117]">@theestoryhousee</span>
            </div>
            <a
              href="https://www.instagram.com/theestoryhousee/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs font-semibold text-[#3D1117] hover:underline"
            >
              Follow on Instagram →
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm">
              <Image src="/images/photo-girl-paris.png" alt="Community 1" fill className="object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm">
              <Image src="/images/photo-girls-wine.png" alt="Community 2" fill className="object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm">
              <Image src="/images/photo-lisbon-yellow.png" alt="Community 3" fill className="object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm">
              <Image src="/images/photo-table-display.png" alt="Community 4" fill className="object-cover hover:scale-105 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Scent Quick View Modal */}
      <ScentQuickViewModal 
        theme={quickViewTheme} 
        onClose={() => setQuickViewTheme(null)} 
      />

    </div>
  );
}
