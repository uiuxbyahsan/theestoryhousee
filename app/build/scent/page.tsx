"use client";

import { useState } from "react";
import { BuilderChrome, StepHead } from "@/components/BuilderChrome";
import { ScentCard } from "@/components/cards";
import { useBuilder } from "@/lib/store";
import {
  SCENTS,
  CATEGORIES,
  templateById,
  scentById,
  type Category,
} from "@/lib/data";

export default function ScentStep() {
  const { templateId, scentId, setScent, bundleId, setBundle } = useBuilder();

  // Track if user has explicitly made a selection on this step
  const [hasChosen, setHasChosen] = useState<boolean>(scentId !== null);
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  function chooseScent(id: string | null) {
    setHasChosen(true);
    setScent(id);
    if (id) {
      if (bundleId === "the-story") setBundle("the-story-scent");
    } else {
      if (bundleId === "the-story-scent") setBundle("the-story");
    }
  }

  const template = templateId ? templateById(templateId) : null;
  const pairedScentId = template?.pairedScent;

  const displayedScents =
    activeCategory === "All"
      ? SCENTS
      : SCENTS.filter((s) => s.category === activeCategory);

  return (
    <BuilderChrome
      step={2}
      backHref="/build/photos"
      nextDisabled={!hasChosen}
      nextLabel={hasChosen ? "Continue to Personalize" : "Select an option to continue"}
      wide
    >
      {/* Book Only Option at the Top */}
      <button
        type="button"
        onClick={() => chooseScent(null)}
        className={`mb-8 flex w-full items-center justify-between border p-5 text-left transition-colors ${
          hasChosen && scentId === null
            ? "border-black bg-bg-alt ring-1 ring-black"
            : "border-divider bg-card-bg hover:border-black"
        }`}
      >
        <span className="flex items-center gap-4">
          <span className="text-3xl">📖</span>
          <span>
            <span className="block text-[16px] font-semibold text-black">
              Continue with your photobook only
            </span>
            <span className="block text-[13px] text-text-muted">
              No 80ml signature fragrance added (Photobook 180 AED)
            </span>
          </span>
        </span>
        <span
          className={`rounded-button px-4 py-2 text-[13px] font-semibold transition-colors ${
            hasChosen && scentId === null
              ? "bg-black text-white"
              : "border border-divider text-black hover:border-black"
          }`}
        >
          {hasChosen && scentId === null ? "Selected ✓" : "Choose Book Only"}
        </span>
      </button>

      <div className="mb-8 flex items-center gap-4 text-[12px] font-semibold tracking-wider2 text-text-muted">
        <span className="h-px flex-1 bg-divider" />
        OR PAIR WITH A SIGNATURE FRAGRANCE (+70 AED)
        <span className="h-px flex-1 bg-divider" />
      </div>

      <StepHead
        step={2}
        before="Pair a signature"
        accent="scent"
        sub="Every story comes to life with fragrance. Choose an 80ml fine perfume below, or continue book-only above."
      />

      {/* Category Tabs Filter */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-divider pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("All")}
            className={`rounded-button px-4 py-2 text-[13px] font-semibold transition-colors ${
              activeCategory === "All"
                ? "bg-black text-white"
                : "border border-divider bg-card-bg text-text-muted hover:border-black hover:text-black"
            }`}
          >
            All Scents ({SCENTS.length})
          </button>
          {CATEGORIES.map((c) => {
            const count = SCENTS.filter((s) => s.category === c).length;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActiveCategory(c)}
                className={`rounded-button px-4 py-2 text-[13px] font-semibold transition-colors ${
                  activeCategory === c
                    ? "bg-black text-white"
                    : "border border-divider bg-card-bg text-text-muted hover:border-black hover:text-black"
                }`}
              >
                {c} ({count})
              </button>
            );
          })}
        </div>

        {scentId && (
          <span className="text-[13px] font-medium text-black">
            Selected: <strong className="font-semibold">{scentById(scentId)?.name}</strong> (80ml)
          </span>
        )}
      </div>

      {/* Fragrances Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {displayedScents.map((s) => (
          <ScentCard
            key={s.id}
            scent={s}
            selected={scentId === s.id}
            recommended={s.id === pairedScentId}
            buttonLabel="Select This Scent"
            onSelect={() => chooseScent(s.id)}
          />
        ))}
      </div>

      {!hasChosen && (
        <p className="mt-8 text-center text-[13px] text-text-muted">
          Please select a signature fragrance above or click &ldquo;Choose Book Only&rdquo; at the top to continue.
        </p>
      )}
    </BuilderChrome>
  );
}
