"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useStory } from "@/context/StoryContext";

const STEP_ROUTES = [
  { step: 1, path: "/build/photos", label: "Upload Photos" },
  { step: 2, path: "/build/scent", label: "Signature Scent" },
  { step: 3, path: "/build/pages", label: "Pages & Format" },
  { step: 4, path: "/build/personalize", label: "Personalize" },
  { step: 5, path: "/build/review", label: "Review & Send" },
];

export default function BuildLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { totalPriceAed } = useStory();

  const currentStepObj = STEP_ROUTES.find((s) => s.path === pathname) || STEP_ROUTES[0];
  const currentStep = currentStepObj.step;

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2A2A2A] flex flex-col antialiased selection:bg-[#E8C896] selection:text-[#3D1117]">
      
      {/* ============================================================ */}
      {/* PERSISTENT TOP BAR ACROSS ALL 5 STEP PAGES */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E5DDD5] px-4 sm:px-8 py-3.5 sm:py-4 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Back to PDP / Brand Wordmark */}
          <div className="flex items-center gap-3">
            <Link
              href="/product"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3D1117] hover:text-[#5C1A22] bg-[#FFFFFF] border border-[#E5DDD5] px-3 py-1.5 rounded-full shadow-xs transition-all hover:scale-105"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#C9A769]" />
              <span className="hidden sm:inline">Back to Product</span>
              <span className="sm:hidden">Exit</span>
            </Link>

            <Link href="/" className="hidden md:inline-block font-serif text-lg font-bold text-[#3D1117] tracking-tight">
              The Story House
            </Link>
          </div>

          {/* Center: Step-Dot Indicator (Only Dots) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {STEP_ROUTES.map((st) => (
              <button
                key={st.step}
                onClick={() => router.push(st.path)}
                className={`transition-all duration-300 rounded-full ${
                  st.step === currentStep
                    ? "w-6 sm:w-8 h-2 bg-[#3D1117]"
                    : st.step < currentStep
                    ? "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-[#C9A769] hover:opacity-80 cursor-pointer"
                    : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-[#E5DDD5] cursor-pointer hover:bg-[#D4C8BC]"
                }`}
                aria-label={`Step ${st.step}: ${st.label}`}
              />
            ))}
          </div>

          {/* Right: Persistent Animated Live Price Header */}
          <div className="text-right">
            <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#888888] block tracking-wider">
              TOTAL
            </span>
            <div className="flex items-center justify-end font-serif font-bold text-lg sm:text-2xl text-[#3D1117] leading-none">
              <motion.span
                key={totalPriceAed}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {totalPriceAed.toLocaleString()}
              </motion.span>
              <span className="text-xs ml-1 font-sans font-semibold text-[#C9A769]">AED</span>
            </div>
          </div>

        </div>
      </header>

      {/* ============================================================ */}
      {/* STEP PAGE CONTENT WITH ANIMATED ROUTE TRANSITION */}
      {/* ============================================================ */}
      <main className={`flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-32 ${
        pathname === "/build/scent" ? "max-w-5xl" : "max-w-4xl"
      }`}>
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20 font-serif text-lg text-[#3D1117]">
              Loading studio step...
            </div>
          }
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>

    </div>
  );
}
