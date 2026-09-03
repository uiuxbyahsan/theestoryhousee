import Image from "next/image";
import { LogoMark } from "./Logo";
import type { Scent } from "@/lib/data";

// Renders the real product photography for a scent, kept in the exact same
// footprint the CSS placeholder used so every location swaps at once with no
// layout change. Falls back to the CSS/SVG bottle if a scent has no photo.
export function ScentBottle({
  scent,
  label = "black",
  className = "",
  fill = false,
}: {
  scent: Scent;
  label?: "black" | "gold";
  className?: string;
  // When true, the photo fills its parent container (object-cover, 100%x100%)
  // instead of sitting at a fixed small width. Parent must be `relative`.
  fill?: boolean;
}) {
  const goldLabel = label === "gold";
  const words = scent.name.toUpperCase().split(" ");

  if (scent.image) {
    if (fill) {
      return (
        <Image
          src={scent.image}
          alt={`${scent.name} 80ml Eau de Parfum`}
          fill
          sizes="(max-width: 640px) 90vw, 480px"
          className={`object-cover object-center ${className}`}
        />
      );
    }
    return (
      <div className={`relative mx-auto aspect-[3/5] w-full max-w-[180px] ${className}`}>
        <Image
          src={scent.image}
          alt={`${scent.name} 80ml Eau de Parfum`}
          fill
          sizes="(max-width: 640px) 45vw, 200px"
          className="object-cover object-center"
        />
      </div>
    );
  }

  return (
    <div className={`relative mx-auto aspect-[3/5] w-full max-w-[180px] ${className}`}>
      {/* Cap */}
      <div className="absolute left-1/2 top-0 z-20 h-[14%] w-[34%] -translate-x-1/2 rounded-[1px] bg-gradient-to-b from-white/70 via-white/25 to-black/10 ring-1 ring-black/10" />
      {/* Collar */}
      <div className="absolute left-1/2 top-[13%] z-20 h-[4%] w-[30%] -translate-x-1/2 bg-gradient-to-b from-gold to-[#8a6f34]" />
      {/* Body */}
      <div
        className={`absolute inset-x-0 bottom-0 top-[15%] overflow-hidden rounded-[2px] ${
          goldLabel
            ? "bg-gradient-to-br from-[#2a2a2a] to-[#050505]"
            : "bg-gradient-to-br from-[#1a1a1a] to-black"
        } shadow-[inset_0_0_30px_rgba(255,255,255,0.06)]`}
      >
        {/* glass highlight */}
        <div className="absolute left-[8%] top-0 h-full w-[14%] bg-white/10 blur-[2px]" />
        {/* Label */}
        <div
          className={`absolute left-1/2 top-1/2 flex w-[74%] -translate-x-1/2 -translate-y-1/2 flex-col items-center border px-2 py-3 text-center ${
            goldLabel
              ? "bg-gradient-to-b from-[#e6cf8f] to-[#c6a15b] text-black"
              : "bg-black text-gold"
          }`}
          style={{ borderColor: goldLabel ? "#7a5f24" : "#c6a15b" }}
        >
          <LogoMark className="mb-1 h-6 w-6" />
          <span className="text-[7px] font-bold tracking-[0.12em]">
            THE STORY HOUSE
          </span>
          <span className="mt-[1px] text-[4.5px] font-semibold tracking-[0.22em] opacity-80">
            SCENT YOUR STORY
          </span>
          <span className="mt-3 flex flex-col text-[10px] font-semibold leading-tight tracking-[0.08em]">
            {words.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
