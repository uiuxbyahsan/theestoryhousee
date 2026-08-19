"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ChevronLeft, 
  ChevronDown,
  Upload, 
  Camera, 
  Sparkles, 
  Check, 
  Plus, 
  Minus, 
  Pencil, 
  Send, 
  Copy, 
  CheckCircle2, 
  ExternalLink,
  Droplets,
  BookOpen,
  MapPin,
  User,
  ArrowRight,
  RefreshCw,
  Trash2
} from "lucide-react";
import { useStory, UploadedPhoto } from "@/context/StoryContext";
import { STORY_THEMES, BASE_PAGES, EXTRA_PAGE_PRICE_AED, MIN_PHOTOS_REQUIRED, WHATSAPP_NUMBER } from "@/data/products";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const EMIRATES_LIST = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain",
  "Saudi Arabia (GCC)",
  "Qatar (GCC)",
  "Kuwait (GCC)",
  "Bahrain (GCC)",
  "Oman (GCC)",
  "International (Worldwide Delivery)",
];

const STEP_TITLES = [
  { step: 1, title: "Upload Photos", dots: "●○○○○" },
  { step: 2, title: "Signature Scent", dots: "○●○○○" },
  { step: 3, title: "Pages & Format", dots: "○○●○○" },
  { step: 4, title: "Personalize", dots: "○○○●○" },
  { step: 5, title: "Review & Send", dots: "○○○○●" },
];

