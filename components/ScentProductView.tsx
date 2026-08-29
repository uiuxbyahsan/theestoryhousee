"use client";

import Image from "next/image";
import { useState, useId } from "react";
import { SiteShell } from "./SiteShell";
import { Breadcrumb, WhatsAppGlyph } from "./Nav";
import { Container } from "./ui";
import { ScentBottle } from "./ScentBottle";
import { ScentCard } from "./cards";
import {
  type Scent,
  SCENTS,
  scentById,
} from "@/lib/data";
import {
  EMIRATES,
  buildScentWhatsAppMessage,
  whatsappHref,
} from "@/lib/order";

// Clean perfume gallery shots with all photography assets
const GALLERY = [
  { type: "bottle", src: "", label: "3D Silhouette" },
  { type: "image", src: "/images/scents-flatlay.jpg", label: "Collection Flatlay" },
  { type: "image", src: "/images/bottle-hero.jpg", label: "Hero Bottle Shot" },
  { type: "image", src: "/images/scent-1.jpg", label: "Fragrance Detail" },
  { type: "image", src: "/images/scent-gold.jpg", label: "Golden Notes" },
  { type: "image", src: "/images/bottle-duo.jpg", label: "Signature Pair" },
  { type: "image", src: "/images/scent-2.jpg", label: "Perfume Note Details" },
];

