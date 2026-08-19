"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Sparkles, Droplets, ArrowRight, Wind, Heart, ShieldCheck } from "lucide-react";
import { StoryTheme } from "@/data/products";
import { useStory } from "@/context/StoryContext";
import { generateGeneralWhatsAppInquiryUrl } from "@/utils/whatsapp";

interface ScentQuickViewModalProps {
  theme: StoryTheme | null;
  onClose: () => void;
}

export const ScentQuickViewModal: React.FC<ScentQuickViewModalProps> = ({ theme, onClose }) => {
  const { setSelectedTheme } = useStory();

  if (!theme) return null;

  const { scent } = theme;

  const handleSelectAndBuild = () => {
    setSelectedTheme(theme);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2A0C10]/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#FAF6F0] border border-[#E5DDD5] rounded-3xl shadow-warm-xl overflow-hidden text-[#2A2A2A] max-h-[90vh] flex flex-col sm:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#2A2A2A] shadow-xs transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Perfume Image */}
        <div className="relative w-full sm:w-1/2 aspect-square sm:aspect-auto sm:min-h-[420px] bg-[#FFFFFF] flex items-center justify-center p-6 border-b sm:border-b-0 sm:border-r border-[#E5DDD5]">
          <div className="relative w-full h-full min-h-[220px] rounded-2xl overflow-hidden">
            <Image
              src={scent.image}
              alt={scent.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-[#E5DDD5] text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#3D1117]">
              75ml Eau de Parfum • UAE / Grasse
            </span>
          </div>
        </div>

        {/* Right Column: Scent Details & Notes */}
        <div className="w-full sm:w-1/2 p-6 sm:p-7 overflow-y-auto flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            
            {/* Category badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3D1117]/10 text-[#3D1117] text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A769]" />
              <span>For {theme.category} Memory Books</span>
            </div>

            {/* Scent Title */}
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] leading-tight">
                {scent.name}
              </h3>
              <p className="font-serif italic text-xs text-[#C9A769] mt-0.5">
                {scent.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-[13px] text-[#2A2A2A]/80 leading-relaxed font-normal">
              {scent.description}
            </p>

            {/* Fragrance Pyramids / Notes */}
            <div className="space-y-2.5 pt-2 border-t border-[#E5DDD5]/60">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#888888] block">
                Olfactive Profile
              </span>
              
              <div className="space-y-1.5 text-xs">
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D1117] shrink-0 w-12 pt-0.5">
                    Top:
                  </span>
                  <span className="text-[11px] text-[#2A2A2A]/85">
                    {scent.notes.top.join(", ")}
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D1117] shrink-0 w-12 pt-0.5">
                    Heart:
                  </span>
                  <span className="text-[11px] text-[#2A2A2A]/85">
                    {scent.notes.mid.join(", ")}
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D1117] shrink-0 w-12 pt-0.5">
                    Base:
                  </span>
                  <span className="text-[11px] text-[#2A2A2A]/85">
                    {scent.notes.base.join(", ")}
                  </span>
                </div>
              </div>
            </div>

            {/* Mood & Family Tag */}
            <div className="flex flex-wrap gap-2 pt-1 text-[10px]">
              <span className="px-2.5 py-1 rounded-md bg-[#FFFFFF] border border-[#E5DDD5] text-[#2A2A2A]/80 font-medium">
                Family: {scent.olfactiveFamily}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#FFFFFF] border border-[#E5DDD5] text-[#2A2A2A]/80 font-medium">
                Mood: {scent.mood}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-[#E5DDD5] space-y-2">
            <Link
              href="/builder"
              onClick={handleSelectAndBuild}
              className="w-full py-3 px-4 rounded-xl bg-[#3D1117] hover:bg-[#5C1A22] text-[#FAF6F0] font-sans font-semibold text-xs tracking-wider uppercase shadow-warm-sm transition-all flex items-center justify-center gap-2 text-center"
            >
              <span>Pair with Photobook in Studio</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C9A769]" />
            </Link>

            <a
              href={generateGeneralWhatsAppInquiryUrl(`perfume-${theme.id}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#FAF6F0] text-[#2A2A2A] font-sans font-medium text-xs tracking-wide border border-[#E5DDD5] transition-all flex items-center justify-center gap-1.5 text-center"
            >
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
