"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { 
  Sparkles, 
  Plus, 
  Minus, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Upload, 
  Trash2, 
  BookOpen, 
  Droplets, 
  Type, 
  CheckCircle2,
  Camera,
  Layers,
  Edit3,
  Star,
  ShieldCheck,
  Package,
  Heart,
  ChevronRight,
  Eye
} from "lucide-react";
import { 
  STORY_THEMES, 
  BUNDLES, 
  BASE_PAGES, 
  EXTRA_PAGE_PRICE_AED, 
  MIN_PHOTOS_REQUIRED,
  BundleOption,
  StoryTheme
} from "@/data/products";
import { COVER_TEMPLATES, CoverTemplate } from "@/data/templates";
import { useStory, UploadedPhoto } from "@/context/StoryContext";
import { generateWhatsAppOrderUrl } from "@/utils/whatsapp";

function LuxuryStudioBuilder() {
  const searchParams = useSearchParams();
  const themeParam = searchParams.get("theme");
  const templateParam = searchParams.get("template");

  const {
    selectedTheme,
    setSelectedTheme,
    selectedTemplate,
    setSelectedTemplate,
    selectedBundle,
    setSelectedBundle,
    extraPages,
    setExtraPages,
    photos,
    addPhotos,
    removePhoto,
    loadSamplePhotos,
    clearPhotos,
    bookTitle,
    setBookTitle,
    bookSubtitle,
    setBookSubtitle,
    dedication,
    setDedication,
    setIsTemplateModalOpen,
  } = useStory();

  // Wizard Steps (1: Package & Scent, 2: Inscription, 3: Pages & Photos, 4: Order)
  const [activeStep, setActiveStep] = useState<number>(1);
  const [fullName, setFullName] = useState<string>("");
  const [activeView, setActiveView] = useState<"combo" | "book" | "scent">("combo");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync initial parameters (?theme=voyage&template=tpl-1)
  useEffect(() => {
    if (themeParam) {
      const foundTheme = STORY_THEMES.find((t) => t.id === themeParam);
      if (foundTheme) setSelectedTheme(foundTheme);
    }
    if (templateParam) {
      const foundTpl = COVER_TEMPLATES.find((tpl) => tpl.id === templateParam);
      if (foundTpl) {
        setSelectedTemplate(foundTpl);
        if (!bookTitle || bookTitle === "MY STORY") {
          setBookTitle(foundTpl.name.toUpperCase());
        }
      }
    }
  }, [themeParam, templateParam, setSelectedTheme, setSelectedTemplate, setBookTitle, bookTitle]);

  const currentTheme = selectedTheme;
  const currentBundle = selectedBundle;
  const totalPages = BASE_PAGES + extraPages;
  const extraPrice = extraPages * EXTRA_PAGE_PRICE_AED;
  const totalPrice = currentBundle.price + extraPrice;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newPhotos: UploadedPhoto[] = files.map((file, idx) => ({
      id: `upload-${Date.now()}-${idx}`,
      url: URL.createObjectURL(file),
      name: file.name,
      caption: "",
    }));
    addPhotos(newPhotos);
  };

  const directWhatsAppUrl = generateWhatsAppOrderUrl({
    bundleName: currentBundle.name,
    themeName: currentTheme.name,
    templateName: selectedTemplate?.name || "Custom Heirloom Cover",
    basePages: BASE_PAGES,
    extraPages,
    scentName: currentTheme.scent.name,
    photoCount: photos.length,
    minPhotos: MIN_PHOTOS_REQUIRED,
    bookTitle: bookTitle || `${currentTheme.name} Edition`,
    bookSubtitle: bookSubtitle || (fullName ? `Curated by ${fullName}` : `${currentTheme.name} Volume`),
    dedication: dedication,
    totalPriceAed: totalPrice,
  });

  const steps = [
    { num: 1, title: "Package & Scent", subtitle: "Signature Pairing" },
    { num: 2, title: "Story Inscription", subtitle: "Foil Embossing" },
    { num: 3, title: "Pages & Photos", subtitle: "Spine & Memories" },
    { num: 4, title: "Review & Order", subtitle: "WhatsApp Concierge" },
  ];

  return (
    <div className="bg-[#FAF7F2] text-[#2A2A2A] min-h-screen pt-20 pb-20">
      
      {/* 1. TOP PROGRESS STEPPER BAR */}
      <nav className="bg-[#FAF7F2] border-b border-[#E5DDD5] sticky top-20 z-30 backdrop-blur-md bg-opacity-95 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none py-1">
            
            {/* Pre-Selected Cover Badge */}
            <button
              type="button"
              onClick={() => setIsTemplateModalOpen(true)}
              className="shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-[#3B141C]/20 text-[#3B141C] hover:border-[#3B141C] shadow-2xs transition-all"
            >
              <div className="relative w-4 h-5 rounded overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#E5DDD5]">
                <Image
                  src={selectedTemplate?.thumbnail || "/images/Amor_Mitte.webp"}
                  alt="Cover"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="truncate max-w-[110px] sm:max-w-[140px]">
                {selectedTemplate?.name || "amor."}
              </span>
              <span className="text-[10px] text-[#C68B59] font-bold uppercase underline">
                Change
              </span>
            </button>

            <span className="text-[#D8CEBE] font-mono hidden sm:inline">|</span>

            {/* Stepper Navigation */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-max">
              {steps.map((step) => {
                const isActive = activeStep === step.num;
                const isCompleted = activeStep > step.num;

                return (
                  <button
                    key={step.num}
                    type="button"
                    onClick={() => setActiveStep(step.num)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-[#3B141C] text-[#FAF7F2] shadow-xs font-bold ring-1 ring-[#3B141C]"
                        : isCompleted
                        ? "bg-white text-[#3B141C] border border-[#E5DDD5] hover:bg-[#FAF7F2]"
                        : "bg-white/60 text-[#888888] border border-transparent hover:text-[#2A2A2A] hover:bg-white"
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                      isCompleted
                        ? "bg-[#3B141C] text-white"
                        : isActive
                        ? "bg-[#C68B59] text-white"
                        : "border border-[#CCCCCC]"
                    }`}>
                      {isCompleted ? "✓" : step.num}
                    </span>
                    <span className="truncate">{step.title}</span>
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </nav>

      {/* 2. MAIN 2-COLUMN WORKSPACE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: LIVE BESPOKE HEIRLOOM VISUALIZER (STICKY) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 lg:sticky lg:top-40 space-y-4">
            
            {/* View Mode Switcher */}
            <div className="flex items-center justify-center gap-1.5 bg-white p-1 rounded-2xl border border-[#E5DDD5] max-w-xs mx-auto shadow-2xs">
              <button
                type="button"
                onClick={() => setActiveView("combo")}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                  activeView === "combo" ? "bg-[#3B141C] text-[#FAF7F2] shadow-xs" : "text-[#888888] hover:text-[#2A2A2A]"
                }`}
              >
                Set View
              </button>
              <button
                type="button"
                onClick={() => setActiveView("scent")}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                  activeView === "scent" ? "bg-[#3B141C] text-[#FAF7F2] shadow-xs" : "text-[#888888] hover:text-[#2A2A2A]"
                }`}
              >
                75ml Scent
              </button>
              <button
                type="button"
                onClick={() => setActiveView("book")}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                  activeView === "book" ? "bg-[#3B141C] text-[#FAF7F2] shadow-xs" : "text-[#888888] hover:text-[#2A2A2A]"
                }`}
              >
                Cover
              </button>
            </div>

            {/* Visual Canvas */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-warm-lg border border-[#E5DDD5] bg-[#FFFFFF] flex items-center justify-center p-6 transition-all duration-300">
              
              {/* 1. Combo View (Photobook + Scent Presentation) */}
              {activeView === "combo" && (
                <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-200">
                  <div className="grid grid-cols-2 gap-4 w-full h-full items-center p-2">
                    {/* Photobook Half */}
                    <div className="relative h-full w-full rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E5DDD5] flex items-center justify-center">
                      <Image
                        src={selectedTemplate?.thumbnail || "/images/Amor_Mitte.webp"}
                        alt="Book Cover"
                        fill
                        priority
                        className="object-contain p-2"
                      />
                      {bookTitle && (
                        <div className="absolute top-4 left-3 right-3 text-center pointer-events-none drop-shadow-2xs">
                          <span className="font-serif font-bold text-[9px] uppercase tracking-widest text-[#3B141C]/80 block truncate">
                            {bookTitle}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Scent Bottle Half */}
                    <div className="relative h-full w-full rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E5DDD5] flex items-center justify-center">
                      <Image
                        src={currentTheme.scent.image}
                        alt={currentTheme.scent.name}
                        fill
                        priority
                        className="object-contain p-2"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Scent Bottle View */}
              {activeView === "scent" && (
                <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-200">
                  <Image
                    src={currentTheme.scent.image}
                    alt={currentTheme.scent.name}
                    fill
                    priority
                    className="object-contain p-4 transition-all duration-500"
                  />
                </div>
              )}

              {/* 3. Cover Artwork View */}
              {activeView === "book" && (
                <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-200">
                  <Image
                    src={selectedTemplate?.thumbnail || "/images/Amor_Mitte.webp"}
                    alt={selectedTemplate?.name || "Book Cover"}
                    fill
                    priority
                    className="object-contain p-2"
                  />
                  {bookTitle && (
                    <div className="absolute top-8 left-12 right-12 text-center pointer-events-none drop-shadow-xs">
                      <span className="font-serif font-bold text-xs uppercase tracking-widest text-[#3B141C]/80 block truncate">
                        {bookTitle}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 bg-[#3B141C]/90 backdrop-blur-md text-[#FAF7F2] px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#C68B59]" />
                <span>{currentBundle.name} • {totalPages} Pages</span>
              </div>
            </div>

            {/* Artisanal Olfactive Notes Strip */}
            <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E5DDD5] shadow-xs flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#E5DDD5] shrink-0">
                <Image
                  src={currentTheme.scent.image}
                  alt={currentTheme.scent.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#C68B59] tracking-wider">
                    {currentTheme.scent.bottleSize} • {currentTheme.category}
                  </span>
                  <span className="text-[10px] font-bold text-[#3B141C] bg-[#FAF7F2] px-2 py-0.5 rounded-full">
                    Grasse & UAE Atelier
                  </span>
                </div>
                <h4 className="font-serif font-bold text-sm text-[#1A1A1A] truncate">
                  {currentTheme.scent.name}
                </h4>
                <p className="text-[11px] text-[#2A2A2A]/70 truncate">
                  {currentTheme.scent.notes}
                </p>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: STEP-BY-STEP BESPOKE CONFIGURATOR */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 bg-[#FFFFFF] p-6 sm:p-8 rounded-3xl border border-[#E5DDD5] shadow-warm-md space-y-6">

            {/* --------------------------------------------------------------------- */}
            {/* STEP 1: CHOOSE PACKAGE & SIGNATURE SCENT */}
            {/* --------------------------------------------------------------------- */}
            {activeStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C68B59]">
                    Step 1 of 4
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B141C] tracking-tight mt-0.5">
                    Select Your Keepsake & Scent Package
                  </h2>
                  <p className="text-xs sm:text-sm text-[#2A2A2A]/75 mt-1 leading-relaxed">
                    Choose the heirloom bundle for your story, paired with our 75ml artisanal Eau de Parfum.
                  </p>
                </div>

                {/* Bundle Options */}
                <div className="space-y-3">
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#3B141C]">
                    1. Choose Heirloom Bundle
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {BUNDLES.map((bundle) => {
                      const isSelected = selectedBundle.id === bundle.id;
                      return (
                        <div
                          key={bundle.id}
                          onClick={() => setSelectedBundle(bundle)}
                          className={`relative p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                            isSelected
                              ? "border-[#3B141C] bg-[#FAF7F2] shadow-sm ring-1 ring-[#3B141C]"
                              : "border-[#E5DDD5] bg-[#FFFFFF] hover:border-[#C68B59] hover:bg-[#FAF7F2]/40"
                          }`}
                        >
                          {bundle.badge && (
                            <span className="absolute -top-2.5 right-3 text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#3B141C] text-[#FAF7F2] shadow-xs">
                              {bundle.badge}
                            </span>
                          )}

                          <div className="relative w-12 h-12 rounded-xl bg-white border border-[#E5DDD5] overflow-hidden shrink-0 flex items-center justify-center p-1 shadow-2xs">
                            {bundle.perfumeCount === 0 ? (
                              <Image
                                src={selectedTemplate?.thumbnail || "/images/Amor_Mitte.webp"}
                                alt="Book"
                                fill
                                className="object-contain"
                              />
                            ) : (
                              <Image
                                src={currentTheme.scent.image}
                                alt="Perfume"
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <span className="font-serif font-bold text-xs sm:text-sm text-[#3B141C] truncate block">
                              {bundle.name}
                            </span>
                            <p className="text-[10px] text-[#2A2A2A]/70 truncate mt-0.5">
                              {bundle.subtitle}
                            </p>
                            <div className="flex items-baseline gap-1.5 pt-0.5">
                              <span className="font-serif font-bold text-xs sm:text-sm text-[#3B141C]">
                                {bundle.price} AED
                              </span>
                              {bundle.originalPrice && (
                                <span className="text-[9px] text-[#888888] line-through">
                                  {bundle.originalPrice} AED
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Scent Formula Selection */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs uppercase font-bold tracking-wider text-[#3B141C]">
                      2. Signature Scent Formula (75ml EDP)
                    </label>
                    <span className="text-[10px] font-bold text-[#C68B59] uppercase">
                      Fixed Atelier Pairing
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {STORY_THEMES.map((theme) => {
                      const isSelected = currentTheme.id === theme.id;
                      return (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => setSelectedTheme(theme)}
                          className={`p-2.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                            isSelected
                              ? "bg-[#FAF7F2] border-2 border-[#3B141C] shadow-xs"
                              : "bg-white border-[#E5DDD5] hover:bg-[#FAF7F2]/50"
                          }`}
                        >
                          <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-1.5 bg-[#FAF7F2]">
                            <Image
                              src={theme.scent.image}
                              alt={theme.scent.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-[9px] uppercase font-bold text-[#888888] block truncate">
                            {theme.category}
                          </span>
                          <span className="font-sans font-bold text-xs text-[#1A1A1A] truncate block">
                            {theme.scent.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Next Step CTA */}
                <div className="pt-4 border-t border-[#E5DDD5]">
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="w-full py-4 px-6 rounded-full bg-[#3B141C] hover:bg-[#5C1A22] text-[#FAF7F2] font-sans font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-warm-md transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <span>Continue to Step 2: Inscription</span>
                    <ArrowRight className="w-4 h-4 text-[#C68B59]" />
                  </button>
                </div>

              </div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* STEP 2: INSCRIPTION & GOLD FOIL EMBOSSING */}
            {/* --------------------------------------------------------------------- */}
            {activeStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C68B59]">
                      Step 2 of 4
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B141C] tracking-tight mt-0.5">
                      Story Inscription & Names
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className="text-xs font-semibold text-[#3B141C] hover:underline flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-[#2A2A2A]/75 leading-relaxed">
                  These details will be hand-embossed in gold foil onto your cover, spine, and inner dedication page.
                </p>

                {/* Input Fields */}
                <div className="space-y-4 p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD5]">
                  <div>
                    <label className="block text-xs font-bold text-[#3B141C] mb-1">
                      Your Full Name / Author
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Layla Al-Hashimi & Marcus"
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-[#E5DDD5] bg-white focus:outline-none focus:ring-2 focus:ring-[#3B141C]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3B141C] mb-1">
                      Front Cover & Spine Title
                    </label>
                    <input
                      type="text"
                      value={bookTitle}
                      onChange={(e) => setBookTitle(e.target.value)}
                      placeholder="e.g. VOYAGE — ALONG THE MEDITERRANEAN COAST"
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-[#E5DDD5] bg-white focus:outline-none focus:ring-2 focus:ring-[#3B141C]/30 uppercase font-serif"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3B141C] mb-1">
                      Flap Inscription / Dedication Note (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={dedication}
                      onChange={(e) => setDedication(e.target.value)}
                      placeholder="For the moments that turned into forever..."
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-[#E5DDD5] bg-white focus:outline-none focus:ring-2 focus:ring-[#3B141C]/30"
                    />
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="pt-4 border-t border-[#E5DDD5] flex gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className="py-4 px-6 rounded-full bg-white hover:bg-[#FAF7F2] text-[#3B141C] font-sans font-bold text-xs border border-[#E5DDD5] transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep(3)}
                    className="flex-1 py-4 px-6 rounded-full bg-[#3B141C] hover:bg-[#5C1A22] text-[#FAF7F2] font-sans font-bold text-sm flex items-center justify-center gap-2 shadow-warm-md transition-all duration-300"
                  >
                    <span>Continue to Step 3: Pages & Photos</span>
                    <ArrowRight className="w-4 h-4 text-[#C68B59]" />
                  </button>
                </div>

              </div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* STEP 3: PAGES, SPINES & PHOTO UPLOADER */}
            {/* --------------------------------------------------------------------- */}
            {activeStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C68B59]">
                      Step 3 of 4
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B141C] tracking-tight mt-0.5">
                      Pages, Thickness & Photos
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="text-xs font-semibold text-[#3B141C] hover:underline flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </div>

                {/* Page Thickness Stepper */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs uppercase font-bold tracking-wider text-[#3B141C]">
                      Pages & Spine Thickness
                    </label>

                    <div className="flex items-center gap-2 bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#E5DDD5]">
                      <button
                        type="button"
                        onClick={() => setExtraPages(Math.max(0, extraPages - 2))}
                        disabled={extraPages <= 0}
                        className="w-6 h-6 rounded-full bg-white hover:bg-[#E5DDD5] disabled:opacity-30 flex items-center justify-center text-[#3B141C] font-bold shadow-2xs"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono font-bold text-xs w-16 text-center">
                        {totalPages} pgs
                      </span>
                      <button
                        type="button"
                        onClick={() => setExtraPages(Math.min(60, extraPages + 2))}
                        className="w-6 h-6 rounded-full bg-white hover:bg-[#E5DDD5] flex items-center justify-center text-[#3D1117] font-bold shadow-2xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD5] space-y-2">
                    <div className="flex justify-between text-[10px] font-semibold text-[#3B141C]">
                      <span>20 pgs (Included)</span>
                      <span>40 pgs (+360 AED)</span>
                      <span>80 pgs (+1,080 AED)</span>
                    </div>
                    <div className="h-2.5 w-full bg-white rounded-full overflow-hidden p-0.5 border border-[#E5DDD5]">
                      <div
                        className="h-full bg-[#3B141C] rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, ((totalPages - 20) / 60) * 100 + 25)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Photo Uploader */}
                <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD5] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-sm text-[#3B141C]">
                        Upload Photos ({photos.length}/{MIN_PHOTOS_REQUIRED} min)
                      </h3>
                      <p className="text-[11px] text-[#2A2A2A]/70">
                        Upload now or send them over WhatsApp after placing your order.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#E5DDD5] text-xs font-semibold text-[#3B141C] border border-[#E5DDD5] flex items-center gap-1.5 shadow-2xs"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload</span>
                      </button>
                      {photos.length === 0 && (
                        <button
                          type="button"
                          onClick={loadSamplePhotos}
                          className="px-3 py-1.5 rounded-full bg-white hover:bg-[#E5DDD5] text-[11px] font-medium text-[#2A2A2A]/70 border border-[#E5DDD5]"
                        >
                          Sample
                        </button>
                      )}
                    </div>
                  </div>

                  {photos.length > 0 && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 max-h-28 overflow-y-auto p-1.5 bg-white rounded-xl border border-[#E5DDD5]">
                        {photos.map((photo, i) => (
                          <div key={photo.id} className="relative aspect-square rounded-lg overflow-hidden group border border-[#E5DDD5]">
                            <Image src={photo.url} alt={`Upload ${i + 1}`} fill className="object-cover" />
                            <button
                              type="button"
                              onClick={() => removePhoto(photo.id)}
                              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                            >
                              <Trash2 className="w-3 h-3 text-red-300" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#2A2A2A]/70">
                        <span>{photos.length} photos ready for digital flip proof</span>
                        <button type="button" onClick={clearPhotos} className="text-red-700 hover:underline text-[10px]">
                          Clear
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="pt-4 border-t border-[#E5DDD5] flex gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="py-4 px-6 rounded-full bg-white hover:bg-[#FAF7F2] text-[#3B141C] font-sans font-bold text-xs tracking-wide border border-[#E5DDD5] transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep(4)}
                    className="flex-1 py-4 px-6 rounded-full bg-[#3B141C] hover:bg-[#5C1A22] text-[#FAF7F2] font-sans font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-warm-md transition-all duration-300"
                  >
                    <span>Continue to Step 4: Review & Order</span>
                    <ArrowRight className="w-4 h-4 text-[#C68B59]" />
                  </button>
                </div>

              </div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* STEP 4: REVIEW & WHATSAPP CONCIERGE ORDER */}
            {/* --------------------------------------------------------------------- */}
            {activeStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C68B59]">
                      Step 4 of 4 • Ready to Order
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B141C] tracking-tight mt-0.5">
                      Review & Order on WhatsApp
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveStep(3)}
                    className="text-xs font-semibold text-[#3B141C] hover:underline flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </div>

                {/* Structured Order Summary */}
                <div className="p-5 rounded-2xl bg-[#FFFFFF] border-2 border-[#3B141C] space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-[#E5DDD5] pb-3">
                    <div>
                      <span className="font-serif font-bold text-lg text-[#3B141C] block">
                        {currentBundle.name}
                      </span>
                      <span className="text-[11px] text-[#888888]">
                        {totalPages} Fine Art Pages • 75ml EDP Included
                      </span>
                    </div>
                    <span className="font-serif font-bold text-2xl text-[#3B141C]">
                      {totalPrice.toLocaleString()} AED
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-[#2A2A2A]">
                    <div className="flex justify-between">
                      <span className="text-[#888888]">Cover Template:</span>
                      <span className="font-semibold text-[#3B141C]">
                        {selectedTemplate?.name || "amor. Minimalist Blush"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#888888]">Author / Inscription:</span>
                      <span className="font-semibold text-[#1A1A1A]">{fullName || "Provided on WhatsApp"}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#888888]">Cover Title:</span>
                      <span className="font-semibold text-[#1A1A1A]">{bookTitle || `${currentTheme.name} Edition`}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#888888]">Signature Scent:</span>
                      <span className="font-semibold text-[#3B141C]">{currentTheme.scent.name} (75ml)</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#888888]">Photos:</span>
                      <span className="font-semibold text-[#1A1A1A]">
                        {photos.length > 0 ? `${photos.length} uploaded` : "Send directly on WhatsApp"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Order CTA */}
                <div className="space-y-3">
                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-full bg-[#3D1117] hover:bg-[#5C1A22] text-[#FAF7F2] font-sans font-bold text-sm tracking-wide flex items-center justify-center gap-3 shadow-warm-lg transition-all duration-300 transform hover:-translate-y-0.5 text-center"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                    <span>Confirm & Order on WhatsApp • {totalPrice.toLocaleString()} AED</span>
                  </a>

                  <p className="text-[11px] text-center text-[#2A2A2A]/70">
                    ✨ You will review a digital flip-proof of your book spreads on WhatsApp before printing begins.
                  </p>
                </div>

                {/* Quick Edit Step Links */}
                <div className="pt-2 flex justify-center gap-3 text-xs text-[#3B141C] font-semibold">
                  <button type="button" onClick={() => setActiveStep(1)} className="hover:underline">
                    Edit Scent & Package
                  </button>
                  <span>•</span>
                  <button type="button" onClick={() => setActiveStep(2)} className="hover:underline">
                    Edit Inscription
                  </button>
                  <span>•</span>
                  <button type="button" onClick={() => setActiveStep(3)} className="hover:underline">
                    Edit Pages & Photos
                  </button>
                </div>

              </div>
            )}

            {/* Bottom Total Ribbon */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD5] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#888888] tracking-wider block">
                  Total Investment
                </span>
                <span className="font-serif font-bold text-2xl text-[#3B141C]">
                  {totalPrice.toLocaleString()} AED
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-semibold text-[#3B141C] block">
                  {currentBundle.name}
                </span>
                <span className="text-[10px] text-[#2A2A2A]/70">
                  {totalPages} pages • 75ml EDP included
                </span>
              </div>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2] pt-32 text-center">Loading Studio...</div>}>
      <LuxuryStudioBuilder />
    </Suspense>
  );
}
