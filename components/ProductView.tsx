"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteShell } from "./SiteShell";
import { Breadcrumb, WhatsAppGlyph } from "./Nav";
import { Container } from "./ui";
import { ScentCard, BundleVisual } from "./cards";
import { TemplateModal } from "./TemplateModal";
import { BookCover } from "./BookCover";
import { ScentProductView } from "./ScentProductView";
import { useBuilder } from "@/lib/store";
import { orderTotal, buildWhatsAppMessage, whatsappHref } from "@/lib/order";
import {
  BUNDLES,
  SCENTS,
  BASE_PAGES,
  bundleById,
  scentById,
  templateById,
  type Bundle,
} from "@/lib/data";

const BOOK_GALLERY = [
  { type: "cover", src: "" },
  { type: "image", src: "/images/hero.jpg", label: "Hardcover Photobook" },
  { type: "image", src: "/images/craftsmanship.jpg", label: "Linen Craftsmanship" },
  { type: "image", src: "/images/ugc-1.png", label: "Story Pages" },
  { type: "image", src: "/images/ugc-2.png", label: "Keepsake Details" },
];

export function ProductView({ slug }: { slug: string }) {
  const targetScent = scentById(slug);
  if (targetScent) {
    return <ScentProductView scent={targetScent} />;
  }

  return <BookProductView slug={slug} />;
}

