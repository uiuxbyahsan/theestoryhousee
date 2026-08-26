"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BookCover } from "./BookCover";
import { useBuilder } from "@/lib/store";
import {
  TEMPLATES,
  THEMES,
  THEME_EMOJI,
  templateById,
  type Theme,
} from "@/lib/data";

// "Choose Your Cover" modal (Section 7B). Selecting a cover seeds the
// builder store and routes into the photo-upload step.
export function TemplateModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const setTemplate = useBuilder((s) => s.setTemplate);
  const setScent = useBuilder((s) => s.setScent);

  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<Theme | "All">("All");
  const [picked, setPicked] = useState<string | null>(null);

  const results = useMemo(() => {
    return TEMPLATES.filter((t) => {
      const matchesTheme = theme === "All" || t.theme === theme;
      const matchesQuery = t.name.toLowerCase().includes(query.toLowerCase());
      return matchesTheme && matchesQuery;
    });
  }, [query, theme]);

  function confirm() {
    if (!picked) return;
    const t = templateById(picked);
    setTemplate(picked);
    if (t) setScent(t.pairedScent); // default pairing, swappable in Step 2
    router.push("/build/photos");
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="flex h-[92vh] w-full max-w-3xl flex-col bg-bg sm:h-[86vh]"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-divider px-5 py-4">
              <h2 className="text-[20px] font-semibold">
                Choose Your <span className="accent">Cover</span>
              </h2>
              <button onClick={onClose} aria-label="Close" className="text-2xl leading-none text-text-muted hover:text-black">
                ×
              </button>
            </div>

            {/* Search + tabs */}
            <div className="border-b border-divider px-5 py-4">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a template…"
                className="w-full rounded-button border border-divider bg-white px-4 py-2.5 text-[14px] outline-none focus:border-black"
              />
              <div className="scroll-row mt-3 flex gap-2 overflow-x-auto">
                <Tab active={theme === "All"} onClick={() => setTheme("All")}>
                  All
                </Tab>
                {THEMES.map((t) => (
                  <Tab key={t} active={theme === t} onClick={() => setTheme(t)}>
                    {THEME_EMOJI[t]} {t}
                  </Tab>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid flex-1 grid-cols-2 content-start gap-4 overflow-y-auto p-5 sm:grid-cols-4">
              {results.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setPicked(t.id)}
                  className={`group text-left transition-transform ${
                    picked === t.id ? "" : "hover:-translate-y-0.5"
                  }`}
                >
                  <div className={`border-2 ${picked === t.id ? "border-black" : "border-transparent"}`}>
                    <BookCover template={t} />
                  </div>
                  <p className="mt-2 text-[13px] font-semibold">{t.name}</p>
                  <p className="text-[12px] text-text-muted">
                    {THEME_EMOJI[t.theme]} {t.theme}
                  </p>
                </button>
              ))}
              {results.length === 0 && (
                <p className="col-span-full py-10 text-center text-[14px] text-text-muted">
                  No templates match that search.
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-4 border-t border-divider px-5 py-4">
              <span className="text-[13px] text-text-muted">
                {picked ? templateById(picked)?.name : "Select a cover to continue"}
              </span>
              <button
                disabled={!picked}
                onClick={confirm}
                className="rounded-button bg-black px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-black-alt disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Tab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-button border px-3 py-1.5 text-[13px] font-medium transition-colors ${
        active ? "border-black bg-black text-white" : "border-divider text-black hover:border-black"
      }`}
    >
      {children}
    </button>
  );
}
