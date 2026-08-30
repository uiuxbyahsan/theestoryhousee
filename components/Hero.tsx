"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Container, btnPrimaryInverse } from "./ui";

const HERO_SLIDES = [
  {
    src: "/images/hero.jpg",
    alt: "Hands holding a linen photobook beside a signature scent",
  },
  {
    src: "/images/scents-flatlay.jpg",
    alt: "The Story House signature scents flatlay",
  },
  {
    src: "/images/craftsmanship.jpg",
    alt: "Artisan linen book craftsmanship",
  },
  {
    src: "/images/bottle-duo.jpg",
    alt: "Signature perfume duo",
  },
  {
    src: "/images/ugc-1.png",
    alt: "Custom designed keepsake photobook pages",
  },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Slow parallax on the background
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  // Auto-advance slides every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="relative h-[86vh] min-h-[580px] w-full overflow-hidden">
      {/* ── Animated Background Slider ── */}
      <motion.div style={{ y }} className="absolute inset-0 -bottom-[18%]">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_SLIDES[currentSlide].src}
              alt={HERO_SLIDES[currentSlide].alt}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark scrims for perfect text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.5)_0%,transparent_70%)]" />
      </motion.div>

      {/* ── Foreground Content ── */}
      <Container className="relative flex h-full flex-col items-center justify-center text-center text-text-white">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="eyebrow mb-5 text-white/80"
        >
          Custom photobooks · Signature scents · UAE
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="max-w-3xl text-[36px] font-semibold leading-[1.05] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)] sm:text-[52px] md:text-[64px]"
        >
          Every memory has a <span className="accent">scent</span>. Let&apos;s find yours.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/85 md:text-[18px]"
        >
          We turn your photos into a book you can hold and read, paired with a
          scent made for that story, so you can smell the memory again.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row"
        >
          <Link href="/build/photos" className={btnPrimaryInverse}>
            Design Your Book
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 border border-white/90 bg-black/30 px-6 py-3 text-[14px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
          >
            Explore Signature Scents
          </Link>
        </motion.div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all ${
                currentSlide === idx
                  ? "w-8 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