export const DesignOrderDrawer: React.FC = () => {
  const {
    isOrderDrawerOpen,
    setIsOrderDrawerOpen,
    orderStep,
    setOrderStep,
    selectedTheme,
    setSelectedTheme,
    selectedTemplate,
    selectedScentName,
    setSelectedScentName,
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
    hasScent,
    setHasScent,
    customerName,
    setCustomerName,
    deliveryArea,
    setDeliveryArea,
    totalPriceAed,
  } = useStory();

  const [direction, setDirection] = useState<number>(1);
  const [isSwappingScent, setIsSwappingScent] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set default title based on selected template or theme
  useEffect(() => {
    if (selectedTemplate && (!bookTitle || bookTitle === "MY STORY")) {
      setBookTitle(selectedTemplate.name);
    } else if (!bookTitle) {
      setBookTitle(selectedTheme.name);
    }
  }, [selectedTemplate, selectedTheme, bookTitle, setBookTitle]);

  if (!isOrderDrawerOpen) return null;

  const handleNext = () => {
    if (orderStep < 5) {
      setDirection(1);
      setOrderStep(orderStep + 1);
    }
  };

  const handleBack = () => {
    if (orderStep > 1) {
      setDirection(-1);
      setOrderStep(orderStep - 1);
    }
  };

  const jumpToStep = (step: number) => {
    setDirection(step > orderStep ? 1 : -1);
    setOrderStep(step);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newPhotos: UploadedPhoto[] = files.map((file, idx) => ({
      id: `uploaded-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 5)}`,
      url: URL.createObjectURL(file),
      name: file.name,
      caption: "",
    }));
    addPhotos(newPhotos);
  };

  const currentScentObj = STORY_THEMES.find(
    (t) => t.scent.name.toLowerCase() === selectedScentName.toLowerCase()
  )?.scent || selectedTheme.scent;

  const totalPages = BASE_PAGES + extraPages;
  const extraCost = extraPages * EXTRA_PAGE_PRICE_AED;
  const productName = selectedTemplate?.name || selectedTheme.name;
  const photosNeeded = Math.max(0, MIN_PHOTOS_REQUIRED - photos.length);
  const isStep1Valid = photos.length >= MIN_PHOTOS_REQUIRED;
  const isStep4Valid = customerName.trim().length > 0 && deliveryArea.trim().length > 0;

  // Construct structured WhatsApp message strictly following specification
  const constructWhatsAppMessage = () => {
    const bundleName = hasScent ? "The Story + Scent" : "The Story (Photobook Only)";
    const templateName = selectedTemplate?.name || "Bespoke Cover";
    const pageDetails = extraPages > 0 ? `${BASE_PAGES} + ${extraPages} extra (${totalPages} total)` : `${BASE_PAGES}`;
    
    const lines = [
      `Hi The Story House! 👋 I'd like to order:`,
      ``,
      `Bundle: ${bundleName}`,
      `Theme: ${selectedTheme.name}`,
      `Template: ${templateName}`,
      `Pages: ${pageDetails}`,
    ];

    if (hasScent) {
      lines.push(`Scent: ${selectedScentName} (75ml Eau de Parfum)`);
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
      `Name: ${customerName.trim()}`,
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

    // Track analytics event
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

  // Framer Motion slide variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0,
    }),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#2A0C10]/60 backdrop-blur-sm animate-in fade-in duration-300">
      
      {/* Drawer on Mobile / Centered Modal on Desktop */}
      <div className="relative w-full max-w-2xl bg-[#FAF6F0] rounded-t-[32px] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[90vh] sm:h-auto sm:max-h-[90vh] border border-[#E5DDD5] text-[#2A2A2A]">
        
        {/* ============================================================ */}
        {/* PERSISTENT HEADER (Close / Step Indicator / Animated Price) */}
        {/* ============================================================ */}
        <header className="px-6 py-4 sm:py-5 border-b border-[#E5DDD5] bg-[#FAF6F0] flex items-center justify-between shrink-0 z-10">
          
          {/* Left: Close Button / Exit to PDP */}
          <button
            onClick={() => setIsOrderDrawerOpen(false)}
            className="p-2 -ml-2 rounded-full text-[#3D1117] hover:bg-[#E5DDD5]/50 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            aria-label="Close design order"
          >
            <X className="w-5 h-5 text-[#3D1117]" />
            <span className="hidden sm:inline text-[#2A2A2A]/70">Exit</span>
          </button>

          {/* Center: Step Dots Indicator */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {STEP_TITLES.map((st) => (
                <button
                  key={st.step}
                  onClick={() => st.step <= orderStep && jumpToStep(st.step)}
                  disabled={st.step > orderStep}
                  className={`transition-all duration-300 rounded-full ${
                    st.step === orderStep
                      ? "w-6 sm:w-7 h-2 bg-[#3D1117]"
                      : st.step < orderStep
                      ? "w-2 h-2 bg-[#C9A769] hover:opacity-80"
                      : "w-2 h-2 bg-[#E5DDD5]"
                  }`}
                  aria-label={`Step ${st.step}: ${st.title}`}
                />
              ))}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C9A769] mt-1">
              Step {orderStep} of 5 • {STEP_TITLES[orderStep - 1].title}
            </span>
          </div>

          {/* Right: Persistent Animated Price Header */}
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-[#888888] block tracking-wider">
              Total
            </span>
            <div className="flex items-center justify-end font-serif font-bold text-lg sm:text-xl text-[#3D1117] leading-none">
              <motion.span
                key={totalPriceAed}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {totalPriceAed.toLocaleString()}
              </motion.span>
              <span className="text-xs ml-1 font-sans font-semibold text-[#C9A769]">AED</span>
            </div>
          </div>

        </header>

        {/* ============================================================ */}
        {/* MAIN MULTI-STEP CONTENT (Framer Motion Slides) */}
        {/* ============================================================ */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-7 relative">
          <AnimatePresence mode="wait" custom={direction}>
            
            {/* ------------------------------------------------------------ */}
            {/* STEP 1: PHOTO UPLOAD */}
            {/* ------------------------------------------------------------ */}
            {orderStep === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D1117] tracking-tight">
                    Upload Your Photos
                  </h2>
                  <p className="text-xs sm:text-sm text-[#2A2A2A]/75 leading-relaxed">
                    Choose at least {MIN_PHOTOS_REQUIRED} HD photos to bring <span className="font-semibold text-[#3D1117]">{productName}</span> to life.
                  </p>
                </div>

                {/* Drag and Drop Zone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#C9A769]/60 hover:border-[#3D1117] bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 group hover:shadow-warm-sm"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="w-14 h-14 rounded-full bg-[#FAF6F0] border border-[#E5DDD5] text-[#C9A769] mx-auto flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Camera className="w-7 h-7 text-[#C9A769]" />
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#3D1117] mt-3">
                    Drag & Drop Photos Here
                  </h3>
                  <p className="text-xs text-[#2A2A2A]/70 mt-0.5">
                    or <span className="text-[#C9A769] font-bold underline">browse files</span> from your device
                  </p>
                  <span className="inline-block mt-2 text-[10px] text-[#888888] uppercase tracking-wider">
                    High resolution JPG, PNG, HEIC, WebP supported
                  </span>
                </div>

                {/* Import Shortcuts Row */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#888888] block text-center">
                    Quick Import Options
                  </span>
                  <div className="grid grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2.5 rounded-xl border border-[#E5DDD5] bg-[#FFFFFF] hover:bg-[#FAF6F0] text-xs font-semibold text-[#2A2A2A] flex flex-col items-center gap-1.5 transition-colors text-center"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <span className="text-[11px] leading-tight">Google Photos</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2.5 rounded-xl border border-[#E5DDD5] bg-[#FFFFFF] hover:bg-[#FAF6F0] text-xs font-semibold text-[#2A2A2A] flex flex-col items-center gap-1.5 transition-colors text-center"
                    >
                      <svg className="w-4 h-4 text-pink-600 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <span className="text-[11px] leading-tight">Instagram</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2.5 rounded-xl border border-[#E5DDD5] bg-[#FFFFFF] hover:bg-[#FAF6F0] text-xs font-semibold text-[#2A2A2A] flex flex-col items-center gap-1.5 transition-colors text-center"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                      <span className="text-[11px] leading-tight">WhatsApp</span>
                    </button>
                  </div>
                </div>

                {/* Prominent Live Counter Pill & One-Click Demo Loader */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#E5DDD5]">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-3 h-3 rounded-full ${isStep1Valid ? "bg-emerald-600" : "bg-[#C9A769] animate-pulse"}`} />
                    <span className="text-xs font-bold text-[#3D1117]">
                      {photos.length}/{MIN_PHOTOS_REQUIRED} photos uploaded
                    </span>
                    {isStep1Valid && (
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        Ready to Proceed ✓
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={loadSamplePhotos}
                      className="text-xs font-semibold text-[#3D1117] bg-[#F0E8DC] hover:bg-[#E5DDD5] px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C9A769]" />
                      <span>Demo 42 Photos</span>
                    </button>
                    {photos.length > 0 && (
                      <button
                        type="button"
                        onClick={clearPhotos}
                        className="text-xs text-[#2A2A2A]/60 hover:text-red-700 p-1.5"
                        title="Clear all photos"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Uploaded Thumbnails Grid */}
                {photos.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#888888]">
                      Uploaded Photos ({photos.length})
                    </span>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-2 bg-[#FFFFFF] rounded-2xl border border-[#E5DDD5]">
                      {photos.map((photo) => (
                        <div
                          key={photo.id}
                          className="relative aspect-square rounded-xl overflow-hidden group border border-[#E5DDD5] bg-[#FAF6F0]"
                        >
                          <Image src={photo.url} alt={photo.name} fill className="object-cover" />
                          <button
                            type="button"
                            onClick={() => removePhoto(photo.id)}
                            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#3D1117]/85 hover:bg-[#3D1117] text-[#FAF6F0] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ------------------------------------------------------------ */}
            {/* STEP 2: SCENT CONFIRMATION & SWAPPING */}
            {/* ------------------------------------------------------------ */}
            {orderStep === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D1117] tracking-tight">
                    Your Signature Scent
                  </h2>
                  <p className="text-xs sm:text-sm text-[#2A2A2A]/75 leading-relaxed">
                    {hasScent ? (
                      <>
                        Paired with <span className="font-semibold text-[#3D1117]">{currentScentObj.name}</span> for your {selectedTheme.category} story.
                      </>
                    ) : (
                      "Photobook only mode (no fragrance included)."
                    )}
                  </p>
                </div>

                {/* Scent Card or Scent Removed State */}
                {hasScent ? (
                  <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5DDD5] p-5 sm:p-6 space-y-5 shadow-warm-sm">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-[#E5DDD5] bg-[#FAF6F0] shrink-0">
                        <Image
                          src={currentScentObj.image}
                          alt={currentScentObj.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="space-y-2 flex-1 text-center sm:text-left">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F0E8DC] text-[#3D1117] text-[10px] font-bold uppercase tracking-wider">
                          <Sparkles className="w-3 h-3 text-[#C9A769]" />
                          <span>75ml Artisanal Flacon Included</span>
                        </div>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3D1117]">
                          {currentScentObj.name}
                        </h3>
                        <p className="font-serif italic text-xs text-[#C9A769]">
                          &ldquo;{currentScentObj.tagline}&rdquo;
                        </p>
                        <p className="text-xs text-[#2A2A2A]/75 leading-relaxed">
                          {currentScentObj.description}
                        </p>
                      </div>
                    </div>

                    {/* Olfactive Notes Breakdown (3 short rows) */}
                    <div className="pt-4 border-t border-[#E5DDD5] space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#888888] block">
                        Olfactive Pyramid
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                        <div className="p-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DDD5]/70">
                          <span className="text-[10px] font-bold uppercase text-[#C9A769] block">Top Notes</span>
                          <span className="text-[#2A2A2A] font-medium leading-tight block mt-0.5">
                            {currentScentObj.notes.top.join(", ")}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DDD5]/70">
                          <span className="text-[10px] font-bold uppercase text-[#C9A769] block">Heart Notes</span>
                          <span className="text-[#2A2A2A] font-medium leading-tight block mt-0.5">
                            {currentScentObj.notes.mid.join(", ")}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DDD5]/70">
                          <span className="text-[10px] font-bold uppercase text-[#C9A769] block">Base Notes</span>
                          <span className="text-[#2A2A2A] font-medium leading-tight block mt-0.5">
                            {currentScentObj.notes.base.join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Scent Actions: Swap or Remove */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E5DDD5]">
                      <button
                        type="button"
                        onClick={() => setIsSwappingScent(!isSwappingScent)}
                        className="w-full sm:w-auto px-4 py-2 rounded-xl border border-[#3D1117] text-[#3D1117] hover:bg-[#FAF6F0] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-[#C9A769]" />
                        <span>{isSwappingScent ? "Close Scent Picker" : "Swap Scent"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setHasScent(false)}
                        className="text-xs text-[#2A2A2A]/60 hover:text-red-700 underline transition-colors"
                      >
                        Remove Scent (Save 170 AED → 429 AED)
                      </button>
                    </div>

                    {/* Inline Scent Picker when Swap is clicked */}
                    {isSwappingScent && (
                      <div className="pt-4 border-t border-[#E5DDD5] space-y-3 animate-in fade-in duration-200">
                        <span className="text-xs font-bold text-[#3D1117] block">
                          Choose an alternate signature perfume from our Atelier:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {STORY_THEMES.map((theme) => {
                            const isSelected = selectedScentName.toLowerCase() === theme.scent.name.toLowerCase();
                            return (
                              <button
                                key={theme.id}
                                type="button"
                                onClick={() => {
                                  setSelectedScentName(theme.scent.name);
                                  setIsSwappingScent(false);
                                }}
                                className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                                  isSelected
                                    ? "border-[#3D1117] bg-[#F0E8DC] shadow-sm"
                                    : "border-[#E5DDD5] bg-[#FAF6F0] hover:border-[#C9A769]"
                                }`}
                              >
                                <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-[#E5DDD5]">
                                  <Image src={theme.scent.image} alt={theme.scent.name} fill className="object-cover" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <span className="font-serif font-bold text-xs text-[#3D1117] block truncate">
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
                  <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5DDD5] p-6 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#F0E8DC] text-[#3D1117] mx-auto flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-[#3D1117]" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#3D1117]">
                      Photobook Only Selected (429 AED)
                    </h3>
                    <p className="text-xs text-[#2A2A2A]/75 max-w-sm mx-auto">
                      Your order will include 1× 20-Page Handcrafted Heirloom Hardcover Book without the 75ml perfume pairing.
                    </p>
                    <button
                      type="button"
                      onClick={() => setHasScent(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C9A769] hover:underline pt-2"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Add signature scent back (+170 AED)</span>
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* ------------------------------------------------------------ */}
            {/* STEP 3: PAGES & FORMAT */}
            {/* ------------------------------------------------------------ */}
            {orderStep === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D1117] tracking-tight">
                    Pages & Format
                  </h2>
                  <p className="text-xs sm:text-sm text-[#2A2A2A]/75 leading-relaxed">
                    Your book includes <span className="font-semibold text-[#3D1117]">{BASE_PAGES} pages</span> — add more if your story needs the space.
                  </p>
                </div>

                {/* Base Specification Card */}
                <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5DDD5] p-5 sm:p-6 space-y-4 shadow-warm-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E5DDD5]">
                    <div>
                      <span className="font-serif font-bold text-base sm:text-lg text-[#3D1117] block">
                        {BASE_PAGES} Pages Included
                      </span>
                      <span className="text-xs text-[#2A2A2A]/70 block">
                        Base 21cm × 26cm Heirloom Hardcover Book
                      </span>
                    </div>
                    <span className="text-xs font-bold bg-[#F0E8DC] text-[#3D1117] px-3 py-1 rounded-full">
                      Included
                    </span>
                  </div>

                  {/* Stepper (+ / -) to Add Extra Pages */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#3D1117] block">
                        Add Extra Spreads
                      </span>
                      <span className="text-xs text-[#2A2A2A]/70">
                        {EXTRA_PAGE_PRICE_AED} AED per page (in 2-page spreads)
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setExtraPages(Math.max(0, extraPages - 2))}
                        disabled={extraPages === 0}
                        className={`w-10 h-10 rounded-full border border-[#E5DDD5] flex items-center justify-center transition-colors ${
                          extraPages === 0 ? "opacity-30 cursor-not-allowed bg-[#FAF6F0]" : "hover:bg-[#FAF6F0] text-[#3D1117]"
                        }`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <div className="text-center min-w-16">
                        <span className="font-serif text-2xl font-bold text-[#3D1117] block leading-none">
                          {totalPages}
                        </span>
                        <span className="text-[10px] text-[#888888] font-bold uppercase tracking-wider">
                          Pages
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setExtraPages(extraPages + 2)}
                        className="w-10 h-10 rounded-full border border-[#E5DDD5] hover:bg-[#FAF6F0] text-[#3D1117] flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Live Line-Item Add-On Cost */}
                  <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E5DDD5] flex items-center justify-between text-xs">
                    <span className="text-[#2A2A2A]/80 font-medium">
                      {extraPages > 0 ? `+${extraPages} extra pages add-on` : "Base page count"}
                    </span>
                    <span className="font-bold text-[#3D1117]">
                      {extraPages > 0 ? `+${extraCost} AED` : "0 AED (Included)"}
                    </span>
                  </div>
                </div>

                {/* Heirloom Quality Pillars */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E5DDD5] space-y-1">
                    <span className="font-serif font-bold text-[#3D1117] block">250gsm Archival Paper</span>
                    <p className="text-[11px] text-[#2A2A2A]/70 leading-tight">Fingerprint-resistant museum matte coating.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E5DDD5] space-y-1">
                    <span className="font-serif font-bold text-[#3D1117] block">180° Lay-Flat Binding</span>
                    <p className="text-[11px] text-[#2A2A2A]/70 leading-tight">Full spreads stretch seamlessly across gutter.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ------------------------------------------------------------ */}
            {/* STEP 4: PERSONALIZE */}
            {/* ------------------------------------------------------------ */}
            {orderStep === 4 && (
              <motion.div
                key="step4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="space-y-5"
              >
                {/* Header */}
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D1117] tracking-tight">
                    Personalize Your Story
                  </h2>
                  <p className="text-xs sm:text-sm text-[#2A2A2A]/75 leading-relaxed">
                    Make this copy your own with custom inscriptions and delivery details.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5DDD5] p-5 sm:p-6 space-y-4 shadow-warm-sm">
                  
                  {/* Book Title */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3D1117] mb-1">
                      Book Title (Front Cover Foil)
                    </label>
                    <input
                      type="text"
                      value={bookTitle}
                      onChange={(e) => setBookTitle(e.target.value)}
                      placeholder="e.g. CROATIA & THE ADRIATIC"
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-[#E5DDD5] bg-[#FAF6F0] focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A769]/50 text-[#2A2A2A] font-serif uppercase font-bold"
                    />
                  </div>

                  {/* Dedication / Subtitle */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3D1117] mb-1">
                      Dedication or Subtitle <span className="text-[10px] text-[#888888] normal-case font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={dedication}
                      onChange={(e) => setDedication(e.target.value)}
                      placeholder="for the summer we don't want to forget"
                      className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-[#E5DDD5] bg-[#FAF6F0] focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A769]/50 text-[#2A2A2A] italic"
                    />
                  </div>

                  {/* Name (Required) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3D1117] mb-1">
                      Your Name <span className="text-red-700">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#888888] absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Layla Al-Mansoor"
                        className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[#E5DDD5] bg-[#FAF6F0] focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A769]/50 text-[#2A2A2A]"
                      />
                    </div>
                  </div>

                  {/* Delivery Area Dropdown (Required) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3D1117] mb-1">
                      Delivery Area / Emirate <span className="text-red-700">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#888888] absolute left-3.5 top-3" />
                      <select
                        value={deliveryArea}
                        onChange={(e) => setDeliveryArea(e.target.value)}
                        className="w-full text-sm pl-10 pr-8 py-2.5 rounded-xl border border-[#E5DDD5] bg-[#FAF6F0] focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A769]/50 text-[#2A2A2A] appearance-none"
                      >
                        {EMIRATES_LIST.map((emirate) => (
                          <option key={emirate} value={emirate}>
                            {emirate}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#888888] absolute right-3.5 top-3 pointer-events-none" />
                    </div>
                  </div>

                  <p className="text-[11px] text-[#888888] leading-tight pt-1">
                    No phone number required here — your WhatsApp profile will automatically connect when you submit your proof.
                  </p>
                </div>
              </motion.div>
            )}

            {/* ------------------------------------------------------------ */}
            {/* STEP 5: REVIEW & SEND */}
            {/* ------------------------------------------------------------ */}
            {orderStep === 5 && (
              <motion.div
                key="step5"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="space-y-6"
              >
                {!isSent ? (
                  <>
                    {/* Header */}
                    <div className="space-y-1">
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D1117] tracking-tight">
                        Review Your Story
                      </h2>
                      <p className="text-xs sm:text-sm text-[#2A2A2A]/75 leading-relaxed">
                        Everything look good? Let&apos;s send it to WhatsApp for digital proofing.
                      </p>
                    </div>

                    {/* Receipt-Style Summary Card */}
                    <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5DDD5] p-5 sm:p-6 space-y-4 shadow-warm-sm divide-y divide-[#E5DDD5]">
                      
                      {/* Product & Cover Row */}
                      <div className="flex items-center justify-between pb-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg bg-[#FAF6F0] border border-[#E5DDD5] overflow-hidden shrink-0">
                            <Image
                              src={selectedTemplate?.thumbnail || "/images/photo-table-display.png"}
                              alt={productName}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <div>
                            <span className="font-serif font-bold text-sm text-[#3D1117] block">
                              {productName}
                            </span>
                            <span className="text-[11px] text-[#2A2A2A]/70 block">
                              Theme: {selectedTheme.name}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => jumpToStep(1)}
                          className="p-1.5 rounded-lg text-[#888888] hover:text-[#3D1117] hover:bg-[#FAF6F0]"
                          title="Edit Photos"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Scent Row */}
                      <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <Droplets className="w-4 h-4 text-[#C9A769]" />
                          <div>
                            <span className="text-xs font-bold text-[#3D1117] block">
                              {hasScent ? selectedScentName : "No Scent Added"}
                            </span>
                            <span className="text-[10px] text-[#2A2A2A]/70 block">
                              {hasScent ? "75ml Eau de Parfum Flacon" : "Photobook Only"}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => jumpToStep(2)}
                          className="p-1.5 rounded-lg text-[#888888] hover:text-[#3D1117] hover:bg-[#FAF6F0]"
                          title="Edit Scent"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Pages Row */}
                      <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-4 h-4 text-[#C9A769]" />
                          <div>
                            <span className="text-xs font-bold text-[#3D1117] block">
                              {totalPages} Pages {extraPages > 0 ? `(${BASE_PAGES} + ${extraPages} extra)` : ""}
                            </span>
                            <span className="text-[10px] text-[#2A2A2A]/70 block">
                              250gsm Fine Art Archival Paper
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => jumpToStep(3)}
                          className="p-1.5 rounded-lg text-[#888888] hover:text-[#3D1117] hover:bg-[#FAF6F0]"
                          title="Edit Pages"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Personalization Row */}
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <span className="text-xs font-bold text-[#3D1117] block">
                            &ldquo;{bookTitle || productName}&rdquo;
                          </span>
                          <span className="text-[10px] text-[#2A2A2A]/70 block">
                            For: {customerName || "Friend"} • {deliveryArea}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => jumpToStep(4)}
                          className="p-1.5 rounded-lg text-[#888888] hover:text-[#3D1117] hover:bg-[#FAF6F0]"
                          title="Edit Personalization"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Photos Count & Final Investment */}
                      <div className="pt-4 flex items-baseline justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#888888] block">
                            Total Investment
                          </span>
                          <span className="text-[11px] text-emerald-700 font-semibold">
                            {photos.length} photos ready for layout
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="font-serif text-3xl font-bold text-[#3D1117]">
                            {totalPriceAed.toLocaleString()} AED
                          </span>
                          <span className="text-[10px] text-[#888888] block">
                            Free UAE temperature-controlled delivery
                          </span>
                        </div>
                      </div>

                    </div>
                  </>
                ) : (
                  /* Immediate Lightweight Confirmation Screen */
                  <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5DDD5] p-6 sm:p-8 text-center space-y-5 animate-in fade-in duration-300">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-700" />
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-serif text-2xl font-bold text-[#3D1117]">
                        Connecting to WhatsApp Concierge...
                      </h3>
                      <p className="text-xs sm:text-sm text-[#2A2A2A]/80 max-w-md mx-auto leading-relaxed">
                        Your story order is on its way. Continue the conversation on WhatsApp to review your digital flip-proof before printing.
                      </p>
                    </div>

                    {/* Manual Fallback Actions */}
                    <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E5DDD5] space-y-3 max-w-md mx-auto text-left">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#3D1117]">Direct Atelier Contact:</span>
                        <span className="font-mono text-[#2A2A2A] font-bold">+971 50 000 0000</span>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={handleCopyMessage}
                          className="w-full sm:flex-1 py-2 px-3 rounded-lg border border-[#E5DDD5] bg-[#FFFFFF] hover:bg-[#FAF6F0] text-xs font-semibold text-[#3D1117] flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5 text-[#C9A769]" />
                          <span>{copiedMessage ? "Copied to Clipboard! ✓" : "Copy Message"}</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleSendToWhatsApp}
                          className="w-full sm:flex-1 py-2 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Open WhatsApp</span>
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsOrderDrawerOpen(false)}
                      className="text-xs text-[#2A2A2A]/60 hover:text-[#3D1117] font-medium pt-2"
                    >
                      Return to Product Page
                    </button>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </main>

        {/* ============================================================ */}
        {/* PERSISTENT FOOTER (Back Button + Primary Action Button) */}
        {/* ============================================================ */}
        {!isSent && (
          <footer className="px-6 py-4 border-t border-[#E5DDD5] bg-[#FAF6F0] flex items-center justify-between gap-3 shrink-0 z-10">
            
            {/* Back Button (Hidden on Step 1) */}
            {orderStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-3 rounded-full border border-[#E5DDD5] bg-[#FFFFFF] hover:bg-[#FAF6F0] text-[#3D1117] text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {/* Primary Action Button */}
            <div className="flex items-center gap-3">
              {orderStep === 1 && !isStep1Valid && (
                <span className="text-xs text-[#888888] font-medium hidden sm:inline">
                  {photosNeeded} more photos needed
                </span>
              )}

              {orderStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={orderStep === 1 ? !isStep1Valid : orderStep === 4 ? !isStep4Valid : false}
                  className={`px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wide flex items-center gap-2 shadow-warm-sm transition-all duration-300 ${
                    (orderStep === 1 && !isStep1Valid) || (orderStep === 4 && !isStep4Valid)
                      ? "bg-[#E5DDD5] text-[#888888] cursor-not-allowed"
                      : "bg-[#3D1117] hover:bg-[#5C1A22] text-[#FAF6F0] transform hover:-translate-y-0.5"
                  }`}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4 text-[#C9A769]" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSendToWhatsApp}
                  className="px-8 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm tracking-wide flex items-center gap-2 shadow-warm-md transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Send My Story to WhatsApp</span>
                </button>
              )}
            </div>

          </footer>
        )}

      </div>
    </div>
  );
};
