"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useStory } from "@/context/StoryContext";

export default function AboutPage() {
  const { setIsTemplateModalOpen } = useStory();

  return (
    <div className="bg-[#FAF6F0] text-[#2A2A2A] pt-32 pb-0 overflow-hidden">
      
      {/* 1. MISSION STATEMENT HEADER */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pb-20 lg:pb-28">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3D1117] leading-tight max-w-3xl mx-auto">
          We&apos;re on a simple mission: <br />
          <span className="font-normal text-[#5C1A22]">
            To get your most beautiful trips out of your phone and turn them into objects you&apos;ll keep for life.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[#2A2A2A]/80 max-w-2xl mx-auto font-serif italic">
          Albums designed like collector&apos;s pieces, beautiful to display and moving to reopen.
        </p>
      </section>

      {/* 2. THREE ALTERNATING STORY BLOCKS (Matching Screenshot 1) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32 pb-24 lg:pb-28">
        
        {/* Block 1: Left Image, Right Text */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          <div className="md:col-span-6">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-warm-md border border-[#E5DDD5]">
              <Image
                src="/images/photo-girls-wine.png"
                alt="The Story House was born from a conviction"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-6 space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3D1117] leading-snug">
              The Story House was born from a conviction
            </h2>
            <p className="text-sm sm:text-base text-[#2A2A2A]/80 leading-relaxed font-normal">
              Living memories shouldn&apos;t end in a forgotten cloud library at the bottom of a phone screen. Those moments deserve better than a quick scroll: the sunrise, the secret courtyard, the words only you understand. They deserve a physical place in your life. Something you can touch, read, and proudly display on your coffee table.
            </p>
          </div>
        </div>

        {/* Block 2: Left Text, Right Image */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          <div className="md:col-span-6 order-2 md:order-1 space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3D1117] leading-snug">
              We don&apos;t make photo albums. We make memories you can reopen.
            </h2>
            <p className="text-sm sm:text-base text-[#2A2A2A]/80 leading-relaxed font-normal">
              Every Story House album is designed like a real coffee table book, the kind of tactile keepsake you rediscover years later when your hair turns white and that brings all that magic back. Not just into the mind. In a sensory object.
            </p>
          </div>

          <div className="md:col-span-6 order-1 md:order-2">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-warm-md border border-[#E5DDD5]">
              <Image
                src="/images/photo-lisbon-yellow.png"
                alt="Memories you can reopen"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Block 3: Left Image, Right Text */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          <div className="md:col-span-6">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-warm-md border border-[#E5DDD5]">
              <Image
                src="/images/photo-girl-paris.png"
                alt="We're obsessed with three things"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="md:col-span-6 space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3D1117] leading-snug">
              We&apos;re obsessed with three things: quality, detail, and you.
            </h2>
            <p className="text-sm sm:text-base text-[#2A2A2A]/80 leading-relaxed font-normal">
              We print on premium heavy paper that makes every color pop, at specialized facilities ensuring fast delivery across the UAE & GCC. Our editorial team inspects every single digital spread before it prints. The best part? Digital flip proof on WhatsApp in minutes. You add your memories; we handle the rest. 💛
            </p>
          </div>
        </div>

      </section>

      {/* 3. TIME TO PRINT BANNER */}
      <section className="py-16 lg:py-28 bg-[#FFF9EE] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D1117]">
            It&apos;s time to print these memories
          </h2>
          <p className="text-xs sm:text-sm text-[#2A2A2A]/80">
            Join the storytellers who have already turned their memories into albums to keep forever.
          </p>
        </div>
      </section>

      {/* 4. 4-CATEGORY CARDS */}
      <section className="py-20 lg:py-28 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            {/* COUPLE */}
            <div
              onClick={() => setIsTemplateModalOpen(true)}
              className="group cursor-pointer space-y-3 flex flex-col items-center"
            >
              <div className="relative w-full aspect-[3/4] rounded-xl shadow-warm-sm group-hover:shadow-warm-md transition-all duration-300 transform group-hover:-translate-y-1 bg-[#FAF6F0] border border-[#E8D6D2] overflow-hidden flex items-center justify-center p-3">
                <Image
                  src="/images/Amor_Mitte.webp"
                  alt="amor. Couple Photobook"
                  fill
                  className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="font-sans text-xs font-bold tracking-widest text-[#2A2A2A] uppercase">
                COUPLE
              </span>
            </div>

            {/* TRAVEL */}
            <div
              onClick={() => setIsTemplateModalOpen(true)}
              className="group cursor-pointer space-y-3 flex flex-col items-center"
            >
              <div className="relative w-full aspect-[3/4] rounded-xl shadow-warm-sm group-hover:shadow-warm-md transition-all duration-300 transform group-hover:-translate-y-1 bg-[#E62B2B] overflow-hidden flex flex-col justify-between p-4 text-center">
                <span className="font-sans font-black text-xl text-[#FFDE59] uppercase">
                  IBIZA
                </span>
                <div className="text-3xl my-auto">🍒</div>
                <span className="text-[10px] text-white/80">2025</span>
              </div>
              <span className="font-sans text-xs font-bold tracking-widest text-[#2A2A2A] uppercase">
                TRAVEL
              </span>
            </div>

            {/* ANNIVERSARY */}
            <div
              onClick={() => setIsTemplateModalOpen(true)}
              className="group cursor-pointer space-y-3 flex flex-col items-center"
            >
              <div className="relative w-full aspect-[3/4] rounded-xl shadow-warm-sm group-hover:shadow-warm-md transition-all duration-300 transform group-hover:-translate-y-1 bg-[#EBE7E0] border border-[#DDD5CA] overflow-hidden flex flex-col justify-between p-4 text-center">
                <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/20 to-transparent"></div>
                <div className="my-auto space-y-1">
                  <span className="font-serif text-2xl text-[#C9A769] block">💍</span>
                  <span className="font-serif font-bold text-xs uppercase text-[#2A2A2A] block leading-snug">
                    ONE YEAR WITH YOU
                  </span>
                </div>
                <span className="text-[9px] text-[#2A2A2A]/40 font-mono tracking-widest">
                  HEIRLOOM
                </span>
              </div>
              <span className="font-sans text-xs font-bold tracking-widest text-[#2A2A2A] uppercase">
                ANNIVERSARY
              </span>
            </div>

            {/* FRIENDS */}
            <div
              onClick={() => setIsTemplateModalOpen(true)}
              className="group cursor-pointer space-y-3 flex flex-col items-center"
            >
              <div className="relative w-full aspect-[3/4] rounded-xl shadow-warm-sm group-hover:shadow-warm-md transition-all duration-300 transform group-hover:-translate-y-1 bg-[#FAF6F0] border border-[#E5DDD5] overflow-hidden flex items-center justify-center p-3">
                <Image
                  src="/images/Pics_We_Can_Never_Post.webp"
                  alt="pics we can never post Friends Photobook"
                  fill
                  className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="font-sans text-xs font-bold tracking-widest text-[#2A2A2A] uppercase">
                FRIENDS
              </span>
            </div>

          </div>

          <div className="pt-10 text-center">
            <Link
              href="/product"
              className="inline-block px-10 py-4 rounded-full bg-[#3D1117] hover:bg-[#5C1A22] text-[#FAF6F0] font-bold text-sm tracking-wide shadow-warm-sm transition-all"
            >
              Create My Photobook
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
