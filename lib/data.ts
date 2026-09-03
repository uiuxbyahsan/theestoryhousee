// ─────────────────────────────────────────────────────────────
// The Story House — product data.
// Single source of truth for scents, bundles and cover templates.
// ─────────────────────────────────────────────────────────────

export type Category = "Male" | "Female" | "Unisex";

export const CATEGORIES: Category[] = ["Male", "Female", "Unisex"];

// Each category drives a cover-colour so <BookCover> stays consistent
// without needing per-item cover photography.
export const CATEGORY_COLOR: Record<Category, { cover: string; ink: string }> = {
  Male: { cover: "#1E2229", ink: "#D9C9A3" }, // deep slate + tan foil
  Female: { cover: "#7A4E4E", ink: "#F3E7DF" }, // deep rose-brown + cream
  Unisex: { cover: "#2E3A34", ink: "#E9E2CF" }, // deep green-grey + cream
};

// ── Scents ────────────────────────────────────────────────────
export interface Scent {
  id: string;
  name: string;
  category: Category;
  ml: string;
  price: number; // AED, retail/cost
  image: string; // real product photography
  tagline: string;
  notes: { top: string; mid: string; base: string };
}

export const SCENTS: Scent[] = [
  {
    id: "velvet-nights",
    name: "Velvet Nights",
    category: "Female",
    ml: "80ml",
    price: 70,
    image: "/images/product-velvet-nights.jpg",
    tagline: "Candlelight, slow dances, midnight vows.",
    notes: { top: "Saffron, Plum", mid: "Rose, Oud", base: "Amber, Vanilla" },
  },
  {
    id: "his-story",
    name: "His Story",
    category: "Male",
    ml: "80ml",
    price: 70,
    image: "/images/product-his-story.jpg",
    tagline: "Late nights, loyalty, the ones you choose.",
    notes: { top: "Grapefruit, Cardamom", mid: "Lavender, Vetiver", base: "Leather, Tonka" },
  },
  {
    id: "her-story",
    name: "Her Story",
    category: "Female",
    ml: "80ml",
    price: 70,
    image: "/images/product-her-story.jpg",
    tagline: "Soft petals and the promise of forever.",
    notes: { top: "Pink Pepper, Pear", mid: "Rose, Peony", base: "Vanilla, Musk" },
  },
  {
    id: "sunlit-memories",
    name: "Sunlit Memories",
    category: "Unisex",
    ml: "80ml",
    price: 70,
    image: "/images/product-sunlit-memories.jpg",
    tagline: "Golden afternoons you never wanted to end.",
    notes: { top: "Mandarin, Bergamot", mid: "Orange Blossom, Jasmine", base: "White Musk, Sandalwood" },
  },
  {
    id: "royal-memories",
    name: "Royal Memories",
    category: "Male",
    ml: "80ml",
    price: 70,
    image: "/images/product-royal-memories.jpg",
    tagline: "A quiet warmth held close, always.",
    notes: { top: "Incense, Bergamot", mid: "Iris, Violet", base: "Sandalwood, Amber" },
  },
  {
    id: "souvenir",
    name: "Souvenir",
    category: "Female",
    ml: "80ml",
    price: 70,
    image: "/images/product-souvenir.jpg",
    tagline: "Sun-warmed streets and the ache of leaving.",
    notes: { top: "Bergamot, Sea Salt", mid: "Fig Leaf, Neroli", base: "Cedar, Amber" },
  },
  {
    id: "secret-garden",
    name: "Secret Garden",
    category: "Unisex",
    ml: "80ml",
    price: 70,
    image: "/images/product-secret-garden.jpg",
    tagline: "Clean cotton and the hush of first mornings.",
    notes: { top: "White Tea, Pear", mid: "Lily, Freesia", base: "Cashmere Musk, Powder" },
  },
];

export const scentById = (id: string) => SCENTS.find((s) => s.id === id);
export const scentsByCategory = (category: Category) =>
  SCENTS.filter((s) => s.category === category);

// ── Bundles ───────────────────────────────────────────────────
// Cost basis (internal): book 180 AED + perfume 70 AED = 250 AED cost on
// The Story + Scent. Retail prices unchanged; the Duo's two-bottle cost
// is still provisional at the new baseline.
export interface Bundle {
  id: string;
  name: string;
  price: number; // AED, retail
  includesScent: number; // number of 80ml perfumes included
  books: number;
  blurb: string;
  hero?: boolean;
}

