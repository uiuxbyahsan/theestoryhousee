"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  STORY_THEMES, 
  BUNDLES, 
  BASE_PAGES, 
  MIN_PHOTOS_REQUIRED, 
  EXTRA_PAGE_PRICE_AED, 
  StoryTheme, 
  BundleOption 
} from "@/data/products";
import { COVER_TEMPLATES, CoverTemplate } from "@/data/templates";
import { generateWhatsAppOrderUrl } from "@/utils/whatsapp";

export interface UploadedPhoto {
  id: string;
  url: string;
  name: string;
  caption?: string;
  isCover?: boolean;
}

interface StoryContextType {
  selectedTheme: StoryTheme;
  setSelectedTheme: (theme: StoryTheme) => void;
  selectedTemplate: CoverTemplate | null;
  setSelectedTemplate: (template: CoverTemplate | null) => void;
  selectedBundle: BundleOption;
  setSelectedBundle: (bundle: BundleOption) => void;
  selectedScentName: string;
  setSelectedScentName: (scent: string) => void;
  extraPages: number;
  setExtraPages: (pages: number) => void;
  photos: UploadedPhoto[];
  addPhotos: (newPhotos: UploadedPhoto[]) => void;
  removePhoto: (id: string) => void;
  updatePhotoCaption: (id: string, caption: string) => void;
  reorderPhotos: (startIndex: number, endIndex: number) => void;
  loadSamplePhotos: () => void;
  clearPhotos: () => void;
  bookTitle: string;
  setBookTitle: (title: string) => void;
  bookSubtitle: string;
  setBookSubtitle: (sub: string) => void;
  dedication: string;
  setDedication: (dedication: string) => void;
  totalPriceAed: number;
  whatsAppOrderUrl: string;
  isCustomScentModalOpen: boolean;
  setIsCustomScentModalOpen: (open: boolean) => void;
  isTemplateModalOpen: boolean;
  setIsTemplateModalOpen: (open: boolean) => void;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

const SAMPLE_PHOTOS: UploadedPhoto[] = [
  { id: "sample-1", url: "/images/ugc-dubai-couple.jpg", name: "Desert_Golden_Hour.jpg", caption: "Sunset across the dunes, laughter echoing" },
  { id: "sample-2", url: "/images/theme-voyage.jpg", name: "Amalfi_Coast_Morning.jpg", caption: "Sirocco winds and sea salt on our skin" },
  { id: "sample-3", url: "/images/ugc-unboxing-box.jpg", name: "The_Keepsake_Box.jpg", caption: "Unboxing memories together" },
  { id: "sample-4", url: "/images/theme-vow.jpg", name: "The_Vow_Altar.jpg", caption: "Under the white camellias, forever" },
  { id: "sample-5", url: "/images/craftsmanship-ritual.jpg", name: "Archival_Page_Turn.jpg", caption: "A story to read and smell again" },
  { id: "sample-6", url: "/images/theme-kinship.jpg", name: "Rooftop_Celebration.jpg", caption: "The family we chose along the way" },
  { id: "sample-7", url: "/images/theme-baby.jpg", name: "First_Morning_Home.jpg", caption: "Tiny hands, softest breath" },
  { id: "sample-8", url: "/images/theme-reverie.jpg", name: "Candlelight_Letters.jpg", caption: "Your words still guide us daily" },
];

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState<StoryTheme>(STORY_THEMES[0]);
  const [selectedTemplate, setSelectedTemplate] = useState<CoverTemplate | null>(null);
  const [selectedBundle, setSelectedBundle] = useState<BundleOption>(
    BUNDLES.find((b) => b.id === "story-and-scent") || BUNDLES[1]
  );
  const [selectedScentName, setSelectedScentName] = useState<string>(STORY_THEMES[0].scent.name);
  const [extraPages, setExtraPages] = useState<number>(0);
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [bookTitle, setBookTitle] = useState<string>("MY STORY");
  const [bookSubtitle, setBookSubtitle] = useState<string>("A Sensory Odyssey");
  const [dedication, setDedication] = useState<string>("For the roads we walked together and the memories that will never fade.");
  const [isCustomScentModalOpen, setIsCustomScentModalOpen] = useState<boolean>(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState<boolean>(false);

  // When theme changes, sync template if needed
  useEffect(() => {
    setSelectedScentName(selectedTheme.scent.name);
  }, [selectedTheme]);

  // When template changes, sync theme and defaults
  useEffect(() => {
    if (!selectedTemplate) return;
    const matchingTheme = STORY_THEMES.find((t) => t.category.toLowerCase() === selectedTemplate.theme.toLowerCase()) || STORY_THEMES[0];
    setSelectedTheme(matchingTheme);
    setSelectedScentName(selectedTemplate.pairedScent || matchingTheme.scent.name);
    setBookTitle(selectedTemplate.name.toUpperCase());
    setBookSubtitle(selectedTemplate.spineFormat || "A Sensory Odyssey");
  }, [selectedTemplate]);

  const addPhotos = (newPhotos: UploadedPhoto[]) => {
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePhotoCaption = (id: string, caption: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, caption } : p))
    );
  };

  const reorderPhotos = (startIndex: number, endIndex: number) => {
    setPhotos((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  const loadSamplePhotos = () => {
    const filled: UploadedPhoto[] = [];
    for (let i = 0; i < 42; i++) {
      const base = SAMPLE_PHOTOS[i % SAMPLE_PHOTOS.length];
      filled.push({
        id: `photo-auto-${i + 1}`,
        url: base.url,
        name: `Memory_Capture_${i + 1}.jpg`,
        caption: `Chapter ${Math.floor(i / 2) + 1} — ${base.caption}`,
      });
    }
    setPhotos(filled);
  };

  const clearPhotos = () => {
    setPhotos([]);
  };

  const totalPriceAed = selectedBundle.price + (extraPages * EXTRA_PAGE_PRICE_AED);

  const whatsAppOrderUrl = generateWhatsAppOrderUrl({
    bundleName: selectedBundle.name,
    themeName: selectedTheme.name,
    templateName: selectedTemplate?.name,
    basePages: BASE_PAGES,
    extraPages,
    scentName: selectedScentName,
    photoCount: photos.length,
    minPhotos: MIN_PHOTOS_REQUIRED,
    bookTitle,
    bookSubtitle,
    dedication,
    totalPriceAed,
  });

  return (
    <StoryContext.Provider
      value={{
        selectedTheme,
        setSelectedTheme,
        selectedTemplate,
        setSelectedTemplate,
        selectedBundle,
        setSelectedBundle,
        selectedScentName,
        setSelectedScentName,
        extraPages,
        setExtraPages,
        photos,
        addPhotos,
        removePhoto,
        updatePhotoCaption,
        reorderPhotos,
        loadSamplePhotos,
        clearPhotos,
        bookTitle,
        setBookTitle,
        bookSubtitle,
        setBookSubtitle,
        dedication,
        setDedication,
        totalPriceAed,
        whatsAppOrderUrl,
        isCustomScentModalOpen,
        setIsCustomScentModalOpen,
        isTemplateModalOpen,
        setIsTemplateModalOpen,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error("useStory must be used within a StoryProvider");
  }
  return context;
};
