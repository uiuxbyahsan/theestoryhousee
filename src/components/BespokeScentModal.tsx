"use client";

import React, { useState } from "react";
import { X, Sparkles, Send, CheckCircle2, Droplet, Flame, HeartHandshake } from "lucide-react";
import { useStory } from "@/context/StoryContext";
import { generateGeneralWhatsAppInquiryUrl } from "@/utils/whatsapp";

export const BespokeScentModal: React.FC = () => {
  const { isCustomScentModalOpen, setIsCustomScentModalOpen } = useStory();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [storyOccasion, setStoryOccasion] = useState("");
  const [scentMemory, setScentMemory] = useState("");

  if (!isCustomScentModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3D1117]/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-[#FAF6F0] border border-[#E5DDD5] rounded-3xl p-6 sm:p-8 shadow-warm-lg overflow-hidden text-[#2A2A2A]">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsCustomScentModalOpen(false);
            setSubmitted(false);
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-[#2A2A2A] hover:bg-[#FFFFFF] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F0E8DC] text-[#3D1117] mx-auto flex items-center justify-center border border-[#E5DDD5]">
              <CheckCircle2 className="w-8 h-8 text-[#3D1117]" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#3D1117]">
              You are on the Master Perfumer's Ledger
            </h3>
            <p className="text-sm text-[#2A2A2A]/80 leading-relaxed max-w-sm mx-auto">
              Thank you, {name || "friend"}. Phase 2 bespoke scent formulation slots open quarterly in Grasse & Dubai. We will reach out when the next atelier reservation opens.
            </p>
            <div className="pt-4">
              <a
                href={generateGeneralWhatsAppInquiryUrl("custom-scent")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Expedite Inquiry via WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0E8DC] text-[#3D1117] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A769]" />
              <span>Phase 2 Atelier • Private Commission</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D1117] leading-snug">
              Commission a Scent for Your Story
            </h3>
            <p className="text-xs sm:text-sm text-[#2A2A2A]/80 mt-2 leading-relaxed font-normal">
              Work directly with our master nose to recreate an olfactory memory — from courtyard jasmine to coastal sea cliffs.
            </p>

            <div className="grid grid-cols-3 gap-2 my-5 text-center text-xs">
              <div className="bg-[#FFFFFF] p-3 rounded-2xl border border-[#E5DDD5]">
                <Droplet className="w-4 h-4 text-[#C9A769] mx-auto mb-1" />
                <p className="font-semibold text-[11px] text-[#3D1117]">1-on-1 Olfactive Consultation</p>
              </div>
              <div className="bg-[#FFFFFF] p-3 rounded-2xl border border-[#E5DDD5]">
                <Flame className="w-4 h-4 text-[#C9A769] mx-auto mb-1" />
                <p className="font-semibold text-[11px] text-[#3D1117]">Grasse & UAE Essences</p>
              </div>
              <div className="bg-[#FFFFFF] p-3 rounded-2xl border border-[#E5DDD5]">
                <HeartHandshake className="w-4 h-4 text-[#C9A769] mx-auto mb-1" />
                <p className="font-semibold text-[11px] text-[#3D1117]">Archived Formula for Life</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-[#2A2A2A] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Layla Al-Hashimi"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E5DDD5] bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A769]/50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2A2A2A] mb-1">The Occasion or Story</label>
                <input
                  type="text"
                  required
                  value={storyOccasion}
                  onChange={(e) => setStoryOccasion(e.target.value)}
                  placeholder="e.g. 50th Wedding Anniversary / Family Heritage Memorial"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E5DDD5] bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A769]/50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2A2A2A] mb-1">What scent evokes this memory?</label>
                <textarea
                  rows={2}
                  value={scentMemory}
                  onChange={(e) => setScentMemory(e.target.value)}
                  placeholder="e.g. Cardamom coffee, sun-baked sand, and vintage rosewater..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E5DDD5] bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A769]/50"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#3D1117] hover:bg-[#5C1A22] text-[#FAF6F0] font-semibold text-xs transition-colors shadow-warm-sm flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A769]" />
                  <span>Join Atelier Waitlist</span>
                </button>
                <a
                  href={generateGeneralWhatsAppInquiryUrl("custom-scent")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl border border-emerald-700 bg-[#FFFFFF] text-emerald-800 hover:bg-[#FAF6F0] font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
