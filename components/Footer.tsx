import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./ui";
import { WhatsAppGlyph } from "./Nav";
import { SIMPLE_WHATSAPP_HREF } from "@/lib/order";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-divider bg-black text-text-white">
      {/* Oversized wordmark teaser (Section 4.4, item 9) */}
      <div className="overflow-hidden border-b border-white/10">
        <Container className="pt-16">
          <p className="select-none whitespace-nowrap text-[19vw] leading-[0.8] tracking-tight text-white/[0.06] md:text-[13vw]">
            <span className="accent text-white/[0.1]">Scent</span> Your Story
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
          title="Stories"
          links={[
            { href: "/shop", label: "Travel" },
            { href: "/shop", label: "Wedding" },
            { href: "/shop", label: "Baby" },
            { href: "/shop", label: "Memorial" },
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
