"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ScentBottle } from "./ScentBottle";
import { BookCover } from "./BookCover";
import { TanBadge } from "./ui";
import { ScentModal } from "./ScentModal";
import { TemplateModal } from "./TemplateModal";
import {
  scentById,
  templateById,
  type Bundle,
  type Scent,
  type Category,
} from "@/lib/data";

// Composes the right book/bottle arrangement for each bundle tier.
export function BundleVisual({ bundle }: { bundle: Bundle }) {
  const template = templateById("female-02")!; // "Two Became One"
  const scent = scentById("velvet-nights")!;

  if (bundle.books > 1) {
    return (
      <div className="relative h-full w-full">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute w-[52%]"
            style={{ left: `${18 + i * 9}%`, top: `${6 + i * 7}%`, zIndex: 3 - i }}
          >
            <BookCover template={templateById(["unisex-05", "unisex-01", "female-01"][i])!} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-end justify-center gap-2">
      <div className="w-[52%] -rotate-2">
        <BookCover template={template} />
      </div>
      {bundle.includesScent >= 1 && (
        <div className="w-[30%] translate-y-1">
          <ScentBottle scent={scent} />
        </div>
      )}
      {bundle.includesScent >= 2 && (
        <div className="w-[26%] translate-y-3">
          <ScentBottle scent={scentById("her-story")!} label="gold" />
        </div>
      )}
    </div>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function SparkleIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  );
}

// Unified card design for Bundles and Packages (visually identical to Seven Scents).
// Shows on-image eye icon, small-caps caption, bold title, one-line truncated description,
// and price in the bottom info block slot. Whole card links to ctaHref.
export function BundleCard({
  bundle,
  visual,
  image,
  caption,
  ctaHref = `/product/${bundle.id}`,
}: {
  bundle: Bundle;
  visual?: React.ReactNode;
  image?: string;
  caption?: string;
  ctaHref?: string;
}) {
  const defaultCaption =
    caption ??
    (bundle.books > 1
      ? `${bundle.books} BOOKS · FAMILY SET`
      : bundle.includesScent === 1
      ? "20 PAGES · BOOK + SCENT"
      : bundle.includesScent === 2
      ? "20 PAGES · BOOK + 2 SCENTS"
      : "20 PAGES · BOOK ONLY");

  return (
    <Link
      href={ctaHref}
      className="group relative flex h-full flex-col border border-divider bg-card-bg transition-colors hover:border-black"
    >
      {bundle.hero && (
        <span className="absolute left-3 top-3 z-10">
          <TanBadge>Most loved</TanBadge>
        </span>
      )}
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-bg-alt">
        {image ? (
          <Image src={image} alt={bundle.name} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4 md:p-5">
            {visual}
          </div>
        )}
        <span className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-icon-button bg-white text-black shadow-md transition-transform group-hover:scale-105">
          <EyeIcon />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 md:p-5">
        <span className="eyebrow flex items-center gap-1.5 text-text-muted">
          <SparkleIcon className="h-2.5 w-2.5 text-gold" />
          {defaultCaption}
        </span>
        <h3 className="text-[17px] font-semibold">{bundle.name}</h3>
        <p className="line-clamp-1 text-[13px] text-text-muted">{bundle.blurb}</p>
        <div className="mt-auto flex items-center justify-between border-t border-divider pt-3 text-[14px]">
          <span className="text-[12px] font-semibold uppercase tracking-wider2 text-text-muted">
            Price
          </span>
          <span className="text-[17px] font-semibold text-black">
            {bundle.price} AED
          </span>
        </div>
      </div>
    </Link>
  );
}

// Scent showcase card — unified design used sitewide (reference design)
export function ScentCard({
  scent,
  selected = false,
  recommended = false,
  onSelect,
  buttonLabel = "Select",
  onView,
  href,
}: {
  scent: Scent;
  selected?: boolean;
  recommended?: boolean;
  onSelect?: () => void;
  buttonLabel?: string;
  onView?: () => void;
  href?: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const targetHref = href ?? `/product/${scent.id}`;

  function handleQuickView(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (onView) {
      onView();
    } else {
      setModalOpen(true);
    }
  }

  const cardContent = (
    <>
      {recommended && (
        <span className="absolute left-3 top-3 z-10">
          <TanBadge>Recommended for your story</TanBadge>
        </span>
      )}
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-bg-alt">
        <div className="w-[92px]">
          <ScentBottle scent={scent} />
        </div>
        <button
          type="button"
          onClick={handleQuickView}
          aria-label={`Quick view ${scent.name}`}
          title={`Quick view ${scent.name}`}
          className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-icon-button bg-white text-black shadow-md transition-transform group-hover:scale-105 hover:scale-105"
        >
          <EyeIcon />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 md:p-5">
        <span className="eyebrow flex items-center gap-1.5 text-text-muted">
          <SparkleIcon className="h-2.5 w-2.5 text-gold" />
          FOR {scent.category.toUpperCase()} · 80ML
        </span>
        <h3 className="text-[17px] font-semibold">{scent.name}</h3>
        <dl className="mt-auto space-y-0.5 text-[12px] text-text-muted">
          <div className="flex gap-2">
            <dt className="w-9 shrink-0 font-semibold text-black">Top</dt>
            <dd className="line-clamp-1">{scent.notes.top}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-9 shrink-0 font-semibold text-black">Mid</dt>
            <dd className="line-clamp-1">{scent.notes.mid}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-9 shrink-0 font-semibold text-black">Base</dt>
            <dd className="line-clamp-1">{scent.notes.base}</dd>
          </div>
        </dl>
        {onSelect && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className={`mt-2 rounded-button px-4 py-2.5 text-[13px] font-semibold transition-colors ${
              selected
                ? "bg-black text-white"
                : "border border-black hover:bg-black hover:text-white"
            }`}
          >
            {selected ? "Selected ✓" : buttonLabel}
          </button>
        )}
      </div>
    </>
  );

  return (
    <>
      {onSelect ? (
        <div
          onClick={onSelect}
          className={`group relative flex h-full cursor-pointer flex-col border bg-card-bg transition-colors ${
            selected ? "border-black" : "border-divider hover:border-black"
          }`}
        >
          {cardContent}
        </div>
      ) : (
        <Link
          href={targetHref}
          className={`group relative flex h-full flex-col border bg-card-bg transition-colors hover:border-black ${
            selected ? "border-black" : "border-divider"
          }`}
        >
          {cardContent}
        </Link>
      )}

      <ScentModal
        scent={scent}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={onSelect}
        selected={selected}
      />
    </>
  );
}

// Category tile: a square scent-bottle image (matching the Seven Scents
// card style), with the label and one-line description below.
// Distinct from the unified product card style by design.
// Clicking navigates to the dedicated category page (e.g. /category/male).
export function CategoryCard({
  category,
  title,
  copy,
  scentId,
  href,
}: {
  category: Category;
  title: string;
  copy: string;
  scentId: string;
  href?: string;
}) {
  const scent = scentById(scentId);
  const targetHref = href ?? `/shop?category=${encodeURIComponent(category)}`;

  return (
    <Link
      href={targetHref}
      className="group flex w-full flex-col border border-divider bg-card-bg text-left transition-colors hover:border-black"
    >
      <div className="flex aspect-square items-center justify-center overflow-hidden bg-bg-alt">
        {scent && (
          <div className="w-[96px] transition-transform group-hover:scale-105">
            <ScentBottle scent={scent} />
          </div>
        )}
      </div>
      <div className="p-4 md:p-5">
        <h3 className="text-[16px] font-medium">{title}</h3>
        <p className="mt-1 line-clamp-1 text-[13px] text-text-muted">{copy}</p>
      </div>
    </Link>
  );
}