export const BUNDLES: Bundle[] = [
  {
    id: "the-story",
    name: "The Story",
    price: 180,
    includesScent: 0,
    books: 1,
    blurb: "A hand-designed 20-page photobook of your own. Minimum 45 HD photos required.",
  },
  {
    id: "the-story-scent",
    name: "The Story + Scent",
    price: 250,
    includesScent: 1,
    books: 1,
    blurb: "The 20-page book paired with one 80ml signature scent (+70 AED), chosen for your story. Minimum 45 HD photos required.",
    hero: true,
  },
  {
    id: "the-story-duo",
    name: "The Story Duo",
    price: 699,
    includesScent: 2,
    books: 1,
    blurb: "The 20-page book with two 80ml scents, one to keep and one to gift. Minimum 45 HD photos required.",
  },
  {
    id: "family-pack",
    name: "Family Pack",
    price: 1299,
    includesScent: 0,
    books: 4,
    blurb: "Four 20-page books for one shared occasion, for the whole family to hold. Minimum 45 HD photos required per book.",
  },
];

export const bundleById = (id: string) => BUNDLES.find((b) => b.id === id);

export const BASE_PAGES = 20;
export const EXTRA_PAGE_PRICE = 18;
export const MIN_PHOTOS = 45;

// ── Cover templates ───────────────────────────────────────────
// Existing cover designs redistributed across the three categories.
export interface Template {
  id: string;
  name: string;
  category: Category;
  pairedScent: string; // scent id (same category)
}

export const TEMPLATES: Template[] = [
  // Male
  { id: "male-01", name: "Chosen Family", category: "Male", pairedScent: "his-story" },
  { id: "male-02", name: "Ordinary Magic", category: "Male", pairedScent: "royal-memories" },
  { id: "male-03", name: "The Unwritten Rules", category: "Male", pairedScent: "his-story" },
  { id: "male-04", name: "Held in Memory", category: "Male", pairedScent: "royal-memories" },
  { id: "male-05", name: "A Life Well Told", category: "Male", pairedScent: "his-story" },
  // Female
  { id: "female-01", name: "The Vow We Kept", category: "Female", pairedScent: "her-story" },
  { id: "female-02", name: "Two Became One", category: "Female", pairedScent: "velvet-nights" },
  { id: "female-03", name: "Our Forever Chapter", category: "Female", pairedScent: "her-story" },
  { id: "female-04", name: "First Light", category: "Female", pairedScent: "velvet-nights" },
  { id: "female-05", name: "Golden Hours", category: "Female", pairedScent: "souvenir" },
  // Unisex
  { id: "unisex-01", name: "Where We Wandered", category: "Unisex", pairedScent: "sunlit-memories" },
  { id: "unisex-02", name: "The Journey Kept", category: "Unisex", pairedScent: "sunlit-memories" },
  { id: "unisex-03", name: "Passport of Us", category: "Unisex", pairedScent: "secret-garden" },
  { id: "unisex-04", name: "Postcards Home", category: "Unisex", pairedScent: "secret-garden" },
  { id: "unisex-05", name: "Little Story", category: "Unisex", pairedScent: "secret-garden" },
  { id: "unisex-06", name: "Tiny Chapters", category: "Unisex", pairedScent: "sunlit-memories" },
];

export const templateById = (id: string) => TEMPLATES.find((t) => t.id === id);
export const templatesByCategory = (category: Category) =>
  TEMPLATES.filter((t) => t.category === category);

// Category entry points for the home / shop "Shop by Category" grids.
// Each tile shows a representative scent bottle.
export const CATEGORY_TILES: {
  category: Category;
  title: string;
  copy: string;
  scentId: string;
}[] = [
  { category: "Male", title: "Male", copy: "Bold, grounded, made to last.", scentId: "his-story" },
  { category: "Female", title: "Female", copy: "Soft, warm, unmistakably yours.", scentId: "her-story" },
  { category: "Unisex", title: "Unisex", copy: "For every story, whoever tells it.", scentId: "sunlit-memories" },
];
