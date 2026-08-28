"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { BASE_PAGES } from "./data";

// Client-side only — no backend. Persists across the /build/* routes so
// navigating back and forth never loses progress (Section 7D).
export interface UploadedPhoto {
  id: string;
  name: string;
  url: string; // object URL (session only)
}

interface BuilderState {
  bundleId: string;
  templateId: string | null;
  scentId: string | null; // null = "No Scent"
  extraPages: number;
  photos: UploadedPhoto[];
  bookTitle: string;
  dedication: string;
  customerName: string;
  deliveryArea: string;
  extraNote: string;

  setBundle: (id: string) => void;
  setTemplate: (id: string) => void;
  setScent: (id: string | null) => void;
  setExtraPages: (n: number) => void;
  addPhotos: (photos: UploadedPhoto[]) => void;
  removePhoto: (id: string) => void;
  setField: (
    field:
      | "bookTitle"
      | "dedication"
      | "customerName"
      | "deliveryArea"
      | "extraNote",
    value: string
  ) => void;
  reset: () => void;
}

const initial = {
  bundleId: "the-story",
  templateId: null as string | null,
  scentId: null as string | null,
  extraPages: 0,
  photos: [] as UploadedPhoto[],
  bookTitle: "",
  dedication: "",
  customerName: "",
  deliveryArea: "",
  extraNote: "",
};

export const useBuilder = create<BuilderState>()(
  persist(
    (set) => ({
      ...initial,
      setBundle: (id) => set({ bundleId: id }),
      setTemplate: (id) => set({ templateId: id }),
      setScent: (id) => set({ scentId: id }),
      setExtraPages: (n) => set({ extraPages: Math.max(0, n) }),
      addPhotos: (photos) =>
        set((s) => ({ photos: [...s.photos, ...photos] })),
      removePhoto: (id) =>
        set((s) => ({ photos: s.photos.filter((p) => p.id !== id) })),
      setField: (field, value) => set({ [field]: value } as Partial<BuilderState>),
      reset: () => set({ ...initial }),
    }),
    {
      name: "story-house-builder",
      // Guard against SSR where sessionStorage is undefined.
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? sessionStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      // Photos use object URLs that die with the tab — don't persist them.
      partialize: (s) => ({
        bundleId: s.bundleId,
        templateId: s.templateId,
        scentId: s.scentId,
        extraPages: s.extraPages,
        bookTitle: s.bookTitle,
        dedication: s.dedication,
        customerName: s.customerName,
        deliveryArea: s.deliveryArea,
        extraNote: s.extraNote,
      }),
    }
  )
);

export const BASE_PAGES_CONST = BASE_PAGES;
