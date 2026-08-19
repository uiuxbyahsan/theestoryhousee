export interface OlfactiveNotes {
  top: string[];
  mid: string[];
  base: string[];
}

export interface StoryTheme {
  id: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  coverTitle: string;
  coverSubtitle: string;
  accentColor: string;
  image: string;
  scent: {
    name: string;
    bottleSize: string;
    tagline: string;
    description: string;
    image: string;
    notes: OlfactiveNotes;
    intensity: string;
    mood: string;
    olfactiveFamily: string;
  };
}

export interface BundleOption {
  id: string;
  name: string;
  badge?: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  includes: string[];
  bookCount: number;
  perfumeCount: number;
  isPopular?: boolean;
}

export const BUNDLES: BundleOption[] = [
  {
    id: "story-only",
    name: "The Story",
    subtitle: "Custom Heirloom Book Only",
    price: 429,
    bookCount: 1,
    perfumeCount: 0,
    includes: [
      "1× Handcrafted 20-Page Hardcover Book",
      "Archival 250gsm Fine Art Textured Paper",
      "Min. 40 High-Definition Photos",
      "Gold Foil Embossed Spine & Cover",
      "Luxury Linen Keepsake Box"
    ]
  },
  {
    id: "story-and-scent",
    name: "The Story + Scent",
    badge: "The Signature Pairing",
    subtitle: "Book + 1× 75ml Bespoke Perfume",
    price: 599,
    originalPrice: 684,
    bookCount: 1,
    perfumeCount: 1,
    isPopular: true,
    includes: [
      "1× Handcrafted 20-Page Hardcover Book",
      "1× 75ml Eau de Parfum (Artisanal UAE Flacon)",
      "Theme-Paired Signature Scent Formula",
      "Archival 250gsm Fine Art Textured Paper",
      "Gold Atomizer & Brushed Cap",
      "Luxury Linen Presentation Gift Box"
    ]
  },
  {
    id: "story-duo",
    name: "The Story Duo",
    badge: "For Gifting & Keeps",
    subtitle: "Book + 2× 75ml Perfumes",
    price: 699,
    originalPrice: 858,
    bookCount: 1,
    perfumeCount: 2,
    includes: [
      "1× Handcrafted 20-Page Hardcover Book",
      "2× 75ml Eau de Parfum (Keep one, gift one)",
      "Theme-Paired Signature Scent Formula",
      "Archival 250gsm Fine Art Textured Paper",
      "Gold Atomizer & Brushed Cap",
      "Luxury Double-Tier Linen Presentation Box"
    ]
  },
  {
    id: "family-pack",
    name: "Family Pack",
    badge: "Multi-Heirloom Set",
    subtitle: "4× Handcrafted Books for Family",
    price: 1299,
    originalPrice: 1716,
    bookCount: 4,
    perfumeCount: 2,
    includes: [
      "4× Identical Handcrafted Hardcover Books",
      "2× 75ml Eau de Parfum Flacons",
      "Dedicated Custom Flap Inscription per book",
      "Archival 250gsm Fine Art Textured Paper",
      "4× Individual Luxury Linen Keepsake Boxes",
      "Complimentary White-Glove GCC Delivery"
    ]
  }
];

