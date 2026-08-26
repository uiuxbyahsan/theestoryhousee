import { CSSProperties } from "react";

// Recreation of the real brand mark: a house outline with an open book
// inside it, over the wordmark "THE STORY HOUSE" + "SCENT YOUR STORY".
// Strokes use currentColor so the same mark works in black, white or gold.

export function LogoMark({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 100 92"
      className={className}
      style={style}
      fill="none"
      aria-hidden="true"
    >
      {/* Roof + walls */}
      <path
        d="M50 8 L88 40 L88 40 M50 8 L12 40 M18 36 L18 78 M82 36 L82 78"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Roof slopes drawn as a clean chevron */}
      <path
        d="M14 39 L50 9 L86 39"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Window in the gable */}
      <rect x="44" y="22" width="12" height="12" stroke="currentColor" strokeWidth="3" />
      {/* Open book — spine down the middle, two fanning pages */}
      <path
        d="M50 52 C43 46 32 46 26 49 L26 74 C32 71 43 71 50 77"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 52 C57 46 68 46 74 49 L74 74 C68 71 57 71 50 77 Z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="50" y1="52" x2="50" y2="77" stroke="currentColor" strokeWidth="3.5" />
    </svg>
  );
}

export function Logo({
  variant = "dark",
  compact = false,
  className = "",
}: {
  variant?: "dark" | "light" | "gold";
  compact?: boolean;
  className?: string;
}) {
  const color =
    variant === "light"
      ? "text-text-white"
      : variant === "gold"
      ? "text-gold"
      : "text-black";
  return (
    <span className={`inline-flex items-center gap-2.5 ${color} ${className}`}>
      <LogoMark className="h-8 w-8 shrink-0" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-[15px] font-bold tracking-[0.14em]">
            THE STORY HOUSE
          </span>
          <span className="mt-0.5 text-[7.5px] font-semibold tracking-[0.34em] opacity-80">
            SCENT YOUR STORY
          </span>
        </span>
      )}
    </span>
  );
}
