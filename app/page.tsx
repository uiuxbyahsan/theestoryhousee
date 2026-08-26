import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { Hero } from "@/components/Hero";
import { Container, Reveal, Headline, btnPrimaryInverse, btnGhost } from "@/components/ui";
import { BundleCard, BundleVisual, ScentCard, StoryTypeCard } from "@/components/cards";
import { BUNDLES, SCENTS, STORY_TYPES, bundleById } from "@/lib/data";

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

      {/* Shop by story type */}
      <section className="bg-bg-alt py-20">
        <Container>
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <Headline as="h2" before="Shop by" accent="story" className="text-[28px] md:text-[40px]" />
            <Link href="/shop" className={btnGhost}>
              See all bundles →
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {STORY_TYPES.map((s, i) => (
              <Reveal key={s.theme} delay={i * 0.05}>
                <StoryTypeCard theme={s.theme} title={s.title} copy={s.copy} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Bundle Offers (neutral framing — no invented promo) */}
      <section className="py-20">
        <Container>
          <Reveal className="mb-10 max-w-xl">
            <Headline as="h2" before="Our" accent="bundles" className="text-[28px] md:text-[40px]" />
            <p className="mt-3 text-[15px] text-text-muted">
              Every order is book-first. Add a signature scent, or two, to bring
              the story fully to life.
            </p>
          </Reveal>
          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {BUNDLES.map((b, i) => (
              <Reveal key={b.id} delay={i * 0.06}>
                <BundleCard
                  bundle={b}
                  visual={<BundleVisual bundle={b} />}
                  ctaHref={`/product/${b.id}`}
                />
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
                Seven signature scents, each made for a different kind of memory,
                from sun-warmed travels to slow wedding nights. Your book comes
                paired with the one that fits your story.
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

      {/* Selected Packages — editorial framing of the same bundles */}
      <section className="py-20">
        <Container>
          <Reveal className="mb-10 max-w-xl">
            <Headline as="h2" before="Selected" accent="packages" className="text-[28px] md:text-[40px]" />
            <p className="mt-3 text-[15px] text-text-muted">
              Curated pairings for the occasions people reach for most.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {PACKAGES.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <BundleCard
                  bundle={{
                    id: p.id,
                    name: p.name,
                    // Consistent canonical bundle description (Round 3, item 4)
                    blurb: bundleById(p.bundleId)?.blurb ?? "",
                    price: bundleById(p.bundleId)?.price ?? 0,
                    includesScent: 1,
                    books: 1,
                  }}
                  image={PACKAGE_IMG}
                  quickView
                  ctaHref={`/product/${p.bundleId}`}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

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

      {/* UGC / social proof */}
      <section className="py-20">
        <Container>
          <Reveal className="mb-8">
            <Headline as="h2" before="From our" accent="storytellers" className="text-[28px] md:text-[40px]" />
            <p className="mt-2 text-[14px] text-text-muted">Real books, real memories.</p>
          </Reveal>
        </Container>
        <div className="scroll-row flex gap-4 overflow-x-auto px-5 pb-4 sm:px-8">
          {["/images/ugc-1.png", "/images/ugc-2.png", "/images/ugc-3.png", "/images/ugc-4.png", "/images/ugc-5.png"].map(
            (src, i) => (
              <div key={src} className="relative aspect-[4/5] w-[70vw] shrink-0 overflow-hidden border border-divider sm:w-[300px]">
                <Image src={src} alt={`Customer memory ${i + 1}`} fill className="object-cover" />
              </div>
            )
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-black py-20 text-text-white">
        <Container>
          <Reveal className="mb-12 text-center">
            <Headline as="h2" before="How it" accent="works" className="text-[28px] md:text-[40px]" />
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1} className="text-center">
                <span className="accent text-[40px] text-gold">0{i + 1}</span>
                <h3 className="mt-2 text-[18px] font-semibold">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/70">{s.copy}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <Link href="/build/photos" className={btnPrimaryInverse}>
              Begin Your Story
            </Link>
          </Reveal>
        </Container>
      </section>
    </SiteShell>
  );
}

// Placeholder package/gift-box imagery. Swap PACKAGE_IMG for real package
// photography once available (one-line change).
const PACKAGE_IMG = "/images/bottle-duo.jpg";

const PACKAGES = [
  { id: "pkg-wedding", name: "The Wedding Story", bundleId: "the-story-scent", copy: "The day you said forever, kept in full." },
  { id: "pkg-baby", name: "The Baby Story", bundleId: "the-story-scent", copy: "The very first chapter, softly told." },
  { id: "pkg-travel", name: "The Travel Story", bundleId: "the-story-scent", copy: "The trips that changed you." },
];

const STEPS = [
  { title: "Choose your cover and scent", copy: "Pick an occasion cover and the signature scent made for it." },
  { title: "Upload your photos", copy: "Add at least 45 HD photos from your phone, Google Photos or WhatsApp." },
  { title: "Send it on WhatsApp", copy: "We finish the design with you and print it. No checkout, no fuss." },
];
