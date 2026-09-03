import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { Hero } from "@/components/Hero";
import { Container, Reveal, Headline, btnPrimary } from "@/components/ui";
import { ScentCard } from "@/components/cards";
import { SCENTS } from "@/lib/data";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />

      {/* Trust bar */}
      <div className="bg-bg-alt">
        <Container className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-3.5 text-[13px] text-text-muted">
          <span className="flex items-center gap-1.5">
            <span className="text-gold">★★★★★</span> Loved by storytellers across the UAE
          </span>
          <span className="hidden sm:inline">·</span>
          <span>Hand-designed covers</span>
          <span className="hidden sm:inline">·</span>
          <span>Print quality guaranteed</span>
        </Container>
      </div>

      {/* Scent lineup */}
      <section className="bg-bg-alt py-20">
        <Container>
          <Reveal className="mb-10 text-center">
            <Headline as="h2" before="The seven" accent="scents" className="text-[28px] md:text-[40px]" />
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SCENTS.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.05}>
                <ScentCard scent={s} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Scent pairing preview — dark section, for light/dark rhythm above
          the light "Photobook" section that follows */}
      <section className="bg-black py-20 text-text-white">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow text-white/60">Scent Your Story</p>
              <Headline
                as="h2"
                before="Every story has a"
                accent="scent."
                className="mt-3 text-[30px] md:text-[46px]"
              />
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
                Seven signature scents crafted for every kind of memory.
                Your book comes paired with the one that fits your story.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative aspect-[3/2] w-full overflow-hidden border border-white/10">
                <Image
                  src="/images/scents-flatlay.jpg"
                  alt="The seven Story House signature scents"
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Quality / Craft — mirror of "Every story has a scent", inverted:
          image on the left, text on the right */}
      <section className="py-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal className="lg:order-1">
              <div className="relative aspect-[3/2] w-full overflow-hidden border border-divider">
                <Image
                  src="/images/craftsmanship.jpg"
                  alt="A hand-designed Story House linen photobook"
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:order-2">
              <p className="eyebrow text-text-muted">The Photobook</p>
              <Headline
                as="h2"
                before="Made to"
                accent="last"
                className="mt-3 text-[30px] md:text-[46px]"
              />
              <div className="mt-7 space-y-5">
                {CRAFT_POINTS.map((p) => (
                  <div key={p.title} className="flex gap-3.5">
                    <span className="mt-0.5 shrink-0 text-gold">{p.icon}</span>
                    <div>
                      <h3 className="text-[15px] font-semibold">{p.title}</h3>
                      <p className="mt-0.5 text-[14px] leading-relaxed text-text-muted">
                        {p.copy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/build/photos" className={`${btnPrimary} mt-8`}>
                Design Your Book
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}

function CraftIcon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {d.split("|").map((path, i) => (
        <path key={i} d={path} />
      ))}
    </svg>
  );
}

const CRAFT_POINTS = [
  {
    title: "Clear photos, even from your phone",
    copy: "Your images, printed in premium quality. Sharp. Bright. Beautiful.",
    icon: <CraftIcon d="M3 8.5a1.5 1.5 0 011.5-1.5H7l1.3-1.8a1 1 0 01.8-.4h5.8a1 1 0 01.8.4L17 7h2.5A1.5 1.5 0 0121 8.5v9A1.5 1.5 0 0119.5 19h-15A1.5 1.5 0 013 17.5v-9z|M12 16a3.2 3.2 0 100-6.4A3.2 3.2 0 0012 16z" />,
  },
  {
    title: "Printed in the UAE",
    copy: "Every book is printed locally, with care and premium materials, ready fast.",
    icon: <CraftIcon d="M12 21s6.5-5.8 6.5-11a6.5 6.5 0 10-13 0c0 5.2 6.5 11 6.5 11z|M12 12a2.4 2.4 0 100-4.8A2.4 2.4 0 0012 12z" />,
  },
  {
    title: "Hand-designed covers",
    copy: "No templates. Each cover is chosen and crafted to match your story.",
    icon: <CraftIcon d="M4 20l4.5-1.2 9-9a2.1 2.1 0 00-3-3l-9 9L4 20z|M13.5 6.5l3 3" />,
  },
];
