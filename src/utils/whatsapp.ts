import { WHATSAPP_NUMBER } from "@/data/products";

export interface WhatsAppOrderPayload {
  bundleName: string;
  themeName: string;
  templateName?: string;
  basePages: number;
  extraPages: number;
  scentName: string;
  photoCount: number;
  minPhotos: number;
  bookTitle?: string;
  bookSubtitle?: string;
  dedication?: string;
  totalPriceAed: number;
  isMemorial?: boolean;
}

export function generateWhatsAppOrderUrl(payload: WhatsAppOrderPayload): string {
  const totalPages = payload.basePages + payload.extraPages;
  const pageDetails = payload.extraPages > 0 
    ? `${payload.basePages} base + ${payload.extraPages} extra (${totalPages} total)`
    : `${payload.basePages} pages`;

  const isMemorial = payload.isMemorial || payload.themeName.toLowerCase().includes("memorial");

  const greeting = isMemorial
    ? `Hi The Story House 🕊️ I'd like to create a sacred heirloom keepsake:`
    : `Hi The Story House! 👋 I'd like to order:`;

  const lines = [
    greeting,
    ``,
    `Bundle: ${payload.bundleName}`,
    `Theme: ${payload.themeName}`,
  ];

  if (payload.templateName) {
    lines.push(`Template: ${payload.templateName}`);
  }

  lines.push(
    `Pages: ${pageDetails}`,
    `Scent: ${payload.scentName}`,
    `Photos uploaded: ${payload.photoCount}/${payload.minPhotos} ${payload.photoCount >= payload.minPhotos ? '✅' : '⏳'}`,
  );

  if (payload.bookTitle) {
    lines.push(`Cover Inscription: "${payload.bookTitle}"`);
  }
  if (payload.bookSubtitle) {
    lines.push(`Spine Text: "${payload.bookSubtitle}"`);
  }
  if (payload.dedication) {
    lines.push(`Flap Dedication: "${payload.dedication}"`);
  }

  lines.push(
    `Total Investment: ${payload.totalPriceAed.toLocaleString()} AED`,
    ``,
    `Name: `,
    `Delivery area: `,
    ``,
    `Thank you!`
  );

  const fullText = lines.join("\n");
  const encodedText = encodeURIComponent(fullText);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
}

export function generateGeneralWhatsAppInquiryUrl(topic = "general"): string {
  let message = "Hi! I'd like to know more about The Story House 📖";
  if (topic === "custom-scent") {
    message = "Hi The Story House! 🌿 I am interested in commissioning a bespoke custom scent for my story book. Could you share the details?";
  } else if (topic === "sample") {
    message = "Hi The Story House! 📖 I'd like to see a sample digital proof and smell-card kit for the UAE region.";
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
