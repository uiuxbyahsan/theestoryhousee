"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Camera, Sparkles, X, ArrowRight, Trash2, ArrowLeft } from "lucide-react";
import { useStory, UploadedPhoto } from "@/context/StoryContext";
import { MIN_PHOTOS_REQUIRED } from "@/data/products";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export default function BuildPhotosPage() {
  const router = useRouter();
  const {
    selectedTheme,
    selectedTemplate,
    photos,
    addPhotos,
    removePhoto,
    loadSamplePhotos,
    clearPhotos,
  } = useStory();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const productName = selectedTemplate?.name || selectedTheme.name;
  const photosNeeded = Math.max(0, MIN_PHOTOS_REQUIRED - photos.length);
  const isValid = photos.length >= MIN_PHOTOS_REQUIRED;

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

  const handleContinue = () => {
    if (isValid) {
      router.push("/build/scent");
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="space-y-2 text-center sm:text-left">
        <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C9A769] block">
          Step 1 • Digital Curation
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3D1117] tracking-tight">
          Upload Your Photos
        </h1>
        <p className="text-sm sm:text-base text-[#2A2A2A]/75 max-w-2xl leading-relaxed">
          Choose at least <strong className="text-[#3D1117] font-semibold">{MIN_PHOTOS_REQUIRED} HD photos</strong> to bring <span className="font-serif font-bold text-[#3D1117]">&ldquo;{productName}&rdquo;</span> to life across 20 heirloom lay-flat spreads.
        </p>
      </div>

      {/* Drag-and-Drop Upload Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-[#C9A769]/60 hover:border-[#3D1117] bg-[#FFFFFF] rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 group hover:shadow-warm-md"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border border-[#E5DDD5] text-[#C9A769] mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
          <Camera className="w-8 h-8 text-[#C9A769]" />
        </div>
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#3D1117] mt-4">
          Drag & Drop Your Photos Here
        </h3>
        <p className="text-sm text-[#2A2A2A]/70 mt-1">
          or <span className="text-[#C9A769] font-bold underline">browse files</span> from your phone or computer
        </p>
        <div className="pt-3">
          <span className="inline-block px-3 py-1 rounded-full bg-[#FAF6F0] text-[11px] font-semibold text-[#888888] uppercase tracking-wider border border-[#E5DDD5]">
            High-Resolution JPG, PNG, HEIC, WebP Supported
          </span>
        </div>
      </div>

      {/* Import Shortcuts Row */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#888888] block text-center sm:text-left">
          Convenient Import Shortcuts
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-3.5 rounded-2xl border border-[#E5DDD5] bg-[#FFFFFF] hover:bg-[#FAF6F0] text-xs font-semibold text-[#2A2A2A] flex items-center justify-center gap-2.5 transition-all shadow-xs hover:border-[#C9A769]"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Import from Google Photos</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-3.5 rounded-2xl border border-[#E5DDD5] bg-[#FFFFFF] hover:bg-[#FAF6F0] text-xs font-semibold text-[#2A2A2A] flex items-center justify-center gap-2.5 transition-all shadow-xs hover:border-[#C9A769]"
          >
            <svg className="w-4 h-4 text-pink-600 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span>Import from Instagram</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-3.5 rounded-2xl border border-[#E5DDD5] bg-[#FFFFFF] hover:bg-[#FAF6F0] text-xs font-semibold text-[#2A2A2A] flex items-center justify-center gap-2.5 transition-all shadow-xs hover:border-[#C9A769]"
          >
            <WhatsAppIcon className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Import from WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Prominent Live Counter Pill & 1-Click Demo Loader */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#E5DDD5] shadow-warm-sm">
        <div className="flex items-center gap-3">
          <div className={`w-3.5 h-3.5 rounded-full ${isValid ? "bg-emerald-600" : "bg-[#C9A769] animate-pulse"}`} />
          <div>
            <span className="font-serif font-bold text-base sm:text-lg text-[#3D1117] block">
              {photos.length} / {MIN_PHOTOS_REQUIRED} photos uploaded
            </span>
            <span className="text-xs text-[#2A2A2A]/70">
              {isValid
                ? "Heirloom minimum achieved — you can add even more anytime"
                : `${photosNeeded} more photo${photosNeeded === 1 ? "" : "s"} required for 20-page spread balance`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadSamplePhotos}
            className="text-xs font-bold text-[#3D1117] bg-[#F0E8DC] hover:bg-[#E5DDD5] px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-xs hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-[#C9A769]" />
            <span>✨ Load 42 Demo Photos</span>
          </button>

          {photos.length > 0 && (
            <button
              type="button"
              onClick={clearPhotos}
              className="text-xs text-[#2A2A2A]/60 hover:text-red-700 p-2.5 rounded-xl hover:bg-[#FAF6F0]"
              title="Clear all photos"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Uploaded Thumbnail Grid */}
      {photos.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#888888]">
              Curated Uploads ({photos.length} photos)
            </span>
            <span className="text-xs text-[#C9A769] font-medium">
              Click ✕ on any photo to remove
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-96 overflow-y-auto p-4 bg-[#FFFFFF] rounded-3xl border border-[#E5DDD5]">
            {photos.map((photo, idx) => (
              <div
                key={photo.id}
                className="relative aspect-square rounded-2xl overflow-hidden group border border-[#E5DDD5] bg-[#FAF6F0] shadow-2xs"
              >
                <Image src={photo.url} alt={photo.name} fill className="object-cover" />
                <span className="absolute bottom-1 left-1 bg-[#3D1117]/80 text-[#FAF6F0] text-[9px] font-bold px-1.5 py-0.5 rounded">
                  #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removePhoto(photo.id)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-[#3D1117]/90 hover:bg-[#3D1117] text-[#FAF6F0] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  aria-label="Remove photo"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* PERSISTENT BOTTOM ACTION BAR */}
      {/* ============================================================ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-t border-[#E5DDD5] px-4 sm:px-8 py-4 shadow-warm-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          
          {/* Step 1 links back to Product Page */}
          <Link
            href="/product"
            className="px-5 py-3 rounded-full border border-[#E5DDD5] bg-[#FFFFFF] hover:bg-[#FAF6F0] text-[#3D1117] text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C9A769]" />
            <span>Back to Product</span>
          </Link>

          {/* Continue Button */}
          <div className="flex items-center gap-3">
            {!isValid && (
              <span className="text-xs text-[#888888] font-medium hidden sm:inline">
                {photosNeeded} more photo{photosNeeded === 1 ? "" : "s"} needed to continue
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
              <span>Continue to Scent</span>
              <ArrowRight className="w-4 h-4 text-[#C9A769]" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