export const STORY_THEMES: StoryTheme[] = [
  {
    id: "voyage",
    name: "Travel & Odyssey",
    category: "Travel",
    headline: "Salt air, warm terracotta & sunsets that lingered",
    description: "Every journey has an atmosphere you can never quite photograph. Paired with a warm Mediterranean sea-spray and sun-ripened fig scent that instantly returns you to the coast.",
    coverTitle: "VOYAGE",
    coverSubtitle: "ALONG THE MEDITERRANEAN COAST",
    accentColor: "#C68B59",
    image: "/images/theme-voyage.jpg",
    scent: {
      name: "Sirocco & Salted Fig",
      bottleSize: "75ml Eau de Parfum",
      tagline: "The golden warmth of coastal wind and sea-drifted cedar",
      description: "Sun-drenched wild fig leaves, saline sea mist, and ancient driftwood. Formulated in Grasse and macerated in Dubai to hold the memory of foreign horizons.",
      image: "/images/scent-salted-fig.jpg",
      olfactiveFamily: "Warm Woody Aquatic",
      intensity: "Moderate & Lingering",
      mood: "Expansive, Sun-kissed, Free",
      notes: {
        top: ["Calabrian Bergamot", "Sea Salt Mist", "Crushed Mint"],
        mid: ["Sun-ripened Mediterranean Fig", "White Neroli", "Driftwood"],
        base: ["Ambergris", "Atlas Cedar", "Warm Sunlit Musc"]
      }
    }
  },
  {
    id: "vow",
    name: "Wedding & Union",
    category: "Wedding",
    headline: "The sacred whisper, trembling hands & everlasting vows",
    description: "Your wedding day was a symphony of touch, light, and flowers. Paired with an opulent yet ethereal blend of white velvet petals and gentle, golden Arabian oud.",
    coverTitle: "THE VOW",
    coverSubtitle: "AURELIA & JULIAN • FOREVER",
    accentColor: "#D4AF37",
    image: "/images/theme-vow.jpg",
    scent: {
      name: "Silk Veil & White Oud",
      bottleSize: "75ml Eau de Parfum",
      tagline: "White camellia petals draped in whisper-soft golden oud",
      description: "An intimate, unforgettable bridal bouquet warmed by crushed cardamom pods, sheer velvet musks, and a delicate ribbon of royal white oud.",
      image: "/images/scent-white-oud.jpg",
      olfactiveFamily: "Floral Oriental",
      intensity: "Intimate & Long-Lasting",
      mood: "Sacred, Romantic, Eternal",
      notes: {
        top: ["White Camellia", "Green Cardamom", "Pear Blossom"],
        mid: ["Velvet Jasmine", "Orris Concrete", "May Rose"],
        base: ["Royal White Oud", "Cashmere Wood", "Golden Amber"]
      }
    }
  },
  {
    id: "baby",
    name: "Newborn & First Breath",
    category: "Baby",
    headline: "Tiny fingers, soft yawns & the purest quiet love",
    description: "The fleeting, miraculous wonder of their first days. Paired with a tender, nostalgic cocoon of warm almond milk, powdery iris, and freshly washed linen.",
    coverTitle: "FIRST BREATH",
    coverSubtitle: "WELCOME TO THE WORLD, NOAH",
    accentColor: "#C9BAA2",
    image: "/images/theme-baby.jpg",
    scent: {
      name: "Linen Cloud & Warm Almond",
      bottleSize: "75ml Eau de Parfum",
      tagline: "Soft morning light, tender almond milk & fresh cotton linen",
      description: "Gentle as a lullaby. Formulated to evoke the incomparable, delicate scent of a newborn's crown and warm nursery mornings.",
      image: "/images/scent-warm-almond.jpg",
      olfactiveFamily: "Musky Powdery Gourmand",
      intensity: "Soft & Comforting",
      mood: "Pure, Gentle, Tender",
      notes: {
        top: ["Sweet Almond Milk", "Morning Dew", "Rice Steam"],
        mid: ["Powdered Tuscan Iris", "White Heliotrope", "Cotton Blossom"],
        base: ["Soft Sandalwood", "Vanilla Tonka", "Baby Cashmere Musk"]
      }
    }
  },
  {
    id: "kinship",
    name: "Friendship & Togetherness",
    category: "Friendship",
    headline: "Uncontrollable laughter, late night conversations & lifelong bonds",
    description: "The friends who became your chosen family. Paired with an effervescent, sparkling burst of sunlit citrus, crushed tea leaves, and warm cedarwood.",
    coverTitle: "KINSHIP",
    coverSubtitle: "TEN YEARS OF US • 2014-2024",
    accentColor: "#B87333",
    image: "/images/theme-kinship.jpg",
    scent: {
      name: "Golden Hour & Wild Citrus",
      bottleSize: "75ml Eau de Parfum",
      tagline: "Sparkling orchard zest, green tea & sunset cedar",
      description: "Radiant and celebratory. Captures the euphoria of long rooftop dinners, shared secrets, and uncontainable laughter under golden skies.",
      image: "/images/scent-wild-citrus.jpg",
      olfactiveFamily: "Aromatic Citrus Wood",
      intensity: "Bright & Uplifting",
      mood: "Joyful, Warm, Nostalgic",
      notes: {
        top: ["Blood Orange", "Mandarin Rind", "Sparkling Prosecco Accord"],
        mid: ["Imperial Jasmine Tea", "Wild Thyme", "Fig Bark"],
        base: ["Sun-warmed Cedar", "Golden Amber", "Vetiver Root"]
      }
    }
  },
  {
    id: "reverie",
    name: "Memorial & Sacred Tribute",
    category: "Memorial",
    headline: "A life deeply cherished, timeless love & everlasting presence",
    description: "For honoring those whose love shaped our lives forever. Paired with solemn, comforting frankincense, aged parchment, and soft dried rose petals.",
    coverTitle: "REVERIE",
    coverSubtitle: "IN LOVING MEMORY • 1948 - 2023",
    accentColor: "#6A1E2D",
    image: "/images/theme-reverie.jpg",
    scent: {
      name: "Parchment & Frankincense",
      bottleSize: "75ml Eau de Parfum",
      tagline: "Sacred Dhofari frankincense, dried rosewater & antique paper",
      description: "A reverent, deeply peaceful scent that brings profound stillness. Created with genuine Omani Royal Hojari Frankincense and vintage cedarwood.",
      image: "/images/scent-frankincense.jpg",
      olfactiveFamily: "Resinous Wood & Amber",
      intensity: "Profound & Meditative",
      mood: "Peaceful, Sacred, Eternal",
      notes: {
        top: ["Taif Rosewater", "Ancient Myrrh", "Pink Peppercorn"],
        mid: ["Royal Green Hojari Frankincense", "Papyrus", "Cistus Labdanum"],
        base: ["Aged Sandalwood", "Benzoin Tears", "Smoked Vetiver"]
      }
    }
  }
];

