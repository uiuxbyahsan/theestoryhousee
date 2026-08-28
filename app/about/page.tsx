import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { Breadcrumb } from "@/components/Nav";
import { Container, Reveal, Headline, btnPrimary } from "@/components/ui";

export const metadata = { title: "Our story | The Story House" };

export default function AboutPage() {
  return (
    <SiteShell>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <Container className="py-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-text-muted">Our story</p>
          <Headline
            as="h1"
            before="Stories to read. Journeys to remember."
            accent="Scents to keep."
            className="mt-3 text-[30px] leading-tight md:text-[46px]"
          />
        </Reveal>
      </Container>

      {/* Pull-quote split */}
      <Container className="grid items-center gap-12 pb-16 lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-divider">
            <Image src="/images/craftsmanship.jpg" alt="A Story House book, hand-held" fill className="object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote className="accent text-[26px] leading-snug md:text-[34px]">
            &ldquo;We started The Story House because a photo shows you the moment,
            but a scent puts you back inside it.&rdquo;
          </blockquote>
          <p className="mt-5 text-[14px] font-semibold">The Story House</p>
          <ul className="mt-6 space-y-2.5 text-[15px] text-text-muted">
            {[
              "Hand-designed hardcover photobooks",
              "Seven signature scents, sourced in the UAE",
              "Every page reviewed with you before it prints",
              "Made for the occasions that deserve more than a camera roll",
            ].map((li) => (
              <li key={li} className="flex gap-2">
                <span className="text-gold">✓</span> {li}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>

      {/* Sensory model */}
      <Container className="py-16">
        <Reveal className="mb-10 text-center">
          <Headline as="h2" before="Read it. Remember it." accent="Smell it." className="text-[26px] md:text-[38px]" />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: "The book", c: "A premium hardcover of your photos, designed by hand around the story you're telling." },
            { t: "The scent", c: "An 80ml signature perfume paired to your story, the sense that carries memory furthest." },
            { t: "The keepsake", c: "Together, something you can hold, read and smell again for years to come." },
          ].map((x, i) => (
            <Reveal key={x.t} delay={i * 0.08}>
              <div className="h-full border border-divider p-8">
                <h3 className="text-[18px] font-semibold">{x.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-text-muted">{x.c}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <Link href="/build/photos" className={btnPrimary}>
            Begin Your Story
          </Link>
        </Reveal>
      </Container>
    </SiteShell>
  );
}
