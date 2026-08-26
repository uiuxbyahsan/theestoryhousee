// ─────────────────────────────────────────────────────────────
// The Story House — product data (Section 5 of the build spec)
// Single source of truth for scents, bundles and cover templates.
// ─────────────────────────────────────────────────────────────

export type Theme =
  | "Travel"
  | "Wedding"
  | "Baby"
  | "Friendship"
  | "Memorial";

export const THEME_EMOJI: Record<Theme, string> = {
  Travel: "✈️",
  Wedding: "💍",
  Baby: "👶",
  Friendship: "🤝",
  Memorial: "🕊️",
};

// Each theme drives a cover-colour so <BookCover> and scent visuals stay
// consistent without needing per-item photography.
export const THEME_COLOR: Record<Theme, { cover: string; ink: string }> = {
  Travel: { cover: "#1F3A34", ink: "#E9E2CF" }, // deep teal-green
  Wedding: { cover: "#2A2A2A", ink: "#D9C9A3" }, // near-black + tan
  Baby: { cover: "#EBE3D6", ink: "#6B5A3A" }, // warm cream
  Friendship: { cover: "#6B5A3A", ink: "#F0E9D8" }, // tan-brown
  Memorial: { cover: "#20242B", ink: "#C7CBD1" }, // muted slate (kept quiet)
};

// ── Scents ────────────────────────────────────────────────────
// NOTE: top/mid/base notes are draft placeholders — confirm with the
// perfumer before launch (Open Item, Section 10). Never surface the
// internal "inspired by" reference anywhere public.
export interface Scent {
  id: string;
  name: string;
  theme: Theme;
  tagline: string;
  notes: { top: string; mid: string; base: string };
}

export const SCENTS: Scent[] = [
  {
    id: "souvenir",
    name: "Souvenir",
    theme: "Travel",
    tagline: "Sun-warmed streets and the ache of leaving.",
    notes: { top: "Bergamot, Sea Salt", mid: "Fig Leaf, Neroli", base: "Cedar, Amber" },
  },
  {
    id: "sunlit-memories",
    name: "Sunlit Memories",
    theme: "Travel",
    tagline: "Golden afternoons you never wanted to end.",
    notes: { top: "Mandarin, Bergamot", mid: "Orange Blossom, Jasmine", base: "White Musk, Sandalwood" },
  },
  {
    id: "her-story",
    name: "Her Story",
    theme: "Wedding",
    tagline: "Soft petals and the promise of forever.",
    notes: { top: "Pink Pepper, Pear", mid: "Rose, Peony", base: "Vanilla, Musk" },
  },
  {
    id: "velvet-nights",
    name: "Velvet Nights",
    theme: "Wedding",
    tagline: "Candlelight, slow dances, midnight vows.",
    notes: { top: "Saffron, Plum", mid: "Rose, Oud", base: "Amber, Vanilla" },
  },
  {
    id: "secret-garden",
    name: "Secret Garden",
    theme: "Baby",
    tagline: "Clean cotton and the hush of first mornings.",
    notes: { top: "White Tea, Pear", mid: "Lily, Freesia", base: "Cashmere Musk, Powder" },
  },
  {
    id: "his-story",
    name: "His Story",
    theme: "Friendship",
    tagline: "Late nights, loyalty, the ones you choose.",
    notes: { top: "Grapefruit, Cardamom", mid: "Lavender, Vetiver", base: "Leather, Tonka" },
  },
  {
    id: "royal-memories",
    name: "Royal Memories",
    theme: "Memorial",
    tagline: "A quiet warmth held close, always.",
    notes: { top: "Incense, Bergamot", mid: "Iris, Violet", base: "Sandalwood, Amber" },
  },
];

export const scentById = (id: string) => SCENTS.find((s) => s.id === id);
export const scentsByTheme = (theme: Theme) =>
  SCENTS.filter((s) => s.theme === theme);

// ── Bundles (Section 5) ───────────────────────────────────────
export interface Bundle {
  id: string;
  name: string;
  price: number; // AED
  includesScent: number; // number of 75ml perfumes included
  books: number;
  blurb: string;
  hero?: boolean;
}

