"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, MessageCircle, Mail } from "lucide-react";
import { generateGeneralWhatsAppInquiryUrl } from "@/utils/whatsapp";

interface FaqCategory {
  category: string;
  items: { q: string; a: string }[];
}

const FAQ_SECTIONS: FaqCategory[] = [
  {
    category: "Your album's quality",
    items: [
      {
        q: "Will my photos be sharp, even taken on a phone?",
        a: "Yes! Our high-definition printing is specially calibrated for smartphone cameras. We automatically optimize lighting, color balance, and resolution so your memories look crisp, rich, and vibrant."
      },
      {
        q: "What's the paper quality?",
        a: "We use museum-grade 250gsm fine art archival matte paper. It's thick, fingerprint-resistant, and acid-free to ensure colors don't fade for over 100 years."
      },
      {
        q: "Is the paper glossy or matte?",
        a: "Our paper features an elegant, glare-free velvet matte finish that feels wonderfully tactile to touch and doesn't reflect reflections under living room lighting."
      },
      {
        q: "And my full-page photos, do they look good?",
        a: "Stunningly. Thanks to our true lay-flat binding, full-spread photos stretch across both pages without any crucial details disappearing into the center spine gutter."
      },
      {
        q: "Could my photos get cut off in the fold?",
        a: "No. Our lay-flat construction ensures every page opens 180° flat, keeping all edge compositions and captions fully visible."
      },
      {
        q: "What does it look like in real life?",
        a: "It feels like a high-end luxury art book from an upscale gallery — substantial weight, cloth or matte hardcover, foil stamping, and crisp pages."
      },
      {
        q: "What if I receive an album with a defect?",
        a: "We have a 100% Quality Reprint Guarantee. If there is any flaw in printing or shipping damage, we reprint and re-ship it immediately at no cost to you."
      },
    ]
  },
  {
    category: "Create and personalize your album",
    items: [
      {
        q: "Is it complicated to make?",
        a: "Not at all. You pick your cover template, select your photos from your phone or Google Photos, and our editorial system creates a balanced spread."
      },
      {
        q: "I'm not creative, will I manage?",
        a: "Absolutely! Our pre-curated cover inscriptions and automated spread balance ensure every album looks professionally art-directed."
      },
      {
        q: "How does the AI & layout system work?",
        a: "Our system organizes your photos chronologically and pairs vertical and horizontal moments into harmonious editorial spreads."
      },
      {
        q: "Can I customize everything?",
        a: "You can customize the title, subtitle, dedication letter, page sequence, and photo captions before giving final WhatsApp approval."
      },
      {
        q: "How many photos can I add?",
        a: "Our base 20-page heirloom requires a minimum of 40 photos. You can easily add extra pages beyond 20 if you have more memories."
      },
      {
        q: "Can I do it from my phone?",
        a: "Yes! 95% of our storytellers build their books directly from their mobile browser without downloading any external apps."
      },
      {
        q: "Is my album saved if I leave the site?",
        a: "Yes, your photo selections and inscriptions are preserved in your local session, and once you message us on WhatsApp, our concierge saves your project on file."
      },
    ]
  },
  {
    category: "Shipping & tracking",
    items: [
      {
        q: "How long until I receive my album?",
        a: "Production takes 2–3 working days after WhatsApp proof approval. Delivery within the UAE is 24–48 hours; GCC orders arrive in 3–5 days."
      },
      {
        q: "Do I get order tracking?",
        a: "Yes, you receive a direct SMS and WhatsApp notification with live courier tracking as soon as your package leaves our atelier."
      },
      {
        q: "My tracking isn't moving / I haven't received my album. What should I do?",
        a: "Simply message our WhatsApp concierge anytime. We have dedicated dispatch support to resolve any delivery inquiry within minutes."
      },
      {
        q: "How much is shipping?",
        a: "Standard courier delivery is free across Dubai & UAE on all book and bundle orders. Nominal regional rates apply across GCC."
      },
      {
        q: "Do you deliver to my country?",
        a: "We deliver across UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman, as well as international destinations upon request."
      },
    ]
  },
  {
    category: "Order, payment & promo code",
    items: [
      {
        q: "Where do I enter my promo code?",
        a: "You can mention any active gift code or referral directly to our WhatsApp concierge when confirming your order."
      },
      {
        q: "What payment methods do you accept?",
        a: "We support secure local payment links (Apple Pay, Visa, Mastercard) as well as direct bank transfers upon digital proof approval."
      },
      {
        q: "Can I edit my album after ordering?",
        a: "Yes! We always send you a complete digital flip proof on WhatsApp before anything goes to print. You can request any image swap or text change."
      },
    ]
  },
  {
    category: "Price and offers",
    items: [
      {
        q: "Why this price?",
        a: "Unlike flimsy print-on-demand booklets, The Story House creates heirloom keepsakes with 250gsm archival paper, hand-bound lay-flat covers, and genuine 75ml niche Eau de Parfum."
      },
      {
        q: "Do you offer discounts for multiple books?",
        a: "Yes! We offer bundled tiers ('The Story Duo' and 'Family Pack') that include substantial savings when printing multiple copies."
      },
      {
        q: "Do I get a discount if I order several?",
        a: "Yes, our multi-book bundles are discounted up to 25% off standard single-album pricing."
      },
    ]
  },
  {
    category: "Gifting an album",
    items: [
      {
        q: "Is it a good gift idea?",
        a: "It is one of the most emotional gifts you can give. Each photobook comes wrapped in a luxury presentation box paired with its signature fragrance."
      },
      {
        q: "Can I send it directly to the person?",
        a: "Yes! We include a handwritten dedication card and omit all pricing invoices when delivering directly to your gift recipient."
      },
      {
        q: "What if I don't know their photos or destination?",
        a: "You can order a digital Story House Gift Certificate on WhatsApp so they can curate their own photos and scent pairing."
      },
    ]
  },
  {
    category: "Trust & craftsmanship",
    items: [
      {
        q: "Can I trust you?",
        a: "Over 2,000+ heirloom albums delivered with a 4.8/5 satisfaction rating across the Gulf region. We guarantee reprint perfection."
      },
      {
        q: "Where are the albums made?",
        a: "Every book is printed and hand-bound in specialized fine-art printing ateliers in the UAE, and our perfumes are macerated with essences from Grasse & Dubai."
      },
      {
        q: "How can I reach you?",
        a: "You can reach us 7 days a week on WhatsApp or via email at hello@thestoryhouse.ae. We respond promptly."
      },
    ]
  },
];

