import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { Hero } from "@/components/Hero";
import { Container, Reveal, Headline, btnPrimary, btnPrimaryInverse, btnGhost } from "@/components/ui";
import { ScentCard, CategoryCard } from "@/components/cards";
import { SCENTS, CATEGORY_TILES } from "@/lib/data";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />

      {/* Trust bar */}
      <div className="border-b border-divider bg-bg-alt">
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
          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {SCENTS.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.05}>
                <ScentCard scent={s} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Scent pairing preview */}
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
              <Link href="/build/photos" className={`${btnPrimaryInverse} mt-7`}>
                Find your scent
              </Link>
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

      {/* Shop by story type */}
      <section className="bg-bg-alt py-20">
        <Container>
          <Reveal className="mb-10">
            <Headline as="h2" before="Shop by" accent="category" className="text-[28px] md:text-[40px]" />
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {CATEGORY_TILES.map((c, i) => (
              <Reveal key={c.category} delay={i * 0.06}>
                <CategoryCard category={c.category} title={c.title} copy={c.copy} scentId={c.scentId} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
