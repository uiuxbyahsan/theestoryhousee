"use client";

import { BuilderChrome, StepHead } from "@/components/BuilderChrome";
import { ScentCard } from "@/components/cards";
import { useBuilder } from "@/lib/store";
import {
  SCENTS,
  templateById,
  scentById,
  scentsByCategory,
} from "@/lib/data";

export default function ScentStep() {
  const { templateId, scentId, setScent, bundleId, setBundle } = useBuilder();

  // Sync the single-book bundle tier with the scent choice so the price
  // header reflects it (429 book-only ↔ 599 book + scent, Section 7D).
  // Duo / Family Pack are explicit multi-item tiers and left untouched.
  function chooseScent(id: string | null) {
    setScent(id);
    if (id && bundleId === "the-story") setBundle("the-story-scent");
    if (id === null && bundleId === "the-story-scent") setBundle("the-story");
  }

  const template = templateId ? templateById(templateId) : null;
  const recommendedId = template?.pairedScent ?? "velvet-nights";
  const recommendedScent = scentById(recommendedId);
  const category = template?.category ?? recommendedScent?.category;

  const categoryScents = category ? scentsByCategory(category) : [];
  const otherScents = SCENTS.filter((s) => !categoryScents.includes(s));

  return (
    <BuilderChrome step={2} backHref="/build/photos" wide>
      <StepHead
        step={2}
        before="Pair a signature"
        accent="scent"
        sub="Choose the scent that matches your story, or skip it entirely."
      />

      {/* Category-matched scents */}
      {categoryScents.length > 0 && (
        <>
          <h2 className="mb-4 text-[15px] font-semibold">
            {category} scents for your story
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoryScents.map((s) => (
              <ScentCard
                key={s.id}
                scent={s}
                selected={scentId === s.id}
                recommended={s.id === recommendedId}
                onSelect={() => chooseScent(s.id)}
              />
            ))}
          </div>
        </>
      )}

      {/* Browse all */}
      <h2 className="mb-4 mt-10 text-[15px] font-semibold">Browse all scents</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {otherScents.map((s) => (
          <ScentCard
            key={s.id}
            scent={s}
            selected={scentId === s.id}
            onSelect={() => chooseScent(s.id)}
          />
        ))}
      </div>

      {/* Divider + No scent */}
      <div className="my-8 flex items-center gap-4 text-[13px] font-semibold tracking-wider2 text-text-muted">
        <span className="h-px flex-1 bg-divider" />
        OR
        <span className="h-px flex-1 bg-divider" />
      </div>
      <button
        onClick={() => chooseScent(null)}
        className={`flex w-full items-center justify-between border px-6 py-5 text-left transition-colors ${
          scentId === null ? "border-black bg-bg-alt" : "border-divider hover:border-black"
        }`}
      >
        <span className="flex items-center gap-3">
          <span className="text-2xl">📖</span>
          <span>
            <span className="block text-[15px] font-semibold">Continue with your photobook only</span>
            <span className="block text-[13px] text-text-muted">No scent added to this order</span>
          </span>
        </span>
        <span className="text-[13px] font-semibold">
          {scentId === null ? "Selected ✓" : "Select"}
        </span>
      </button>
    </BuilderChrome>
  );
}