export default function FaqPage() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="bg-[#FAF6F0] text-[#2A2A2A] pt-32 pb-0 overflow-hidden">
      
      {/* HEADER: ANOTHER QUESTION? */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 pb-16 lg:pb-28">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1A1A]">
          Another question?
        </h1>
        <p className="text-xs sm:text-sm text-[#2A2A2A]/80 max-w-xl mx-auto leading-relaxed">
          Write to us on WhatsApp or{" "}
          <a href="mailto:hello@thestoryhouse.ae" className="underline font-semibold text-[#3D1117]">
            hello@thestoryhouse.ae
          </a>
          . We&apos;re available 7 days a week and reply within 15min 💛
        </p>

        <div className="pt-2">
          <a
            href={generateGeneralWhatsAppInquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#3D1117] text-[#FAF6F0] hover:bg-[#5C1A22] text-xs font-semibold shadow-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#C9A769]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </section>

      {/* CATEGORIZED FAQ GROUPS (Matching Screenshot 2) */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-24 lg:pb-28">
        {FAQ_SECTIONS.map((sec, secIdx) => (
          <div key={secIdx} className="space-y-3">
            <h2 className="font-sans font-bold text-lg sm:text-xl text-[#1A1A1A] pb-2 border-b border-[#E5DDD5]">
              {sec.category}
            </h2>

            <div className="space-y-3">
              {sec.items.map((item, itemIdx) => {
                const itemKey = `${secIdx}-${itemIdx}`;
                const isOpen = !!openItems[itemKey];

                return (
                  <div
                    key={itemIdx}
                    className="bg-[#FFFFFF] rounded-2xl overflow-hidden shadow-warm-sm transition-all"
                  >
                    <button
                      onClick={() => toggleItem(itemKey)}
                      className="w-full p-5 text-left font-sans text-xs sm:text-sm text-[#2A2A2A] hover:text-[#3D1117] flex items-center justify-between gap-4"
                    >
                      <span className="font-semibold text-sm sm:text-base text-[#3D1117]">{item.q}</span>
                      <span className="text-[#C9A769] shrink-0 font-bold text-lg">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-[#2A2A2A]/80 leading-relaxed font-normal animate-in fade-in duration-200">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}
