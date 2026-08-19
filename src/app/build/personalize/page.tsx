"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  MapPin, 
  ChevronDown, 
  Type, 
  Sparkles,
  Heart
} from "lucide-react";
import { useStory } from "@/context/StoryContext";

const EMIRATES_LIST = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain",
  "Saudi Arabia (GCC Express)",
  "Qatar (GCC Express)",
  "Kuwait (GCC Express)",
  "Bahrain (GCC Express)",
  "Oman (GCC Express)",
  "International (Worldwide Courier)",
];

export default function BuildPersonalizePage() {
  const router = useRouter();
  const {
    selectedTheme,
    selectedTemplate,
    bookTitle,
    setBookTitle,
    dedication,
    setDedication,
    customerName,
    setCustomerName,
    deliveryArea,
    setDeliveryArea,
  } = useStory();

  const productName = selectedTemplate?.name || selectedTheme.name;

  // Pre-fill default title if empty
  useEffect(() => {
    if (!bookTitle || bookTitle === "MY STORY") {
      setBookTitle(selectedTemplate?.name ? selectedTemplate.name.toUpperCase() : selectedTheme.name.toUpperCase());
    }
  }, [selectedTemplate, selectedTheme, bookTitle, setBookTitle]);

  const isValid = customerName.trim().length > 0 && deliveryArea.trim().length > 0;

  const handleContinue = () => {
    if (isValid) {
      router.push("/build/review");
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="space-y-2 text-center sm:text-left">
        <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C9A769] block">
          Step 4 • Editorial Customization
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3D1117] tracking-tight">
          Personalize Your Story
        </h1>
        <p className="text-sm sm:text-base text-[#2A2A2A]/75 max-w-2xl leading-relaxed">
          Make this copy uniquely your own with custom front cover foil stamping and delivery details.
        </p>
      </div>

      {/* Personalization Form Card */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5DDD5] p-6 sm:p-10 space-y-6 shadow-warm-md">
        
        {/* Book Title */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#3D1117]">
            Front Cover Book Title <span className="text-[#C9A769] font-serif italic text-xs capitalize font-normal">(Gold Foil Stamped)</span>
          </label>
          <div className="relative">
            <Type className="w-4 h-4 text-[#888888] absolute left-4 top-3.5" />
            <input
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              placeholder="e.g. CROATIA & THE ADRIATIC"
              className="w-full text-base sm:text-lg pl-11 pr-4 py-3 rounded-2xl border border-[#E5DDD5] bg-[#FAF6F0] focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A769]/50 text-[#3D1117] font-serif uppercase font-bold tracking-wider transition-all"
            />
          </div>
          <p className="text-[11px] text-[#888888] leading-tight">
            Pre-filled with your chosen cover template. You can customize this to any name or journey.
          </p>
        </div>

        {/* Dedication or Subtitle (Optional) */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#3D1117]">
            Dedication / Subtitle <span className="text-[11px] text-[#888888] font-normal normal-case">(Optional)</span>
          </label>
          <textarea
            rows={2}
            value={dedication}
            onChange={(e) => setDedication(e.target.value)}
            placeholder="for the summer we don't want to forget"
            className="w-full text-xs sm:text-sm px-4 py-3 rounded-2xl border border-[#E5DDD5] bg-[#FAF6F0] focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A769]/50 text-[#2A2A2A] italic transition-all leading-relaxed"
          />
          <p className="text-[11px] text-[#888888] leading-tight">
            Printed on the opening parchment title flap preceding your photos.
          </p>
        </div>

        {/* Name (Required) */}
        <div className="space-y-1.5 pt-2 border-t border-[#E5DDD5]">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#3D1117]">
            Your Full Name <span className="text-red-700 font-bold">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[#888888] absolute left-4 top-3.5" />
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Layla Al-Mansoor"
              className="w-full text-sm sm:text-base pl-11 pr-4 py-3 rounded-2xl border border-[#E5DDD5] bg-[#FAF6F0] focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A769]/50 text-[#2A2A2A] transition-all"
            />
          </div>
        </div>

        {/* Delivery Area Dropdown (Required) */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#3D1117]">
            Delivery Area / Emirate <span className="text-red-700 font-bold">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-[#888888] absolute left-4 top-3.5" />
            <select
              value={deliveryArea}
              onChange={(e) => setDeliveryArea(e.target.value)}
              className="w-full text-sm sm:text-base pl-11 pr-10 py-3 rounded-2xl border border-[#E5DDD5] bg-[#FAF6F0] focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A769]/50 text-[#2A2A2A] appearance-none transition-all cursor-pointer"
            >
              {EMIRATES_LIST.map((emirate) => (
                <option key={emirate} value={emirate}>
                  {emirate}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[#888888] absolute right-4 top-4 pointer-events-none" />
          </div>
          <p className="text-[11px] text-[#888888] leading-tight pt-1">
            Free temperature-controlled courier delivery across all UAE Emirates. Regional express courier applies across GCC.
          </p>
        </div>

        {/* Reassurance Notice */}
        <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E5DDD5] text-xs text-[#2A2A2A]/80 leading-relaxed flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-[#C9A769] shrink-0" />
          <span>
            No phone number or payment details are collected here — your WhatsApp account automatically connects for personal proofing.
          </span>
        </div>

      </div>

      {/* ============================================================ */}
      {/* PERSISTENT BOTTOM ACTION BAR */}
      {/* ============================================================ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-t border-[#E5DDD5] px-4 sm:px-8 py-4 shadow-warm-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          
          <Link
            href="/build/pages"
            className="px-5 py-3 rounded-full border border-[#E5DDD5] bg-[#FFFFFF] hover:bg-[#FAF6F0] text-[#3D1117] text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C9A769]" />
            <span>Back to Pages</span>
          </Link>

          <div className="flex items-center gap-3">
            {!isValid && (
              <span className="text-xs text-[#888888] font-medium hidden sm:inline">
                Please enter your Name and Delivery Area to continue
              </span>
            )}

            <button
              type="button"
              onClick={handleContinue}
              disabled={!isValid}
              className={`px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wide flex items-center gap-2 shadow-warm-sm transition-all duration-300 ${
                !isValid
                  ? "bg-[#E5DDD5] text-[#888888] cursor-not-allowed"
                  : "bg-[#3D1117] hover:bg-[#5C1A22] text-[#FAF6F0] transform hover:-translate-y-0.5"
              }`}
            >
              <span>Continue to Review</span>
              <ArrowRight className="w-4 h-4 text-[#C9A769]" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
