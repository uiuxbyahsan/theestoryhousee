"use client";

import React from "react";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { generateGeneralWhatsAppInquiryUrl } from "@/utils/whatsapp";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#3D1117] text-[#FAF6F0] pt-14 pb-10 border-t border-[#5C1A22] mt-16 sm:mt-24 md:mt-32">
      
      {/* OVERSIZED "THE STORY HOUSE" WORDMARK (Sitting above footer, 40% inside the footer) */}
      <div className="absolute left-0 right-0 -top-12 sm:-top-20 md:-top-28 lg:-top-36 w-full overflow-hidden text-center pointer-events-none select-none z-10">
        <div className="w-full px-2 sm:px-4">
          <span className="font-serif text-[11.5vw] font-bold text-[#3D1117]/25 sm:text-[#3D1117]/30 tracking-tight whitespace-nowrap leading-none block transform translate-y-[40%]">
            THE STORY HOUSE
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#5C1A22]/70 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-3">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF6F0] block">
              The Story House
            </span>
            <p className="text-xs sm:text-sm text-[#FAF6F0]/80 leading-relaxed max-w-md">
              Heirloom memory keeping brand crafting 250gsm fine art photobooks paired with bespoke 75ml niche perfumes in Dubai & UAE.
            </p>

            {/* Social Media Presence */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.instagram.com/theestoryhousee/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FAF6F0] hover:bg-[#FFFFFF] text-[#3D1117] flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-[#3D1117]" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FAF6F0] hover:bg-[#FFFFFF] text-[#3D1117] flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105 text-xs font-bold"
                aria-label="TikTok"
              >
                TK
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FAF6F0] hover:bg-[#FFFFFF] text-[#3D1117] flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105 text-xs font-bold"
                aria-label="Pinterest"
              >
                P
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FAF6F0] hover:bg-[#FFFFFF] text-[#3D1117] flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105 text-xs font-bold"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href={generateGeneralWhatsAppInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FAF6F0] hover:bg-[#FFFFFF] text-[#3D1117] flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#3D1117]" />
              </a>
            </div>
          </div>

          {/* Quick Pages Links */}
          <div className="md:col-span-3 space-y-2">
            <span className="font-serif font-bold text-xs uppercase text-[#C9A769] tracking-wider block">
              Explore
            </span>
            <div className="flex flex-col space-y-1.5 text-xs text-[#FAF6F0]/80">
              <Link href="/" className="hover:text-[#C9A769] transition-colors">
                Home
              </Link>
              <Link href="/product" className="hover:text-[#C9A769] transition-colors">
                Shop all
              </Link>
              <Link href="/about" className="hover:text-[#C9A769] transition-colors">
                Who we are (About)
              </Link>
              <Link href="/faq" className="hover:text-[#C9A769] transition-colors">
                FAQ
              </Link>
              <Link href="/builder" className="hover:text-[#C9A769] transition-colors">
                Story Builder
              </Link>
            </div>
          </div>

          {/* Contact / Service */}
          <div className="md:col-span-3 space-y-2">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#C9A769]">
              Support & Inquiries
            </h3>
            <p className="text-xs text-[#FAF6F0]/80 leading-relaxed">
              Available 7 days a week for digital proofing & custom atelier orders.
            </p>
            <p className="text-xs text-[#C9A769] font-medium pt-1">
              hello@thestoryhouse.ae
            </p>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF6F0]/60 gap-3">
          <p>© {new Date().getFullYear()} The Story House. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/product#faq" className="hover:text-[#FAF6F0]">Privacy Policy</Link>
            <Link href="/product#faq" className="hover:text-[#FAF6F0]">Terms of Service</Link>
            <Link href="/product#faq" className="hover:text-[#FAF6F0]">Shipping & Returns</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
