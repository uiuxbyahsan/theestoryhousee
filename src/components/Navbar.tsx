"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useStory } from "@/context/StoryContext";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { photos, setIsTemplateModalOpen } = useStory();

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled || !isHomePage
            ? "bg-[#FFFFFF]/95 backdrop-blur-md shadow-warm-sm border-b border-[#E5DDD5] py-3.5 text-[#2A2A2A]"
            : "bg-gradient-to-b from-[#3D1117]/80 via-[#3D1117]/40 to-transparent py-5 text-[#FAF6F0]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between md:grid md:grid-cols-3">
            
            {/* Left Column: Navigation Links (Desktop) */}
            <nav className="hidden md:flex items-center space-x-6 text-[15px] font-medium">
              <Link
                href="/"
                className={`transition-colors hover:text-[#C9A769] ${
                  pathname === "/" ? "font-semibold underline decoration-[#C9A769] underline-offset-8" : ""
                }`}
              >
                Home
              </Link>
              <Link
                href="/product"
                className={`transition-colors hover:text-[#C9A769] ${
                  pathname === "/product" ? "font-semibold underline decoration-[#C9A769] underline-offset-8" : ""
                }`}
              >
                Shop all
              </Link>
              <Link
                href="/about"
                className={`transition-colors hover:text-[#C9A769] ${
                  pathname === "/about" ? "font-semibold underline decoration-[#C9A769] underline-offset-8" : ""
                }`}
              >
                About
              </Link>
              <Link
                href="/faq"
                className={`transition-colors hover:text-[#C9A769] ${
                  pathname === "/faq" ? "font-semibold underline decoration-[#C9A769] underline-offset-8" : ""
                }`}
              >
                FAQ
              </Link>
            </nav>

            {/* Mobile Left Hamburger */}
            <div className="flex md:hidden items-center w-10">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -ml-2 rounded-lg hover:bg-black/10 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Center Column: Logo Centered in One Single Line */}
            <div className="text-center flex-1 md:flex-initial px-2">
              <Link href="/" className="inline-block group">
                <span
                  className={`font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight whitespace-nowrap transition-colors ${
                    isScrolled || !isHomePage
                      ? "text-[#3D1117] group-hover:text-[#5C1A22]"
                      : "text-[#FAF6F0] group-hover:text-[#E8C896]"
                  }`}
                >
                  The Story House
                </span>
              </Link>
            </div>

            {/* Right Column: Clean CTA Button (or spacer on small mobile to keep logo centered) */}
            <div className="flex items-center justify-end md:space-x-4">
              <Link
                href="/product"
                className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full text-[14px] font-semibold tracking-wide bg-[#3D1117] text-[#FAF6F0] hover:bg-[#5C1A22] shadow-warm-sm transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Create Book</span>
                {photos.length > 0 && (
                  <span className="ml-2 bg-[#C9A769] text-[#3D1117] text-[11px] px-2 py-0.5 rounded-full font-bold">
                    {photos.length}
                  </span>
                )}
              </Link>
              {/* Invisible balancer for mobile so logo remains perfectly centered */}
              <div className="w-10 sm:hidden" aria-hidden="true" />
            </div>

          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FFFFFF] border-b border-[#E5DDD5] text-[#2A2A2A] px-6 py-6 space-y-5 shadow-warm-lg animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-3.5 text-base font-medium">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-xl transition-colors ${
                  pathname === "/" ? "bg-[#FAF6F0] font-bold text-[#3D1117]" : "hover:bg-[#FAF6F0]"
                }`}
              >
                Home
              </Link>
              <Link
                href="/product"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-xl transition-colors ${
                  pathname === "/product" ? "bg-[#FAF6F0] font-bold text-[#3D1117]" : "hover:bg-[#FAF6F0]"
                }`}
              >
                Shop all
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-xl transition-colors ${
                  pathname === "/about" ? "bg-[#FAF6F0] font-bold text-[#3D1117]" : "hover:bg-[#FAF6F0]"
                }`}
              >
                About
              </Link>
              <Link
                href="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-xl transition-colors ${
                  pathname === "/faq" ? "bg-[#FAF6F0] font-bold text-[#3D1117]" : "hover:bg-[#FAF6F0]"
                }`}
              >
                FAQ
              </Link>
              
              <div className="pt-2">
                <Link
                  href="/product"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3.5 px-6 rounded-full bg-[#3D1117] text-[#FAF6F0] font-bold text-sm text-center block shadow-warm-md hover:bg-[#5C1A22] transition-colors"
                >
                  Create My Photobook →
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
