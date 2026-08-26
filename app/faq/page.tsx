"use client";

import { useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { Breadcrumb } from "@/components/Nav";
import { Container, Reveal, Headline } from "@/components/ui";
import { FAQ_ITEMS } from "@/lib/faq";

export default function FaqPage() {
  return (
    <SiteShell>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <Container className="max-w-3xl py-8 pb-20">
        <Reveal>
          <Headline as="h1" before="Questions," accent="answered" className="text-[32px] md:text-[48px]" />
          <p className="mt-3 text-[15px] text-text-muted">
            Everything about the books, the scents and ordering on WhatsApp.
          </p>
        </Reveal>
        <div className="mt-10 divide-y divide-divider border-y border-divider">
          {FAQ_ITEMS.map((f) => (
            <Item key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </Container>
    </SiteShell>
  );
}

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-[16px] font-medium"
      >
        {q}
        <span className="text-2xl leading-none text-text-muted">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="pb-5 text-[15px] leading-relaxed text-text-muted">{a}</p>}
    </div>
  );
}
