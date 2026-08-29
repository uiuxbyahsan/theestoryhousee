"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteShell } from "./SiteShell";
import { Breadcrumb, WhatsAppGlyph } from "./Nav";
import { Container, Reveal, Headline } from "./ui";
import { ScentCard } from "./cards";
import { TemplateModal } from "./TemplateModal";
import { ScentBottle } from "./ScentBottle";
import { useBuilder } from "@/lib/store";
import { orderTotal, buildWhatsAppMessage, whatsappHref } from "@/lib/order";
import {
  BUNDLES,
  SCENTS,
  BASE_PAGES,
  bundleById,
  scentById,
  templateById,
} from "@/lib/data";

// Hand-free scent product shots (single bottles cropped from the flat-lay).
const GALLERY = [
  "/images/scents-flatlay.jpg",
  "/images/scent-1.jpg",
  "/images/scent-gold.jpg",
  "/images/scent-2.jpg",
  "/images/bottle-duo.jpg",
];

export function ProductView({ slug }: { slug: string }) {
  const store = useBuilder();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [showSticky, setShowSticky] = useState(false);

  const targetScent = scentById(slug);
  const isScent = !!targetScent;

  // Seed the builder with this product on first load.
  useEffect(() => {
    if (isScent && targetScent) {
      store.setScent(targetScent.id);
      store.setBundle("the-story-scent");
    } else {
      store.setBundle(slug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 640);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bundle = bundleById(store.bundleId) ?? bundleById("the-story-scent")!;
  const total = orderTotal({
    bundleId: store.bundleId,
    scentId: store.scentId,
    extraPages: store.extraPages,
  });
  const currentScent = store.scentId ? scentById(store.scentId) : (targetScent ?? scentById("velvet-nights"));
  const template = store.templateId ? templateById(store.templateId) : null;

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
        initialCategory={currentScent?.category ?? "All"}
      />
      <Breadcrumb
        trail={[
          { label: "Home", href: "/" },
          { label: "Shop all", href: "/shop" },
          { label: targetScent ? targetScent.name : bundle.name },
        ]}
      />

      <Container className="flex flex-col gap-10 pb-16 lg:grid lg:grid-cols-2">
        {/* ── Gallery (sticky) ── */}
        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-square w-full overflow-hidden border border-divider bg-bg-alt">
            {targetScent && activeImg === 0 ? (
              <div className="flex h-full w-full items-center justify-center p-8">
                <div className="w-[180px]">
                  <ScentBottle scent={targetScent} />
                </div>
              </div>
            ) : (
              <Image src={GALLERY[activeImg]} alt={targetScent ? targetScent.name : bundle.name} fill className="object-cover" />
            )}
          </div>
          <div className="scroll-row mt-3 flex gap-3 overflow-x-auto">
            {GALLERY.map((src, i) => (
              <button
                key={src}
                onClick={() => setActiveImg(i)}
                className={`relative aspect-square w-16 shrink-0 overflow-hidden border ${
                  activeImg === i ? "border-black" : "border-divider"
                }`}
              >
                <Image src={src} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Purchase panel ── */}
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-2 text-[13px] text-text-muted">
            <span className="text-gold">★★★★★</span> Loved by storytellers across the UAE
          </div>
          
          {targetScent ? (
            <>
              <p className="eyebrow mt-2 text-text-muted">
                FOR {targetScent.category.toUpperCase()} · 80ML EAU DE PARFUM
              </p>
              <h1 className="mt-1 text-[30px] font-semibold leading-tight md:text-[40px]">
                The Story + <span className="accent">{targetScent.name}</span>
              </h1>
              <p className="mt-2 text-[14px] leading-relaxed text-text-muted">
                A handcrafted 20-page hardcover photobook paired with the {targetScent.name} signature scent.
              </p>

              {/* Fragrance Notes */}
              <div className="mt-5 border border-divider bg-bg-alt p-4">
                <p className="eyebrow mb-2.5 text-text-muted">Fragrance Notes Breakdown</p>
                <div className="grid grid-cols-1 gap-2 text-[13px] sm:grid-cols-3">
                  <div>
                    <span className="font-semibold text-black">Top:</span>{" "}
                    <span className="text-text-muted">{targetScent.notes.top}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-black">Mid:</span>{" "}
                    <span className="text-text-muted">{targetScent.notes.mid}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-black">Base:</span>{" "}
                    <span className="text-text-muted">{targetScent.notes.base}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="mt-2 text-[30px] font-semibold leading-tight md:text-[40px]">
                {bundle.name.replace("Scent", "")}
                {bundle.name.includes("Scent") && <span className="accent"> Scent</span>}
              </h1>
              <p className="mt-3 text-[15px] leading-relaxed text-text-muted">{bundle.blurb}</p>
            </>
          )}

          <div className="mt-5 flex items-center gap-3">
            <span className="text-[28px] font-semibold">
              {targetScent ? 180 : total} AED
            </span>
            <span className="rounded-button border border-divider bg-bg-alt px-2.5 py-1 text-[12px] font-semibold text-text-dark">
              {targetScent ? "80ml Fine Fragrance" : `${BASE_PAGES} Pages`}
            </span>
            {store.extraPages > 0 && !targetScent && (
              <span className="text-[13px] text-text-muted">
                incl. {store.extraPages} extra pages
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[13px] text-text-muted">
            <span className="text-green-600">✓</span> In stock · made to order in UAE
          </div>

          {/* Bundle tier selector */}
          <div className="mt-6">
            <p className="eyebrow mb-2 text-text-muted">Package tier</p>
            <div className="grid grid-cols-2 gap-2.5">
              {BUNDLES.filter((b) => b.id === "the-story" || b.id === "the-story-scent").map((b) => (
                <button
                  key={b.id}
                  onClick={() => store.setBundle(b.id)}
                  className={`flex flex-col items-start border p-3.5 text-left transition-colors ${
                    store.bundleId === b.id ? "border-black bg-bg-alt" : "border-divider hover:border-black"
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
              onClick={() => setModalOpen(true)}
              className="flex w-full items-center justify-between border border-divider px-4 py-3 text-[14px] transition-colors hover:border-black"
            >
              <span>{template ? template.name : `Choose cover (${currentScent?.category ?? "Male/Female/Unisex"})`}</span>
              <span className="text-text-muted">Browse templates ›</span>
            </button>
          </div>

          {/* Primary CTA */}
          <button
            onClick={() => setModalOpen(true)}
            className="mt-6 flex items-center justify-center gap-2 rounded-button bg-black px-6 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-black-alt"
          >
            Start My Design Order
          </button>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 flex items-center justify-center gap-2 rounded-button border border-black px-6 py-3.5 text-[14px] font-semibold transition-colors hover:bg-black hover:text-white"
          >
            <WhatsAppGlyph className="h-5 w-5" /> Order on WhatsApp
          </a>
          <p className="mt-2 text-center text-[12px] text-text-muted">
            No payment on the site. You confirm everything on WhatsApp.
          </p>

          {/* Add more to your story (cross-sell) */}
          <div className="mt-7">
            <p className="eyebrow mb-3 text-text-muted">Add more to your story</p>
            <div className="scroll-row flex gap-4 overflow-x-auto pb-3">
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
          <div className="mt-7 divide-y divide-divider border-y border-divider">
            <Accordion title="Is this made for my phone photos?">
              Yes. Upload at least 45 HD photos straight from your phone, no
              professional camera needed. We handle the printing and layout from
              there.
            </Accordion>
            <Accordion title="Pages & format">
              Every book starts at 20 pages, hardcover, 21cm x 26cm. Need more
              room for your story? Add extra pages during the ordering flow.
            </Accordion>
            <Accordion title="Delivery. How ordering on WhatsApp works.">
              Once you send your story details, our team confirms everything with
              you on WhatsApp before printing. No checkout, no payment on the
              site, just a quick conversation to get your book right.
            </Accordion>
          </div>
        </div>
      </Container>

      {/* Sticky mini bar */}
      {showSticky && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-divider bg-white/95 backdrop-blur">
          {/* Right padding keeps the CTA clear of the floating WhatsApp button */}
          <div className="mx-auto flex max-w-container items-center justify-between gap-4 py-3 pl-5 pr-[84px] sm:pl-8 sm:pr-[84px]">
            <div className="min-w-0">
              <p className="truncate text-[14px] font-medium">{targetScent ? targetScent.name : bundle.name}</p>
              <p className="text-[13px] text-text-muted">{targetScent ? 180 : total} AED</p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="shrink-0 rounded-button bg-black px-5 py-3 text-[14px] font-semibold text-white hover:bg-black-alt"
            >
              Start My Design Order
            </button>
          </div>
        </div>
      )}
    </SiteShell>
  );
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-4 text-left text-[15px] font-medium"
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

