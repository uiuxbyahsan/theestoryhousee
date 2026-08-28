"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container, btnPrimaryInverse } from "./ui";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Slow parallax on the background image only (Section 4.5).
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section ref={ref} className="relative h-[86vh] min-h-[560px] w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -bottom-[18%]">
        <Image
          src="/images/hero.jpg"
          alt="Hands holding a linen photobook beside a signature scent"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/55" />
        {/* Centered scrim to guarantee headline legibility over bright areas */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.45)_0%,transparent_65%)]" />
      </motion.div>

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
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link href="/build/photos" className={btnPrimaryInverse}>
            Begin Your Story
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-button border border-white/70 px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-white hover:text-black"
          >
            Shop all
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
