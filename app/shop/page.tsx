import { SiteShell } from "@/components/SiteShell";
import { Breadcrumb } from "@/components/Nav";
import { Container, Reveal, Headline } from "@/components/ui";
import { BundleCard, BundleVisual, StoryTypeCard } from "@/components/cards";
import { BUNDLES, STORY_TYPES } from "@/lib/data";

export const metadata = { title: "Shop all | The Story House" };

export default function ShopPage() {
  return (
    <SiteShell>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Shop all" }]} />
      <Container className="py-6">
        <Reveal className="max-w-2xl">
          <Headline as="h1" before="Ways to" accent="order" className="text-[32px] md:text-[48px]" />
          <p className="mt-3 text-[15px] text-text-muted">
            Every order is book-first. Choose a bundle below. Scent is added
            inside the builder, chosen for your story.
          </p>
        </Reveal>
      </Container>

      <Container className="pb-16">
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          {BUNDLES.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.06}>
              <BundleCard bundle={b} visual={<BundleVisual bundle={b} />} ctaHref={`/product/${b.id}`} />
            </Reveal>
          ))}
        </div>
      </Container>

      <section className="bg-bg-alt py-16">
        <Container>
          <Reveal className="mb-8">
            <Headline as="h2" before="Shop by" accent="story" className="text-[26px] md:text-[36px]" />
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
    </SiteShell>
  );
}