export const BUNDLES: Bundle[] = [
  {
    id: "the-story",
    name: "The Story",
    price: 429,
    includesScent: 0,
    books: 1,
    blurb: "A hand-designed 20-page photobook of your own. Minimum 45 HD photos required.",
  },
  {
    id: "the-story-scent",
    name: "The Story + Scent",
    price: 599,
    includesScent: 1,
    books: 1,
    blurb: "The 20-page book paired with one 75ml signature scent, chosen for your story. Minimum 45 HD photos required.",
    hero: true,
  },
  {
    id: "the-story-duo",
    name: "The Story Duo",
    price: 699,
    includesScent: 2,
    books: 1,
    blurb: "The 20-page book with two 75ml scents, one to keep and one to gift. Minimum 45 HD photos required.",
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
// ⚠️ Placeholder retail rate — confirm with supplier before launch (Section 10)
export const EXTRA_PAGE_PRICE = 18;
export const MIN_PHOTOS = 45;

// ── Cover templates (Section 7B) ──────────────────────────────
export interface Template {
  id: string;
  name: string;
  theme: Theme;
  pairedScent: string; // scent id
}

export const TEMPLATES: Template[] = [
  // ✈️ Travel
  { id: "travel-01", name: "Where We Wandered", theme: "Travel", pairedScent: "souvenir" },
  { id: "travel-02", name: "The Journey Kept", theme: "Travel", pairedScent: "souvenir" },
  { id: "travel-03", name: "Passport of Us", theme: "Travel", pairedScent: "sunlit-memories" },
  { id: "travel-04", name: "Postcards Home", theme: "Travel", pairedScent: "sunlit-memories" },
  // 💍 Wedding
  { id: "wedding-01", name: "The Vow We Kept", theme: "Wedding", pairedScent: "her-story" },
  { id: "wedding-02", name: "Two Became One", theme: "Wedding", pairedScent: "velvet-nights" },
  { id: "wedding-03", name: "Our Forever Chapter", theme: "Wedding", pairedScent: "her-story" },
  // 👶 Baby
  { id: "baby-01", name: "Little Story", theme: "Baby", pairedScent: "secret-garden" },
  { id: "baby-02", name: "First Light", theme: "Baby", pairedScent: "secret-garden" },
  { id: "baby-03", name: "Tiny Chapters", theme: "Baby", pairedScent: "secret-garden" },
  // 🤝 Friendship
  { id: "friend-01", name: "Chosen Family", theme: "Friendship", pairedScent: "his-story" },
  { id: "friend-02", name: "Ordinary Magic", theme: "Friendship", pairedScent: "his-story" },
  { id: "friend-03", name: "The Unwritten Rules", theme: "Friendship", pairedScent: "his-story" },
  // 🕊️ Memorial (kept to 2–3, gentle treatment)
  { id: "memorial-01", name: "Held in Memory", theme: "Memorial", pairedScent: "royal-memories" },
  { id: "memorial-02", name: "A Life Well Told", theme: "Memorial", pairedScent: "royal-memories" },
];

export const templateById = (id: string) => TEMPLATES.find((t) => t.id === id);
export const templatesByTheme = (theme: Theme) =>
  TEMPLATES.filter((t) => t.theme === theme);

export const THEMES: Theme[] = [
  "Travel",
  "Wedding",
  "Baby",
  "Friendship",
  "Memorial",
];

// Story-type entry points for the home page "Shop by story" grid
export const STORY_TYPES: { theme: Theme; title: string; copy: string }[] = [
  { theme: "Travel", title: "Travel", copy: "The trips that changed you." },
  { theme: "Wedding", title: "Wedding", copy: "The day you said forever." },
  { theme: "Baby", title: "Baby", copy: "The very first chapter." },
  { theme: "Friendship", title: "Friendship", copy: "The family you chose." },
  { theme: "Memorial", title: "Memorial", copy: "A life, kept close." },
];
