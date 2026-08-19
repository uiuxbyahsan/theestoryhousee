"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Droplets,
  Eye
} from "lucide-react";
import { useStory } from "@/context/StoryContext";
import { STORY_THEMES, StoryTheme } from "@/data/products";
import { ScentQuickViewModal } from "@/components/ScentQuickViewModal";

export default function BuildScentPage() {
  const router = useRouter();
  const {
    selectedTheme,
    selectedScentName,
    setSelectedScentName,
    hasScent,
    setHasScent,
  } = useStory();

  const [quickViewTheme, setQuickViewTheme] = useState<StoryTheme | null>(null);

  const handleSelectScent = (scentName: string) => {
    setSelectedScentName(scentName);
    setHasScent(true);
  };

  const handleSelectNoScent = () => {
    setHasScent(false);
  };

  // Curate 4 main scents for 2x2 grid (Travel, Wedding, Baby, Friendship/Kinship)
  const displayThemes = STORY_THEMES.slice(0, 4);

  return (
    <div className="space-y-10">
      
      {/* Page Header */}
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3D1117] tracking-tight">
          Pair a Signature Scent
        </h1>
        <p className="text-sm sm:text-base text-[#2A2A2A]/75 max-w-2xl leading-relaxed">
          Choose the scent that matches your story — or skip it entirely
        </p>
      </div>

      {/* 2-Column × 2-Row Scent Card Grid on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {displayThemes.map((theme) => {
          const isRecommended = theme.id === selectedTheme.id || theme.category.toLowerCase() === selectedTheme.category.toLowerCase();
          const isSelected = hasScent && selectedScentName.toLowerCase() === theme.scent.name.toLowerCase();

          return (
            <div
              key={theme.id}
              onClick={() => handleSelectScent(theme.scent.name)}
              className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between group ${
                isSelected
                  ? "bg-[#FFFFFF] border-2 border-[#3D1117] ring-4 ring-[#3D1117]/10 shadow-warm-md"
                  : "bg-[#FFFFFF] border border-[#E5DDD5] hover:border-[#C9A769] hover:shadow-warm-sm"
              }`}
            >
              {/* Recommended Badge on Top-Left */}
              {isRecommended && (
                <div className="absolute top-4 left-4 z-10 bg-[#FAF6F0]/95 backdrop-blur-md border border-[#C9A769] text-[#3D1117] px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wide flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A769]" />
                  <span>Recommended for your story</span>
                </div>
              )}

              {/* Scent Flacon Image Container (Exact Style from Showcase) */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF6F0]">
                <Image
                  src={theme.scent.image}
                  alt={theme.scent.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hover Quick View Trigger */}
                <div className="absolute inset-0 bg-[#2A0C10]/35 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickViewTheme(theme);
                    }}
                    className="px-4 py-2 rounded-full bg-white/95 hover:bg-white text-[#3D1117] font-sans font-bold text-xs tracking-wider uppercase shadow-warm-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 cursor-pointer hover:scale-105"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#C9A769]" />
                    <span>View Notes</span>
                  </button>
                </div>
              </div>

              {/* Card Footer: Details on Left + Select Button on Right */}
              <div className="p-5 sm:p-6 bg-[#FFFFFF] flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-t border-[#E5DDD5]/80">
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="text-[10px] sm:text-[11px] uppercase font-bold text-[#888888] tracking-widest block truncate">
                    FOR {theme.category.toUpperCase()} • 75ML
                  </span>
                  <h3 className="font-sans font-bold text-base sm:text-lg text-[#3D1117] tracking-wide uppercase truncate">
                    {theme.scent.name}
                  </h3>
                  <p className="text-xs text-[#2A2A2A]/70 line-clamp-1 font-normal">
                    {theme.scent.notes.top.join(", ")} • {theme.scent.notes.mid.join(", ")}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectScent(theme.scent.name);
                  }}
                  className={`w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200 shrink-0 flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? "bg-[#3D1117] text-[#FAF6F0] shadow-xs"
                      : "bg-[#FFFFFF] hover:bg-[#3D1117] hover:text-[#FAF6F0] text-[#3D1117] border border-[#E5DDD5] hover:border-[#3D1117]"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <span>Selected</span>
                      <Check className="w-3.5 h-3.5 text-[#C9A769]" />
                    </>
                  ) : (
                    <span>Select Scent</span>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Divider: "— or —" */}
      <div className="relative py-2 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-[#E5DDD5]" />
        </div>
        <div className="relative px-6 bg-[#FAF6F0] text-xs font-serif font-bold uppercase tracking-widest text-[#888888]">
          — or —
        </div>
      </div>

      {/* Full-Width "No Scent" Card (Muted / Outline Style) */}
      <div
        onClick={handleSelectNoScent}
        className={`rounded-3xl p-6 sm:p-7 cursor-pointer transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-5 ${
          !hasScent
            ? "bg-[#FFFFFF] border-2 border-[#3D1117] ring-4 ring-[#3D1117]/10 shadow-warm-sm"
            : "bg-[#FFFFFF]/70 hover:bg-[#FFFFFF] border border-[#E5DDD5] hover:border-[#C9A769]"
        }`}
      >
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-[#FAF6F0] border border-[#E5DDD5] text-[#3D1117] flex items-center justify-center shrink-0">
            <BookOpen className="w-7 h-7 text-[#888888]" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-[#3D1117]">
              Continue with your photobook only
            </h3>
            <p className="text-xs sm:text-sm text-[#2A2A2A]/70 mt-0.5">
              1× Handcrafted 20-Page Hardcover Book • No signature perfume pairing (429 AED base)
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleSelectNoScent();
          }}
          className={`w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold tracking-wide transition-all duration-200 shrink-0 flex items-center justify-center gap-1.5 ${
            !hasScent
              ? "bg-[#3D1117] text-[#FAF6F0] shadow-xs"
              : "bg-[#FFFFFF] hover:bg-[#3D1117] hover:text-[#FAF6F0] text-[#3D1117] border border-[#E5DDD5] hover:border-[#3D1117]"
          }`}
        >
          {!hasScent ? (
            <>
              <span>Selected</span>
              <Check className="w-3.5 h-3.5 text-[#C9A769]" />
            </>
          ) : (
            <span>Select Photobook Only</span>
          )}
        </button>
      </div>

      {/* ============================================================ */}
      {/* PERSISTENT BOTTOM ACTION BAR */}
      {/* ============================================================ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-t border-[#E5DDD5] px-4 sm:px-8 py-4 shadow-warm-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          
          <Link
            href="/build/photos"
            className="px-5 py-3 rounded-full border border-[#E5DDD5] bg-[#FFFFFF] hover:bg-[#FAF6F0] text-[#3D1117] text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C9A769]" />
            <span>Back to Photos</span>
          </Link>

          <Link
            href="/build/pages"
            className="px-8 py-3.5 rounded-full bg-[#3D1117] hover:bg-[#5C1A22] text-[#FAF6F0] font-bold text-xs sm:text-sm tracking-wide flex items-center gap-2 shadow-warm-sm transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>Continue to Pages</span>
            <ArrowRight className="w-4 h-4 text-[#C9A769]" />
          </Link>

        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewTheme && (
        <ScentQuickViewModal
          theme={quickViewTheme}
          onClose={() => setQuickViewTheme(null)}
        />
      )}

    </div>
  );
}
