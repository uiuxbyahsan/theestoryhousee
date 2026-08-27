import {
  BASE_PAGES,
  EXTRA_PAGE_PRICE,
  MIN_PHOTOS,
  bundleById,
  scentById,
  templateById,
} from "./data";

// ⚠️ DEMO number — non-functional. Replace with the real business
// WhatsApp number before launch (Section 7A).
export const WHATSAPP_NUMBER = "971500000000";

export interface OrderState {
  bundleId: string;
  templateId: string | null;
  scentId: string | null;
  extraPages: number;
  photoCount: number;
  bookTitle?: string;
  dedication?: string;
  customerName?: string;
  deliveryArea?: string;
  extraNote?: string;
}

export function orderTotal(state: {
  bundleId: string;
  scentId: string | null;
  extraPages: number;
}): number {
  const bundle = bundleById(state.bundleId);
  const base = bundle?.price ?? 0;
  return base + state.extraPages * EXTRA_PAGE_PRICE;
}

// Builds the pre-filled WhatsApp message (Section 7A / 7D). The scent line
// is omitted entirely when no scent was selected.
export function buildWhatsAppMessage(state: OrderState): string {
  const bundle = bundleById(state.bundleId);
  const template = state.templateId ? templateById(state.templateId) : null;
  const scent = state.scentId ? scentById(state.scentId) : null;

  const category = template?.category ?? scent?.category;
  const lines: string[] = ["Hi The Story House! 👋 I'd like to order:", ""];
  lines.push(`Bundle: ${bundle?.name ?? "Not selected"}`);
  if (category) lines.push(`Category: ${category}`);
  if (template) lines.push(`Template: ${template.name}`);
  lines.push(
    `Pages: ${BASE_PAGES}${state.extraPages ? ` + ${state.extraPages}` : ""}`
  );
  if (scent) lines.push(`Scent: ${scent.name}`);
  lines.push(`Photos uploaded: ${state.photoCount}/${MIN_PHOTOS}`);
  if (state.bookTitle) lines.push(`Book title: ${state.bookTitle}`);
  if (state.dedication) lines.push(`Dedication: ${state.dedication}`);
  if (state.extraNote) lines.push(`Extra request: ${state.extraNote}`);
  lines.push(`Name: ${state.customerName ?? ""}`);
  lines.push(`Delivery area: ${state.deliveryArea ?? ""}`);
  lines.push("", "Thank you!");
  return lines.join("\n");
}

export function whatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Simple entry point for the floating button / non-builder visitors.
export const SIMPLE_WHATSAPP_HREF = whatsappHref(
  "Hi! I'd like to know more about The Story House 📖"
);

export const EMIRATES = [
  "Abu Dhabi",
  "Dubai",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
  "Outside the UAE",
];
