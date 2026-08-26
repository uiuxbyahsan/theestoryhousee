"use client";

import { useState } from "react";
import Link from "next/link";
import { BuilderChrome, StepHead } from "@/components/BuilderChrome";
import { BookCover } from "@/components/BookCover";
import { useBuilder } from "@/lib/store";
import {
  BASE_PAGES,
  bundleById,
  scentById,
  templateById,
} from "@/lib/data";
import {
  buildWhatsAppMessage,
  whatsappHref,
  orderTotal,
  WHATSAPP_NUMBER,
} from "@/lib/order";

export default function ReviewStep() {
  const s = useBuilder();
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const bundle = bundleById(s.bundleId);
  const template = s.templateId ? templateById(s.templateId) : null;
  const scent = s.scentId ? scentById(s.scentId) : null;
  const total = orderTotal({ bundleId: s.bundleId, scentId: s.scentId, extraPages: s.extraPages });

  const message = buildWhatsAppMessage({
    bundleId: s.bundleId,
    templateId: s.templateId,
    scentId: s.scentId,
    extraPages: s.extraPages,
    photoCount: s.photos.length,
    bookTitle: s.bookTitle,
    dedication: s.dedication,
    customerName: s.customerName,
    deliveryArea: s.deliveryArea,
    extraNote: s.extraNote,
  });
  const href = whatsappHref(message);

  function send() {
    // Conversion event (Section 7D). Fires to dataLayer if present.
    (window as any).dataLayer?.push?.({ event: "whatsapp_order_initiated", value: total });
    window.open(href, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — fallback text is visible below */
    }
  }

  return (
    <BuilderChrome step={5} backHref="/build/personalize" hideNext>
      <StepHead
        step={5}
        before="Review your"
        accent="story"
        sub="Everything look good? Let's send it to WhatsApp."
      />

      {/* Receipt card */}
      <div className="border border-divider">
        <div className="flex gap-4 border-b border-divider p-5">
          <div className="w-24 shrink-0">
            {template ? (
              <BookCover template={template} />
            ) : (
              <div className="flex aspect-[3/4] items-center justify-center bg-bg-alt text-[12px] text-text-muted">
                No cover
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-[12px] uppercase tracking-wider2 text-text-muted">{bundle?.name}</p>
            <h2 className="text-[20px] font-semibold">{s.bookTitle || template?.name || "Your Story"}</h2>
            {s.dedication && <p className="mt-1 text-[14px] italic text-text-muted">{s.dedication}</p>}
          </div>
        </div>

        <dl className="divide-y divide-divider">
          <Row label="Cover" value={template?.name ?? "Not chosen"} editHref="/build/photos" />
          <Row label="Scent" value={scent ? `${scent.name} · 75ml` : "No scent added"} editHref="/build/scent" />
          <Row label="Pages" value={`${BASE_PAGES}${s.extraPages ? ` + ${s.extraPages}` : ""} pages`} editHref="/build/pages" />
          <Row label="Photos" value={`${s.photos.length} uploaded`} editHref="/build/photos" />
          <Row label="Name" value={s.customerName || "Not added"} editHref="/build/personalize" />
          <Row label="Delivery area" value={s.deliveryArea || "Not added"} editHref="/build/personalize" />
          {s.extraNote && <Row label="Note" value={s.extraNote} editHref="/build/personalize" />}
        </dl>

        <div className="flex items-center justify-between border-t border-divider bg-bg-alt p-5">
          <span className="text-[15px] font-medium">Total</span>
          <span className="text-[26px] font-semibold">{total} AED</span>
        </div>
      </div>

      {/* Send */}
      <button
        onClick={send}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-button bg-black px-6 py-4 text-[16px] font-semibold text-white transition-colors hover:bg-black-alt"
      >
        Send My Story to WhatsApp
      </button>
      <p className="mt-2 text-center text-[13px] text-text-muted">
        You&apos;ll be redirected to WhatsApp to confirm your order. No payment happens here.
      </p>

      {sent && (
        <div className="mt-5 border border-divider bg-bg-alt p-5 text-center">
          <p className="text-[15px] font-medium">Your story is on its way 🎉</p>
          <p className="mt-1 text-[14px] text-text-muted">
            Continue the conversation on WhatsApp to confirm your order. If it
            didn&apos;t open,{" "}
            <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-black underline">
              tap here
            </a>
            .
          </p>
          <div className="mt-3 flex flex-col items-center gap-2 text-[13px] text-text-muted">
            <span>
              Or message us directly: <strong className="text-black">+{WHATSAPP_NUMBER}</strong>
            </span>
            <button
              onClick={copyMessage}
              className="rounded-button border border-black px-4 py-2 text-[13px] font-semibold text-black transition-colors hover:bg-black hover:text-white"
            >
              {copied ? "Copied ✓" : "Copy order message"}
            </button>
          </div>
        </div>
      )}

      <p className="mt-6 text-center text-[12px] text-text-muted">
        Changed your mind about something?{" "}
        <Link href="/build/photos" className="underline">
          Start over
        </Link>
      </p>
    </BuilderChrome>
  );
}

function Row({ label, value, editHref }: { label: string; value: string; editHref: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
      <div className="min-w-0">
        <dt className="text-[12px] uppercase tracking-wider2 text-text-muted">{label}</dt>
        <dd className="truncate text-[14px]">{value}</dd>
      </div>
      <Link href={editHref} aria-label={`Edit ${label}`} className="shrink-0 text-[13px] text-text-muted hover:text-black">
        ✎ Edit
      </Link>
    </div>
  );
}