export function ScentProductView({ scent }: { scent: Scent }) {
  const [activeImg, setActiveImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [deliveryArea, setDeliveryArea] = useState("Dubai");
  const [addOnScentIds, setAddOnScentIds] = useState<string[]>([]);

  const quantityId = useId();
  const nameId = useId();
  const deliveryId = useId();

  // Other scents available as add-ons
  const otherScents = SCENTS.filter((s) => s.id !== scent.id);
  const selectedAddOnScents = addOnScentIds
    .map((id) => scentById(id))
    .filter((s): s is Scent => s !== undefined);

  const totalItems = quantity + addOnScentIds.length;
  const total = totalItems * scent.price;

  const waMessage = buildScentWhatsAppMessage({
    scentName: scent.name,
    category: scent.category,
    quantity,
    addOns: selectedAddOnScents.map((s) => `${s.name} (80ml)`),
    customerName: customerName.trim(),
    deliveryArea,
  });

  const waHref = whatsappHref(waMessage);

  function handleQuantityChange(delta: number) {
    setQuantity((prev) => Math.max(1, Math.min(20, prev + delta)));
  }

  function toggleAddOn(id: string) {
    setAddOnScentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  return (
    <SiteShell>
      <Breadcrumb
        trail={[
          { label: "Home", href: "/" },
          { label: "Shop all", href: "/shop" },
          { label: scent.name },
        ]}
      />

      <Container className="flex flex-col gap-10 pb-16 pt-4 lg:grid lg:grid-cols-2">
        {/* ── Gallery (sticky) ── */}
        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-square w-full overflow-hidden border border-divider bg-bg-alt">
            {activeImg === 0 ? (
              <div className="flex h-full w-full items-center justify-center p-8">
                <div className="w-[180px] drop-shadow-lg transition-transform hover:scale-105">
                  <ScentBottle scent={scent} />
                </div>
              </div>
            ) : (
              <Image
                key={GALLERY[activeImg].src}
                src={GALLERY[activeImg].src}
                alt={`${scent.name} fragrance`}
                fill
                className="object-cover transition-opacity duration-300"
                priority
              />
            )}
          </div>
          <div className="scroll-row mt-3 flex gap-3 overflow-x-auto pb-1">
            {GALLERY.map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImg(i)}
                className={`relative aspect-square w-16 shrink-0 overflow-hidden border transition-colors ${
                  activeImg === i ? "border-black ring-1 ring-black" : "border-divider opacity-75 hover:opacity-100"
                }`}
                aria-label={`View image ${i + 1}`}
              >
                {item.type === "bottle" ? (
                  <div className="flex h-full w-full items-center justify-center bg-bg-alt p-2">
                    <div className="w-[28px]">
                      <ScentBottle scent={scent} />
                    </div>
                  </div>
                ) : (
                  <Image src={item.src} alt="" fill className="object-cover" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Product Info & Direct Order Form ── */}
        <div className="flex min-w-0 flex-col">
          {/* Eyebrow & Category */}
          <div className="flex items-center gap-2 text-[13px] text-text-muted">
            <span className="text-gold">★★★★★</span> Loved by storytellers across the UAE
          </div>

          <p className="eyebrow mt-3 flex items-center gap-1.5 text-text-muted">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
            FOR {scent.category.toUpperCase()} · 80ML EAU DE PARFUM
          </p>

          <h1 className="mt-1.5 text-[34px] font-semibold leading-tight md:text-[44px]">
            {scent.name}
          </h1>

          <p className="mt-2 text-[16px] italic leading-relaxed text-text-muted">
            &ldquo;{scent.tagline}&rdquo;
          </p>

          {/* Pricing Row */}
          <div className="mt-5 flex items-center gap-3 border-b border-divider pb-5">
            <span className="text-[32px] font-semibold text-black">{scent.price} AED</span>
            <span className="rounded-button border border-divider bg-bg-alt px-3 py-1 text-[12px] font-semibold text-text-dark">
              80ml Eau de Parfum
            </span>
            <span className="ml-auto flex items-center gap-1.5 text-[13px] text-text-muted">
              <span className="text-green-600">✓</span> In stock · UAE Delivery
            </span>
          </div>

          {/* Fragrance Notes Breakdown */}
          <div className="mt-6 border border-divider bg-bg-alt p-5">
            <p className="eyebrow mb-3 font-semibold tracking-wider text-text-muted">
              Fragrance Notes Breakdown
            </p>
            <div className="grid grid-cols-1 gap-3 text-[13px] sm:grid-cols-3">
              <div className="rounded border border-divider/60 bg-white/60 p-3">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-text-muted">Top Notes</span>
                <span className="mt-1 block font-semibold text-black">{scent.notes.top}</span>
              </div>
              <div className="rounded border border-divider/60 bg-white/60 p-3">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-text-muted">Heart Notes</span>
                <span className="mt-1 block font-semibold text-black">{scent.notes.mid}</span>
              </div>
              <div className="rounded border border-divider/60 bg-white/60 p-3">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-text-muted">Base Notes</span>
                <span className="mt-1 block font-semibold text-black">{scent.notes.base}</span>
              </div>
            </div>
          </div>

          {/* ── Dedicated Single-Step WhatsApp Order Form ── */}
          <div className="mt-8 rounded-lg border-2 border-black bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-divider pb-4">
              <h2 className="text-[20px] font-semibold text-black">Start Your Order</h2>
              <span className="text-[13px] font-semibold text-gold">Fast WhatsApp Delivery</span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.open(waHref, "_blank", "noopener,noreferrer");
              }}
              className="mt-5 space-y-4"
            >
              {/* Quantity Selector */}
              <div>
                <label htmlFor={quantityId} className="block text-[13px] font-semibold text-black">
                  Quantity ({scent.name})
                </label>
                <div className="mt-1.5 flex items-center gap-3">
                  <div className="flex items-center rounded-button border border-divider bg-bg-alt">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="flex h-10 w-10 items-center justify-center text-lg font-bold text-black transition-colors hover:bg-divider disabled:opacity-30"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      id={quantityId}
                      type="number"
                      min={1}
                      max={20}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                      className="h-10 w-12 bg-transparent text-center text-[15px] font-semibold text-black focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= 20}
                      className="flex h-10 w-10 items-center justify-center text-lg font-bold text-black transition-colors hover:bg-divider disabled:opacity-30"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[13px] text-text-muted">
                    {quantity} × 70 AED = <strong className="font-semibold text-black">{quantity * scent.price} AED</strong>
                  </span>
                </div>
              </div>

              {/* Selected Add-ons Display */}
              {selectedAddOnScents.length > 0 && (
                <div className="rounded-md border border-divider bg-bg-alt p-3.5 text-[13px]">
                  <div className="flex items-center justify-between font-semibold text-black">
                    <span>Selected Add-on Fragrances (+70 AED each):</span>
                    <span className="text-gold">+{selectedAddOnScents.length * 70} AED</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selectedAddOnScents.map((addon) => (
                      <span
                        key={addon.id}
                        className="inline-flex items-center gap-1.5 rounded-full border border-black bg-black px-2.5 py-1 text-[12px] font-medium text-white"
                      >
                        {addon.name}
                        <button
                          type="button"
                          onClick={() => toggleAddOn(addon.id)}
                          className="hover:opacity-75"
                          aria-label={`Remove ${addon.name}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Customer Name */}
              <div>
                <label htmlFor={nameId} className="block text-[13px] font-semibold text-black">
                  Your Name <span className="text-text-muted font-normal">(optional)</span>
                </label>
                <input
                  id={nameId}
                  type="text"
                  placeholder="e.g. Sarah Al Hashimi"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="mt-1.5 w-full rounded-button border border-divider bg-bg-alt px-3.5 py-2.5 text-[14px] text-black transition-colors placeholder:text-text-muted/60 focus:border-black focus:bg-white focus:outline-none"
                />
              </div>

              {/* Delivery Area */}
              <div>
                <label htmlFor={deliveryId} className="block text-[13px] font-semibold text-black">
                  Delivery Area / Emirate
                </label>
                <select
                  id={deliveryId}
                  value={deliveryArea}
                  onChange={(e) => setDeliveryArea(e.target.value)}
                  className="mt-1.5 w-full rounded-button border border-divider bg-bg-alt px-3.5 py-2.5 text-[14px] text-black transition-colors focus:border-black focus:bg-white focus:outline-none"
                >
                  {EMIRATES.map((emirate) => (
                    <option key={emirate} value={emirate}>
                      {emirate}
                    </option>
                  ))}
                </select>
              </div>

              {/* Summary and WhatsApp CTA */}
              <div className="pt-2">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2.5 rounded-button bg-[#25D366] px-6 py-4 text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-[#1EBE5D] hover:shadow"
                >
                  <WhatsAppGlyph className="h-5 w-5" /> Start Your Order on WhatsApp · {total} AED
                </a>
                <p className="mt-2.5 text-center text-[12px] text-text-muted">
                  No payment on site. Send this pre-filled message on WhatsApp and our team will confirm delivery details with you.
                </p>
              </div>
            </form>
          </div>

          {/* ── Multi-select Add-on Scents Row ── */}
          <div className="mt-8 border-t border-divider pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow text-text-muted">Add-on</p>
                <h2 className="text-[17px] font-semibold text-black">Complete Your Fragrance Set</h2>
              </div>
              {addOnScentIds.length > 0 && (
                <span className="rounded-button bg-black px-2.5 py-1 text-[12px] font-semibold text-white">
                  {addOnScentIds.length} added
                </span>
              )}
            </div>
            <div className="scroll-row mt-4 flex gap-4 overflow-x-auto pb-3">
              {otherScents.map((s) => {
                const isSelected = addOnScentIds.includes(s.id);
                return (
                  <div key={s.id} className="w-[260px] shrink-0">
                    <ScentCard
                      scent={s}
                      selected={isSelected}
                      buttonLabel="Select"
                      onSelect={() => toggleAddOn(s.id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scent Accordions */}
          <div className="mt-8 divide-y divide-divider border-y border-divider">
            <Accordion title="Fragrance formulation & longevity">
              All The Story House perfumes are concentrated Eau de Parfum (80ml), formulated with premium oils for rich projection and all-day wear. Each bottle is sealed and packaged in our signature matte box.
            </Accordion>
            <Accordion title="How ordering on WhatsApp works">
              Clicking &ldquo;Start Your Order&rdquo; opens a pre-composed message with your scent choice, quantity, and delivery area. Our concierge will confirm your order and schedule courier delivery right to your door.
            </Accordion>
            <Accordion title="Delivery across the UAE">
              We deliver across Dubai, Abu Dhabi, Sharjah, and all other Emirates within 1–3 business days. Cash on delivery and secure payment links are supported via WhatsApp.
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
