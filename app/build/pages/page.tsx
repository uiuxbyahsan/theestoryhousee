"use client";

import { BuilderChrome, StepHead } from "@/components/BuilderChrome";
import { useBuilder } from "@/lib/store";
import { BASE_PAGES, EXTRA_PAGE_PRICE } from "@/lib/data";

export default function PagesStep() {
  const { extraPages, setExtraPages } = useBuilder();
  const totalPages = BASE_PAGES + extraPages;
  const addOn = extraPages * EXTRA_PAGE_PRICE;

  return (
    <BuilderChrome step={3} backHref="/build/scent">
      <StepHead
        step={3}
        before="Pages &"
        accent="format"
        sub={`Your book includes ${BASE_PAGES} pages. Add more if your story needs the space.`}
      />

      <div className="border border-divider p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[16px] font-medium">{BASE_PAGES} pages included</p>
            <p className="text-[13px] text-text-muted">Premium hardcover, hand-designed</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-divider pt-6">
          <div>
            <p className="text-[15px] font-medium">Extra pages</p>
            <p className="text-[13px] text-text-muted">{EXTRA_PAGE_PRICE} AED per page</p>
          </div>
          <div className="flex items-center border border-divider">
            <button
              onClick={() => setExtraPages(Math.max(0, extraPages - 2))}
              className="px-4 py-3 text-[18px] leading-none hover:bg-bg-alt"
              aria-label="Remove pages"
            >
              −
            </button>
            <span className="w-12 text-center text-[15px]">+{extraPages}</span>
            <button
              onClick={() => setExtraPages(extraPages + 2)}
              className="px-4 py-3 text-[18px] leading-none hover:bg-bg-alt"
              aria-label="Add pages"
            >
              +
            </button>
          </div>
        </div>

        {extraPages > 0 && (
          <div className="mt-4 flex items-center justify-between bg-bg-alt px-4 py-3 text-[14px]">
            <span>
              +{extraPages} pages = <strong>+{addOn} AED</strong>
            </span>
            <span className="text-text-muted">{totalPages} pages total</span>
          </div>
        )}
      </div>

      <p className="mt-4 text-[12px] text-text-muted">
        Not sure how many pages you need? Our team will help you get the pacing
        right when we confirm your order on WhatsApp.
      </p>
    </BuilderChrome>
  );
}
