"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { useBuilder } from "@/lib/store";
import { orderTotal } from "@/lib/order";

const STEPS = [
  { n: 1, href: "/build/photos", label: "Photos" },
  { n: 2, href: "/build/scent", label: "Scent" },
  { n: 3, href: "/build/pages", label: "Pages" },
  { n: 4, href: "/build/personalize", label: "Personalize" },
  { n: 5, href: "/build/review", label: "Review" },
];

export function BuilderChrome({
  step,
  children,
  backHref,
  nextLabel = "Continue",
  nextDisabled = false,
  onNext,
  hideNext = false,
  wide = false,
}: {
  step: number;
  children: ReactNode;
  backHref?: string | null;
  nextLabel?: string;
  nextDisabled?: boolean;
  onNext?: () => void;
  hideNext?: boolean;
  wide?: boolean;
}) {
  const router = useRouter();
  const store = useBuilder();
  const total = orderTotal({
    bundleId: store.bundleId,
    scentId: store.scentId,
    extraPages: store.extraPages,
  });

  function handleNext() {
    if (nextDisabled) return;
    if (onNext) return onNext();
    const next = STEPS.find((s) => s.n === step + 1);
    if (next) router.push(next.href);
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-divider bg-bg">
        <div className="mx-auto flex h-16 max-w-container items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label="The Story House" className="shrink-0">
            <Logo compact className="sm:hidden" />
            <span className="hidden sm:block">
              <Logo />
            </span>
          </Link>

          {/* Step dots */}
          <div className="hidden items-center gap-2 md:flex">
            {STEPS.map((s) => (
              <div key={s.n} className="flex items-center gap-2">
                <span
                  className={`flex h-6 items-center gap-1.5 text-[12px] font-medium ${
                    s.n === step ? "text-black" : "text-text-muted"
                  }`}
                >
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      s.n === step ? "bg-black" : s.n < step ? "bg-tan" : "bg-divider"
                    }`}
                  />
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Live price header */}
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-wider2 text-text-muted">Total</p>
            <AnimatePresence mode="popLayout">
              {step === 1 || (step === 2 && nextDisabled) ? (
                <motion.p
                  key="unselected"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[17px] font-semibold text-text-muted"
                >
                  —
                </motion.p>
              ) : (
                <motion.p
                  key={total}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  className="text-[17px] font-semibold"
                >
                  {total} AED
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
        {/* Mobile step indicator */}
        <div className="border-t border-divider px-5 py-2 text-center text-[12px] text-text-muted md:hidden">
          Step {step} of 5 · {STEPS[step - 1].label}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-5 py-10 sm:px-8">
        <div className={`mx-auto w-full ${wide ? "max-w-5xl" : "max-w-2xl"}`}>{children}</div>
      </main>

      {/* Bottom action bar */}
      <footer className="sticky bottom-0 z-30 border-t border-divider bg-bg/95 backdrop-blur">
        <div className="mx-auto flex max-w-container items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          {backHref ? (
            <Link
              href={backHref}
              className="rounded-button border border-black px-5 py-3 text-[14px] font-semibold transition-colors hover:bg-black hover:text-white"
            >
              Back
            </Link>
          ) : (
            <Link
              href="/shop"
              className="rounded-button border border-divider px-5 py-3 text-[14px] font-semibold text-text-muted transition-colors hover:border-black hover:text-black"
            >
              Back to shop
            </Link>
          )}
          {!hideNext && (
            <button
              onClick={handleNext}
              disabled={nextDisabled}
              className="rounded-button bg-black px-7 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-black-alt disabled:cursor-not-allowed disabled:opacity-40"
            >
              {nextLabel}
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

// Consistent step heading block.
export function StepHead({
  before,
  accent,
  after,
  sub,
}: {
  step?: number; // still accepted from callers; progress lives in the top bar
  before?: string;
  accent: string;
  after?: string;
  sub: string;
}) {
  return (
    <div className="mb-8">
      <h1 className="text-[28px] font-semibold leading-tight md:text-[36px]">
        {before} {before && ""}
        <span className="accent">{accent}</span>
        {after ? ` ${after}` : ""}
      </h1>
      <p className="mt-2 text-[15px] text-text-muted">{sub}</p>
    </div>
  );
}
