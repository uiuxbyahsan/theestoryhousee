import { SIMPLE_WHATSAPP_HREF } from "@/lib/order";
import { WhatsAppGlyph } from "./Nav";

// Sticky low-friction entry point on every page (Section 7A).
export function FloatingWhatsApp() {
  return (
    <a
      href={SIMPLE_WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <WhatsAppGlyph className="h-7 w-7" />
    </a>
  );
}
