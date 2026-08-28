"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./ui";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop all" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

function WhatsAppGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.13-.56.13-.16.25-.64.81-.79.98-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43l-.48-.01c-.16 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.13.16 1.75 2.67 4.23 3.75.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-divider bg-bg">
      {/* Top promo bar — built now, left empty until a real offer exists
          (Section 4.4). Toggle hidden={false} + copy when there's an offer. */}
      <div hidden className="bg-black py-2 text-center text-[12px] tracking-wider2 text-text-white" />

      <Container className="relative flex h-16 items-center justify-between">
        {/* Left: desktop links / mobile hamburger */}
        <div className="flex items-center gap-7">
          <nav className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[15px] text-black transition-opacity hover:opacity-60"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            className="flex h-9 w-9 items-center justify-center md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <span className="space-y-[5px]">
              <span className="block h-[2px] w-5 bg-black" />
              <span className="block h-[2px] w-5 bg-black" />
              <span className="block h-[2px] w-5 bg-black" />
            </span>
          </button>
        </div>

        {/* Center: logo, absolutely centered so it stays on one line and is
            perfectly centered on every screen size (incl. mobile) */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
          aria-label="The Story House home"
        >
          <Logo />
        </Link>

        {/* Right: Create Book */}
        <div className="flex items-center justify-end">
          <Link
            href="/build/photos"
            className="hidden rounded-button bg-black px-4 py-2.5 text-[14px] font-semibold text-text-white transition-colors hover:bg-black-alt sm:inline-flex"
          >
            Create Book
          </Link>
        </div>
      </Container>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-divider bg-bg md:hidden">
          <Container className="flex flex-col py-3">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-[16px] text-black"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/build/photos"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-button bg-black px-4 py-3 text-center text-[15px] font-semibold text-text-white"
            >
              Create Book
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}

export function Breadcrumb({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <Container className="py-3">
      <nav className="flex flex-wrap items-center gap-1.5 text-[13px] text-text-muted">
        {trail.map((t, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {t.href ? (
              <Link href={t.href} className="hover:text-black">
                {t.label}
              </Link>
            ) : (
              <span className="text-black">{t.label}</span>
            )}
            {i < trail.length - 1 && <span className="opacity-50">›</span>}
          </span>
        ))}
      </nav>
    </Container>
  );
}

export { WhatsAppGlyph };
