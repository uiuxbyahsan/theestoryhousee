import { LogoMark } from "./Logo";
import { THEME_COLOR, type Template } from "@/lib/data";

// A styled linen-book cover generated per template — theme colour + the
// template name set in the brand's mixed serif/sans treatment. Stands in
// for cover photography and keeps the whole modal grid consistent.
export function BookCover({
  template,
  className = "",
}: {
  template: Template;
  className?: string;
}) {
  const { cover, ink } = THEME_COLOR[template.theme];
  return (
    <div
      className={`relative aspect-[3/4] w-full overflow-hidden ${className}`}
      style={{ backgroundColor: cover, color: ink }}
    >
      {/* subtle linen texture via layered gradients */}
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#fff 0 1px,transparent 1px 3px),repeating-linear-gradient(90deg,#fff 0 1px,transparent 1px 3px)",
        }}
      />
      {/* spine shadow */}
      <div className="absolute inset-y-0 left-0 w-[7%] bg-black/20" />
      <div className="relative flex h-full flex-col items-center justify-between px-4 py-6 text-center">
        <LogoMark className="h-7 w-7 opacity-90" />
        <div className="flex flex-col items-center">
          <span className="mb-2 h-px w-8" style={{ backgroundColor: ink, opacity: 0.5 }} />
          <span
            className="accent text-[19px] leading-tight"
            style={{ opacity: 0.96 }}
          >
            {template.name}
          </span>
          <span className="mt-2 h-px w-8" style={{ backgroundColor: ink, opacity: 0.5 }} />
        </div>
        <span className="text-[8px] font-semibold tracking-[0.28em] opacity-70">
          THE STORY HOUSE
        </span>
      </div>
    </div>
  );
}
