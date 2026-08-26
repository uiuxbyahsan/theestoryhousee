import Link from "next/link";
import Image from "next/image";
import { ScentBottle } from "./ScentBottle";
import { BookCover } from "./BookCover";
import { TanBadge } from "./ui";
import {
  THEME_EMOJI,
  scentById,
  templateById,
  type Bundle,
  type Scent,
  type Theme,
} from "@/lib/data";

// Composes the right book/bottle arrangement for each bundle tier.
export function BundleVisual({ bundle }: { bundle: Bundle }) {
  const template = templateById("wedding-02")!; // "Two Became One"
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
            <BookCover template={templateById(["baby-01", "travel-01", "wedding-01"][i])!} />
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

// Sharp-cornered product card (Round 2: 4/3 landscape image, matched row
// height, one-line description). Renders a photo (image) or a composed
// visual node; adds a round Quick View eye icon when requested.
export function BundleCard({
  bundle,
  visual,
  image,
  quickView = false,
  ctaHref = "/product/the-story-scent",
}: {
  bundle: Bundle;
  visual?: React.ReactNode;
  image?: string;
  quickView?: boolean;
  ctaHref?: string;
}) {
  return (
    <div className="group flex h-full flex-col border border-divider bg-card-bg">
      <div className="relative aspect-[4/3] overflow-hidden bg-bg-alt">
        {bundle.hero && (
          <span className="absolute left-3 top-3 z-10">
            <TanBadge>Most loved</TanBadge>
          </span>
        )}
        {image ? (
          <Image src={image} alt={bundle.name} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4 md:p-5">
            {visual}
          </div>
        )}
        {quickView && (
          <span className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-icon-button bg-white text-black shadow-md">
            <EyeIcon />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 md:p-5">
        <h3 className="text-[16px] font-medium">{bundle.name}</h3>
        <p className="line-clamp-3 text-[13px] leading-relaxed text-text-muted">{bundle.blurb}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-[16px]">{bundle.price} AED</span>
          <Link
            href={ctaHref}
            className="rounded-button border border-black px-4 py-2 text-[13px] font-semibold transition-colors hover:bg-black hover:text-white"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

// Scent showcase card — reused on the home scent section and in Step 2.
export function ScentCard({
  scent,
  selected = false,
  recommended = false,
  onSelect,
  buttonLabel = "Select",
}: {
  scent: Scent;
  selected?: boolean;
  recommended?: boolean;
  onSelect?: () => void;
  buttonLabel?: string;
}) {
  return (
    <div
      className={`relative flex h-full flex-col border bg-card-bg transition-colors ${
        selected ? "border-black" : "border-divider"
      }`}
    >
      {recommended && (
        <span className="absolute left-3 top-3 z-10">
          <TanBadge>Recommended for your story</TanBadge>
        </span>
      )}
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-bg-alt">
        <div className="w-[92px]">
          <ScentBottle scent={scent} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 md:p-5">
        <span className="eyebrow text-text-muted">
          {THEME_EMOJI[scent.theme]} For {scent.theme} · 75ml
        </span>
        <h3 className="text-[17px] font-semibold">{scent.name}</h3>
        <p className="line-clamp-1 text-[13px] text-text-muted">
          {scent.tagline}
        </p>
        <dl className="space-y-0.5 text-[12px] text-text-muted">
          <div className="flex gap-2">
            <dt className="w-9 shrink-0 font-semibold text-black">Top</dt>
            <dd>{scent.notes.top}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-9 shrink-0 font-semibold text-black">Mid</dt>
            <dd>{scent.notes.mid}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-9 shrink-0 font-semibold text-black">Base</dt>
            <dd>{scent.notes.base}</dd>
          </div>
        </dl>
        {onSelect && (
          <button
            onClick={onSelect}
            className={`mt-auto rounded-button px-4 py-2.5 text-[13px] font-semibold transition-colors ${
              selected
                ? "bg-black text-white"
                : "border border-black hover:bg-black hover:text-white"
            }`}
          >
            {selected ? "Selected ✓" : buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
}

export function StoryTypeCard({
  theme,
  title,
  copy,
}: {
  theme: Theme;
  title: string;
  copy: string;
}) {
  return (
    <Link
      href="/shop"
      className="group flex flex-col items-center border border-divider bg-card-bg p-6 text-center transition-colors hover:border-black"
    >
      <span className="text-3xl">{THEME_EMOJI[theme]}</span>
      <h3 className="mt-3 text-[16px] font-medium">{title}</h3>
      <p className="mt-1 text-[13px] text-text-muted">{copy}</p>
    </Link>
  );
}