function BookProductView({ slug }: { slug: string }) {
  const store = useBuilder();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  // Seed the builder with this bundle on load
  useEffect(() => {
    store.setBundle(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const bundle: Bundle = bundleById(store.bundleId) ?? bundleById(slug) ?? BUNDLES[0];
  const template = store.templateId ? templateById(store.templateId) : templateById("female-02");

  const total = orderTotal({
    bundleId: store.bundleId,
    scentId: store.scentId,
    extraPages: store.extraPages,
  });

  const selectedScent = store.scentId ? scentById(store.scentId) : null;

  const waHref = whatsappHref(
    buildWhatsAppMessage({
      bundleId: store.bundleId,
      templateId: store.templateId,
      scentId: store.scentId,
      extraPages: store.extraPages,
      photoCount: store.photos.length,
    })
  );

  return (
    <SiteShell>
      <TemplateModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialCategory={template?.category ?? "All"}
      />
      <Breadcrumb
        trail={[
          { label: "Home", href: "/" },
          { label: "Shop all", href: "/shop" },
          { label: bundle.name },
        ]}
      />

      <Container className="flex flex-col gap-10 pb-16 pt-4 lg:grid lg:grid-cols-2">
        {/* ── Gallery (sticky) ── */}
        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-square w-full overflow-hidden border border-divider bg-bg-alt">
            {activeImg === 0 ? (
              <div className="flex h-full w-full items-center justify-center p-8">
                <div className="h-full w-full max-w-[280px]">
                  <BundleVisual bundle={bundle} />
                </div>
              </div>
            ) : (
              <Image
                src={BOOK_GALLERY[activeImg].src}
                alt={bundle.name}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="scroll-row mt-3 flex gap-3 overflow-x-auto">
            {BOOK_GALLERY.map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImg(i)}
                className={`relative aspect-square w-16 shrink-0 overflow-hidden border transition-colors ${
                  activeImg === i ? "border-gold ring-1 ring-gold" : "border-divider opacity-75 hover:opacity-100"
                }`}
                aria-label={`View image ${i + 1}`}
              >
                {item.type === "cover" ? (
                  <div className="flex h-full w-full items-center justify-center bg-bg-alt p-1.5">
                    {template && <BookCover template={template} />}
                  </div>
                ) : (
                  <Image src={item.src} alt="" fill className="object-cover" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Purchase panel ── */}
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-2 text-[13px] text-text-muted">
            <span className="text-gold">★★★★★</span> Hand-designed custom photobooks in the UAE
          </div>

          <p className="eyebrow mt-3 text-text-muted">
            HARDCOVER PHOTOBOOK · 21×26CM · {BASE_PAGES} PAGES
          </p>

          <h1 className="mt-1 text-[32px] font-semibold leading-tight md:text-[42px]">
            {bundle.name}
          </h1>

          <p className="mt-2.5 text-[15px] leading-relaxed text-text-muted">
            {bundle.blurb}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-[30px] font-semibold text-black">{total} AED</span>
            <span className="rounded-button border border-divider bg-bg-alt px-2.5 py-1 text-[12px] font-semibold text-text-dark">
              {bundle.includesScent > 0
                ? `${BASE_PAGES} Pages + ${bundle.includesScent} Signature Scent`
                : `${BASE_PAGES} Pages Book Only`}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[13px] text-text-muted">
            <span className="text-gold">✓</span> Made to order in UAE · WhatsApp design review
          </div>

          {/* Bundle tier selector */}
          <div className="mt-6">
            <p className="eyebrow mb-2 text-text-muted">Package tier</p>
            <div className="grid grid-cols-2 gap-2.5">
              {BUNDLES.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => store.setBundle(b.id)}
                  className={`flex flex-col items-start rounded-md border p-3.5 text-left transition-colors ${
                    store.bundleId === b.id ? "border-gold bg-bg-alt" : "border-divider hover:border-black"
                  }`}
                >
                  <span className="text-[13px] font-semibold leading-tight">{b.name}</span>
                  <span className="mt-1 text-[13px] text-text-muted">{b.price} AED</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cover selector */}
          <div className="mt-5">
            <p className="eyebrow mb-2 text-text-muted">Cover Design</p>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="flex w-full items-center justify-between rounded-md border border-divider px-4 py-3.5 text-[14px] transition-colors hover:border-black"
            >
              <span>{store.templateId && template ? template.name : "Select Cover Template"}</span>
              <span className="text-text-muted">Browse templates ›</span>
            </button>
          </div>

          {/* Primary CTA */}
          <div className="mt-6 space-y-2.5">
            <Link
              href="/build/photos"
              className="flex w-full items-center justify-center gap-2 rounded-button bg-gold px-6 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-gold-light"
            >
              Start My Design Order
            </Link>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-button border border-black px-6 py-3.5 text-[14px] font-semibold transition-colors hover:bg-black hover:text-white"
            >
              <WhatsAppGlyph className="h-5 w-5" /> Quick Order on WhatsApp
            </a>
          </div>

          <p className="mt-2 text-center text-[12px] text-text-muted">
            No payment on the site. You confirm your layout and details directly on WhatsApp.
          </p>

          {/* Add more to your story (cross-sell scents) */}
          <div className="mt-8 border-t border-divider pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow text-text-muted">Optional Fragrance Pairing</p>
                <h2 className="text-[17px] font-semibold text-black">Add more to your story</h2>
              </div>
              {selectedScent && (
                <span className="text-[12px] font-semibold text-gold">
                  Paired: {selectedScent.name}
                </span>
              )}
            </div>
            <div className="scroll-row mt-4 flex gap-4 overflow-x-auto pb-3">
              {SCENTS.map((s) => (
                <div key={s.id} className="w-[260px] shrink-0">
                  <ScentCard
                    scent={s}
                    selected={store.scentId === s.id}
                    onSelect={() => store.setScent(store.scentId === s.id ? null : s.id)}
                    buttonLabel="Pair Scent"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Accordions */}
          <div className="mt-8 divide-y divide-divider border-y border-divider">
            <Accordion title="Is this made for my phone photos?">
              Yes. Upload at least 45 HD photos straight from your phone, Google Photos, or WhatsApp. We handle photo enhancement, layout, and printing from there.
            </Accordion>
            <Accordion title="Book format & specifications">
              Every book comes as a 20-page hardcover (21cm × 26cm) crafted with premium linen and gold foil finishing, hand-designed by our team for your photos.
            </Accordion>
            <Accordion title="Delivery & WhatsApp Ordering">
              Once you send your story details, our team confirms your digital preview with you on WhatsApp before printing. No checkout or payment on the site—just a direct, personal experience.
            </Accordion>
          </div>
        </div>
      </Container>
    </SiteShell>
  );
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-4 text-left text-[15px] font-medium transition-colors hover:text-black"
      >
        {title}
        <span className="text-xl text-text-muted">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <p className="pb-4 text-[14px] leading-relaxed text-text-muted">{children}</p>
      )}
    </div>
  );
}
