"use client";

import React from "react";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { generateGeneralWhatsAppInquiryUrl } from "@/utils/whatsapp";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#3D1117] text-[#FAF6F0] pt-14 pb-10 border-t border-[#5C1A22] mt-12 sm:mt-18 md:mt-24">
      
      {/* OVERSIZED "THE STORY HOUSE" WORDMARK (90% above footer, 10% Y-axis offset inside footer) */}
      <div className="absolute left-0 right-0 -top-12 sm:-top-18 md:-top-24 lg:-top-32 w-full overflow-hidden text-center pointer-events-none select-none z-10">
        <div className="w-full px-2 sm:px-4">
          <span className="font-serif text-[11.5vw] font-bold text-[#3D1117]/25 sm:text-[#3D1117]/30 tracking-tight whitespace-nowrap leading-none block transform translate-y-[10%]">
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
                className="w-9 h-9 rounded-full bg-[#FAF6F0] hover:bg-[#FFFFFF] text-[#3D1117] flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M16 8.24537V15.5C16 19.0899 13.0899 22 9.5 22C5.91015 22 3 19.0899 3 15.5C3 11.9101 5.91015 9 9.5 9C10.0163 9 10.5185 9.06019 11 9.17393V12.3368C10.5454 12.1208 10.0368 12 9.5 12C7.567 12 6 13.567 6 15.5C6 17.433 7.567 19 9.5 19C11.433 19 13 17.433 13 15.5V2H16C16 4.76142 18.2386 7 21 7V10C19.1081 10 17.3696 9.34328 16 8.24537Z" />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FAF6F0] hover:bg-[#FFFFFF] text-[#3D1117] flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47062 14 5.5 16 5.5H17.5V2.1401C17.1743 2.09685 15.943 2 14.6429 2C11.9284 2 10 3.65686 10 6.69971V9.5H7V13.5H10V22H14V13.5Z" />
                </svg>
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
