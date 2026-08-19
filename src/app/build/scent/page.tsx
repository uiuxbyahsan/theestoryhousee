"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  RefreshCw, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Droplets,
  Heart
} from "lucide-react";
import { useStory } from "@/context/StoryContext";
import { STORY_THEMES } from "@/data/products";

export default function BuildScentPage() {
  const router = useRouter();
  const {
    selectedTheme,
    selectedScentName,
    setSelectedScentName,
    hasScent,
    setHasScent,
  } = useStory();

  const [isSwapping, setIsSwapping] = useState(false);

  const currentScentObj = STORY_THEMES.find(
    (t) => t.scent.name.toLowerCase() === selectedScentName.toLowerCase()
  )?.scent || selectedTheme.scent;

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3D1117] tracking-tight">
          Your Signature Scent
        </h1>
        <p className="text-sm sm:text-base text-[#2A2A2A]/75 max-w-2xl leading-relaxed">
          {hasScent ? (
            <>
              Paired with <span className="font-semibold text-[#3D1117]">{currentScentObj.name}</span> for your {selectedTheme.category} story
            </>
          ) : (
            "Photobook only mode (no fragrance included)."
          )}
        </p>
      </div>

      {/* Scent Presentation Card */}
      {hasScent ? (
        <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5DDD5] p-6 sm:p-10 space-y-8 shadow-warm-md">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Flacon Image */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border border-[#E5DDD5] bg-[#FAF6F0] shadow-warm-sm group">
                <Image
                  src={currentScentObj.image}
                  alt={currentScentObj.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#3D1117]/85 backdrop-blur-sm text-[#FAF6F0] px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 shadow-xs">
                  <Droplets className="w-3 h-3 text-[#C9A769]" />
                  <span>75ml Eau de Parfum</span>
                </div>
              </div>
            </div>

            {/* Scent Info */}
            <div className="md:col-span-7 space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0E8DC] text-[#3D1117] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A769]" />
                <span>Artisanal UAE Flacon</span>
              </div>

              <div>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3D1117]">
                  {currentScentObj.name}
                </h2>
                <p className="font-serif italic text-sm text-[#C9A769] mt-1">
                  &ldquo;{currentScentObj.tagline}&rdquo;
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#2A2A2A]/80 leading-relaxed font-normal">
                {currentScentObj.description}
              </p>

              {/* Scent Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsSwapping(!isSwapping)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[#3D1117] bg-[#FFFFFF] hover:bg-[#FAF6F0] text-[#3D1117] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#C9A769]" />
                  <span>{isSwapping ? "Close Scent Atelier" : "Swap Scent"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setHasScent(false)}
                  className="text-xs text-[#2A2A2A]/60 hover:text-red-700 underline transition-colors"
                >
                  Remove Scent (Save 170 AED → 429 AED)
                </button>
              </div>
            </div>
          </div>

          {/* Olfactive Notes Breakdown (3 clean rows) */}
          <div className="pt-6 border-t border-[#E5DDD5] space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#888888] block text-center sm:text-left">
              Olfactive Pyramid & Scent Architecture
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E5DDD5] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A769] block">
                  Top Notes
                </span>
                <span className="font-serif font-bold text-sm text-[#3D1117] block">
                  {currentScentObj.notes.top.join(" • ")}
                </span>
                <p className="text-[11px] text-[#2A2A2A]/70 leading-tight">First impression upon spraying.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E5DDD5] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A769] block">
                  Heart Notes
                </span>
                <span className="font-serif font-bold text-sm text-[#3D1117] block">
                  {currentScentObj.notes.mid.join(" • ")}
                </span>
                <p className="text-[11px] text-[#2A2A2A]/70 leading-tight">The soul and body of the memory.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E5DDD5] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A769] block">
                  Base Notes
                </span>
                <span className="font-serif font-bold text-sm text-[#3D1117] block">
                  {currentScentObj.notes.base.join(" • ")}
                </span>
                <p className="text-[11px] text-[#2A2A2A]/70 leading-tight">Long-lasting 8+ hour sillage.</p>
              </div>
            </div>
          </div>

          {/* Inline Scent Swap Drawer / Grid */}
          {isSwapping && (
            <div className="pt-6 border-t border-[#E5DDD5] space-y-4 animate-in fade-in duration-300">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-[#3D1117]">
                  Atelier Fragrance Library
                </h3>
                <p className="text-xs text-[#2A2A2A]/70">
                  Select any signature formula from our master perfume ledger:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {STORY_THEMES.map((theme) => {
                  const isSelected = selectedScentName.toLowerCase() === theme.scent.name.toLowerCase();
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => {
                        setSelectedScentName(theme.scent.name);
                        setIsSwapping(false);
                      }}
                      className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                        isSelected
                          ? "border-[#3D1117] bg-[#F0E8DC] shadow-warm-sm ring-1 ring-[#3D1117]"
                          : "border-[#E5DDD5] bg-[#FAF6F0] hover:border-[#C9A769] hover:bg-[#FFFFFF]"
                      }`}
                    >
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#E5DDD5] bg-white">
                        <Image src={theme.scent.image} alt={theme.scent.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-serif font-bold text-xs sm:text-sm text-[#3D1117] block truncate">
                          {theme.scent.name}
                        </span>
                        <span className="text-[10px] text-[#2A2A2A]/70 block truncate">
                          For {theme.category}
                        </span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#3D1117] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Scent Removed State with Quiet Undo Link */
        <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5DDD5] p-8 sm:p-12 text-center space-y-4 shadow-warm-sm max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#F0E8DC] text-[#3D1117] mx-auto flex items-center justify-center shadow-xs">
            <BookOpen className="w-8 h-8 text-[#3D1117]" />
          </div>
          <h2 className="font-serif font-bold text-2xl text-[#3D1117]">
            The Story (Photobook Only) Selected
          </h2>
          <p className="text-xs sm:text-sm text-[#2A2A2A]/75 max-w-md mx-auto leading-relaxed">
            Your order includes 1× 20-Page Handcrafted Hardcover Photobook without the signature 75ml perfume flacon. The running total has been updated to <strong>429 AED</strong>.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setHasScent(true)}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#C9A769] bg-[#FAF6F0] border border-[#E5DDD5] hover:border-[#C9A769] px-4 py-2 rounded-full transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C9A769]" />
              <span>Add Signature Scent Back (+170 AED)</span>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* PERSISTENT BOTTOM ACTION BAR */}
      {/* ============================================================ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-t border-[#E5DDD5] px-4 sm:px-8 py-4 shadow-warm-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          
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

    </div>
  );
}