export const BASE_PAGES = 20;
export const MIN_PHOTOS_REQUIRED = 40;
export const EXTRA_PAGE_PRICE_AED = 18;
export const WHATSAPP_NUMBER = "923023315227";

export const FAQS = [
  {
    question: "How does the sensory pairing work? Do I spray the book?",
    answer: "Every Story House edition is curated with a dedicated 75ml Eau de Parfum flacon. You can spray the scent into your room or lightly mist the silk ribbon and inner keepsake box before opening the book. The fragrance triggers the brain's olfactory memory center (the limbic system), immediately transporting you back into the exact emotion and atmosphere of that life chapter."
  },
  {
    question: "Does the perfume scent fade over time?",
    answer: "Our Eau de Parfums are formulated at a rich 20% to 25% fragrance oil concentration using premium essences sourced from Grasse and traditional Gulf perfumeries. A single 75ml flacon contains over 800 sprays, lasting for years of memory-revisiting rituals."
  },
  {
    question: "Can I choose a different scent than the default pairing?",
    answer: "Yes! While each theme comes pre-matched to an expertly composed olfactive profile (e.g., Travel is paired with Sirocco & Salted Fig), you can easily swap between any of our signature scents inside the custom builder or request a swap on WhatsApp."
  },
  {
    question: "What if I don't have 40 photos yet?",
    answer: "40 high-definition photos is our curated baseline to ensure your 20-page heirloom book feels rich, cinematic, and complete without sparse layouts. You can source photos directly from your phone camera roll, WhatsApp chats, Google Photos, or Instagram archive. If you need assistance selecting photos, our WhatsApp concierge is always available to assist."
  },
  {
    question: "How long does printing and delivery take in UAE & GCC?",
    answer: "Production takes 3 to 4 business days of precision artisan printing, binding, and gold-foil debossing. Delivery across Dubai and the UAE takes 24 to 48 hours. Shipments to Saudi Arabia, Qatar, Bahrain, Kuwait, and Oman take 3 to 5 business days via temperature-controlled courier."
  },
  {
    question: "Can I preview my book before it goes to print?",
    answer: "Absolutely. Once you submit your order via WhatsApp, our editorial layout team will share a digital page-by-page flip proof with you on WhatsApp for your final approval before we press print."
  },
  {
    question: "What is your print quality guarantee?",
    answer: "We use 250gsm museum-grade archival matte paper with lay-flat hand-binding. If there is any flaw in print clarity, color fidelity, or binding integrity, we reprint and redeliver your book 100% on us."
  }
];

export const REVIEWS = [
  {
    name: "Fatima Al-Mansoor",
    location: "Dubai, UAE",
    theme: "Wedding & Union",
    rating: 5,
    title: "I broke into tears the moment I opened the box",
    quote: "When my husband and I opened the linen box and smelled Silk Veil & White Oud, our entire wedding morning rushed back. The weight of the pages and the gold foil feels like an heirloom our grandchildren will hold.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    image: "/images/ugc-unboxing-box.jpg"
  },
  {
    name: "Tariq & Maya K.",
    location: "Abu Dhabi, UAE",
    theme: "Travel & Odyssey",
    rating: 5,
    title: "Far beyond any normal photobook app",
    quote: "We documented our two weeks in Amalfi and Sicily. The Sirocco & Salted Fig perfume smells exactly like sea cliffs and fig trees in the heat. It is a genuine ritual now whenever we have friends over.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    image: "/images/ugc-dubai-couple.jpg"
  },
  {
    name: "Zainab Rashid",
    location: "Riyadh, KSA",
    theme: "Newborn & First Breath",
    rating: 5,
    title: "The scent of newborn warmth preserved forever",
    quote: "Babies grow up in the blink of an eye. Having Noah's birth book paired with Linen Cloud & Warm Almond is the most precious gift anyone has ever given me. Ordering directly on WhatsApp was effortless.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    image: "/images/theme-baby.jpg"
  }
];
