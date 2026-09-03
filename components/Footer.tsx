import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./ui";
import { WhatsAppGlyph } from "./Nav";
import { SIMPLE_WHATSAPP_HREF } from "@/lib/order";

export function Footer() {
  return (
    <footer className="mt-24 bg-black text-text-white">
      {/* Oversized wordmark teaser: one deliberate exception to the mixed-font
          headline system — the whole wordmark is a single Playfair Display
          typeface, centered, fluidly sized to fit fully (no cropping). */}
      <div className="border-b border-white/10">
        <Container className="py-12 text-center">
          <p className="accent select-none whitespace-nowrap text-[clamp(1.75rem,8.5vw,7rem)] leading-[1.15] text-white/[0.1]">
            Scent Your Story
          </p>
        </Container>
      </div>

      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-white/70">
            Custom photobooks paired with a signature scent, made for the story
            you never want to forget.
          </p>
          <a
            href={SIMPLE_WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-[14px] text-white/90 hover:text-white"
          >
            <WhatsAppGlyph className="h-5 w-5" /> Order on WhatsApp
          </a>
        </div>

        <FooterCol
          title="Explore"
          links={[
            { href: "/", label: "Home" },
            { href: "/shop", label: "Shop all" },
            { href: "/build/photos", label: "Create your book" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { href: "/about", label: "Our story" },
            { href: "/faq", label: "FAQ" },
          ]}
        />
        <FooterCol
          title="Categories"
          links={[
            { href: "/shop", label: "Male" },
            { href: "/shop", label: "Female" },
            { href: "/shop", label: "Unisex" },
          ]}
        />
      </Container>

      <Container className="flex flex-col gap-2 border-t border-white/10 py-6 text-[12px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} The Story House. All rights reserved.</span>
        <span>Made in the UAE · Ordering via WhatsApp</span>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-[13px] font-semibold uppercase tracking-wider2 text-white/50">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((l, i) => (
          <li key={i}>
            <Link href={l.href} className="text-[14px] text-white/80 hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
