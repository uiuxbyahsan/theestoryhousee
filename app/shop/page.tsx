"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { Breadcrumb } from "@/components/Nav";
import { Container, Reveal, Headline, btnPrimary } from "@/components/ui";
import { ScentCard } from "@/components/cards";
import { SCENTS, CATEGORIES, type Category } from "@/lib/data";

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryCategory = searchParams.get("category");
  const initialCategory: Category | "All" =
    queryCategory && CATEGORIES.includes(queryCategory as Category)
      ? (queryCategory as Category)
      : "All";

  const [selectedCategory, setSelectedCategory] = useState<Category | "All">(initialCategory);

  // Sync state with URL parameter if it changes
  useEffect(() => {
    if (queryCategory && CATEGORIES.includes(queryCategory as Category)) {
      setSelectedCategory(queryCategory as Category);
    } else if (!queryCategory) {
      setSelectedCategory("All");
    }
  }, [queryCategory]);

  function handleFilterChange(newCategory: Category | "All") {
    setSelectedCategory(newCategory);
    if (newCategory === "All") {
      router.replace("/shop", { scroll: false });
    } else {
      router.replace(`/shop?category=${encodeURIComponent(newCategory)}`, { scroll: false });
    }
  }

  const filteredScents = useMemo(() => {
    if (selectedCategory === "All") return SCENTS;
    return SCENTS.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <SiteShell>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Shop all" }]} />

      <section className="py-12 md:py-16">
        <Container>
          {/* Header row with Category Tabs Filter on the right */}
          <Reveal className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <Headline as="h1" before="Shop" accent="All" className="text-[32px] md:text-[46px]" />
              <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
                Choose your story, explore our signature fragrances, and create your custom keepsake book.
              </p>
            </div>

            {/* Category Tabs Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleFilterChange("All")}
                className={`rounded-button px-4 py-2 text-[13px] font-semibold transition-colors ${
                  selectedCategory === "All"
                    ? "bg-black text-white"
                    : "border border-divider bg-card-bg text-text-muted hover:border-black hover:text-black"
                }`}
              >
                All ({SCENTS.length})
              </button>
              {CATEGORIES.map((c) => {
                const count = SCENTS.filter((s) => s.category === c).length;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleFilterChange(c)}
                    className={`rounded-button px-4 py-2 text-[13px] font-semibold transition-colors ${
                      selectedCategory === c
                        ? "bg-black text-white"
                        : "border border-divider bg-card-bg text-text-muted hover:border-black hover:text-black"
                    }`}
                  >
                    {c} ({count})
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Filtered Scents Grid */}
          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {filteredScents.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.05}>
                <ScentCard scent={s} />
              </Reveal>
            ))}
          </div>

          {filteredScents.length === 0 && (
            <p className="py-16 text-center text-[15px] text-text-muted">
              No fragrances found for this category.
            </p>
          )}
        </Container>
      </section>

      {/* Photobook Feature Section */}
      <section className="border-t border-divider bg-white py-20 text-black">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow text-text-muted">Photobook</p>
              <Headline
                as="h2"
                before="Every story deserves a"
                accent="keepsake."
                className="mt-3 text-[30px] md:text-[46px]"
              />
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-text-muted">
                Turn your phone photos into a handcrafted 20-page linen photobook, finished with gold foil stamping and custom layout design in the UAE.
              </p>
              <Link href="/build/photos" className={`${btnPrimary} mt-7`}>
                Create Your Own Book
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative aspect-[3/2] w-full overflow-hidden border border-divider">
                <Image
                  src="/images/craftsmanship.jpg"
                  alt="Handcrafted linen photobook craftsmanship"
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <SiteShell>
          <Container className="py-20 text-center">
            <p className="text-text-muted">Loading collection…</p>
          </Container>
        </SiteShell>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
