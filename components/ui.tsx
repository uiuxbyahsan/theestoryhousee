"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

// Shared button class strings — gold primary buttons, black text.
export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-button bg-gold px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-40";

// Same gold button, for use on dark backgrounds (hero overlay, black sections).
export const btnPrimaryInverse =
  "inline-flex items-center justify-center gap-2 rounded-button bg-gold px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-40";

export const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-button border border-gold bg-transparent px-6 py-3 text-[14px] font-semibold text-black transition-colors hover:bg-gold hover:text-white";

export const btnGhost =
  "inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider2 text-black transition-opacity hover:opacity-60";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-container px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

// Fade + slight upward translate on scroll into view (Section 4.5).
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Headline helper: renders text with a single word/phrase in the italic
// Playfair accent (Section 4.1). Use {accent} to mark the payoff word.
export function Headline({
  before,
  accent,
  after,
  className = "",
  as: Tag = "h2",
}: {
  before?: string;
  accent: string;
  after?: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  return (
    <Tag className={`font-semibold ${className}`}>
      {before}
      {before ? " " : ""}
      <span className="accent">{accent}</span>
      {after ? " " : ""}
      {after}
    </Tag>
  );
}

export function TanBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-badge bg-tan px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider2 text-tan-text">
      {children}
    </span>
  );
}

export { Link };
