"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ScentBottle } from "./ScentBottle";
import { useBuilder } from "@/lib/store";
import type { Scent } from "@/lib/data";

export function ScentModal({
  scent,
  open,
  onClose,
  onSelect,
  selected = false,
}: {
  scent: Scent | null;
  open: boolean;
  onClose: () => void;
  onSelect?: () => void;
  selected?: boolean;
}) {
  const router = useRouter();
  const setScent = useBuilder((s) => s.setScent);
  const setBundle = useBuilder((s) => s.setBundle);

  if (!scent) return null;

  function handleViewProduct() {
    onClose();
    router.push(`/product/${scent?.id}`);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[65] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden bg-bg shadow-2xl"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-divider px-6 py-4">
              <div>
                <span className="eyebrow text-text-muted">
                  For {scent.category} · 80ml · {scent.price} AED
                </span>
                <h2 className="text-[20px] font-semibold">{scent.name}</h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center text-2xl leading-none text-text-muted hover:text-black"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto p-6">
              {/* Bottle preview — fills the frame */}
              <div className="relative aspect-square overflow-hidden border border-divider bg-bg-alt">
                <ScentBottle scent={scent} fill />
              </div>

              {/* Notes breakdown */}
              <div className="mt-5">
                <h3 className="eyebrow mb-3 text-text-muted">Fragrance Notes</h3>
                <dl className="space-y-2.5 text-[13px]">
                  <div className="flex gap-3">
                    <dt className="w-12 shrink-0 font-semibold text-black">Top</dt>
                    <dd className="text-text-muted">{scent.notes.top}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-12 shrink-0 font-semibold text-black">Mid</dt>
                    <dd className="text-text-muted">{scent.notes.mid}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-12 shrink-0 font-semibold text-black">Base</dt>
                    <dd className="text-text-muted">{scent.notes.base}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-divider px-6 py-4">
              <button
                onClick={onClose}
                className="rounded-button border border-divider px-5 py-2.5 text-[13px] font-semibold transition-colors hover:border-black"
              >
                Close
              </button>
              {onSelect ? (
                <button
                  onClick={() => {
                    onSelect();
                    onClose();
                  }}
                  className="rounded-button bg-gold px-6 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-gold-light"
                >
                  {selected ? "Selected ✓" : "Pair with Book"}
                </button>
              ) : (
                <button
                  onClick={handleViewProduct}
                  className="rounded-button border border-black bg-black px-6 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-black-alt"
                >
                  Order Scent (70 AED)
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
