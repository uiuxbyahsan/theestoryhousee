"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  Minus, 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Layers,
  ShieldCheck
} from "lucide-react";
import { useStory } from "@/context/StoryContext";
import { BASE_PAGES, EXTRA_PAGE_PRICE_AED } from "@/data/products";

export default function BuildPagesPage() {
  const router = useRouter();
  const { extraPages, setExtraPages, selectedTheme } = useStory();

  const totalPages = BASE_PAGES + extraPages;
  const extraCost = extraPages * EXTRA_PAGE_PRICE_AED;

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3D1117] tracking-tight">
          Pages & Format
        </h1>
        <p className="text-sm sm:text-base text-[#2A2A2A]/75 max-w-2xl leading-relaxed">
          Your book includes {BASE_PAGES} pages — add more if your story needs the space
        </p>
      </div>

      {/* Pages Configuration Card */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5DDD5] p-6 sm:p-10 space-y-6 shadow-warm-md">
        
        {/* Stepper (+ / -) to Add Extra Pages */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-[#FAF6F0] border border-[#E5DDD5]">
          <div className="space-y-1 text-center md:text-left">
            <span className="font-serif font-bold text-lg sm:text-xl text-[#3D1117] block">
              Expand Page Capacity
            </span>
            <p className="text-xs sm:text-sm text-[#2A2A2A]/75 leading-relaxed max-w-md">
              Add extra spreads for more moments. Each page is printed on archival 250gsm fine art paper (+{EXTRA_PAGE_PRICE_AED} AED / page).
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#FFFFFF] p-2.5 rounded-2xl border border-[#E5DDD5] shadow-xs">
            <button
              type="button"
              onClick={() => setExtraPages(Math.max(0, extraPages - 2))}
              disabled={extraPages === 0}
              className={`w-12 h-12 rounded-xl border border-[#E5DDD5] flex items-center justify-center transition-all ${
                extraPages === 0
                  ? "opacity-30 cursor-not-allowed bg-[#FAF6F0] text-[#888888]"
                  : "hover:bg-[#FAF6F0] text-[#3D1117] active:scale-95"
              }`}
              aria-label="Decrease pages"
            >
              <Minus className="w-5 h-5" />
            </button>

            <div className="text-center min-w-20 px-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#3D1117] block leading-none">
                {totalPages}
              </span>
              <span className="text-[10px] text-[#888888] font-bold uppercase tracking-wider block mt-1">
                Total Pages
              </span>
            </div>

            <button
              type="button"
              onClick={() => setExtraPages(extraPages + 2)}
              className="w-12 h-12 rounded-xl border border-[#E5DDD5] bg-[#FFFFFF] hover:bg-[#FAF6F0] text-[#3D1117] flex items-center justify-center transition-all active:scale-95 shadow-xs"
              aria-label="Increase pages"
            >
              <Plus className="w-5 h-5 text-[#3D1117]" />
            </button>
          </div>
        </div>

        {/* Live Line-Item Calculation */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#E5DDD5] flex items-center justify-between text-sm shadow-2xs">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#C9A769]" />
            <span className="font-medium text-[#2A2A2A]">
              {extraPages > 0 ? `Add-on: +${extraPages} extra pages (${extraPages / 2} spreads)` : "No extra pages added"}
            </span>
          </div>

          <span className="font-serif font-bold text-base sm:text-lg text-[#3D1117]">
            {extraPages > 0 ? `+${extraCost} AED` : "0 AED (Included)"}
          </span>
        </div>

      </div>

      {/* ============================================================ */}
      {/* PERSISTENT BOTTOM ACTION BAR */}
      {/* ============================================================ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-t border-[#E5DDD5] px-4 sm:px-8 py-4 shadow-warm-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          
          <Link
            href="/build/scent"
            className="px-5 py-3 rounded-full border border-[#E5DDD5] bg-[#FFFFFF] hover:bg-[#FAF6F0] text-[#3D1117] text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C9A769]" />
            <span>Back</span>
          </Link>

          <Link
            href="/build/personalize"
            className="px-8 py-3.5 rounded-full bg-[#3D1117] hover:bg-[#5C1A22] text-[#FAF6F0] font-bold text-xs sm:text-sm tracking-wide flex items-center gap-2 shadow-warm-sm transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>Continue to Personalize</span>
            <ArrowRight className="w-4 h-4 text-[#C9A769]" />
          </Link>

        </div>
      </div>

    </div>
  );
}
