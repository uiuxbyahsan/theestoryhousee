import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Single off-white background everywhere; Black / Gold accents
        bg: "#F8F6F2",
        "bg-alt": "#F8F6F2",
        black: "#0D0D0D",
        "black-alt": "#2A2A2A",
        // One off-white; no pure white, no separate card/gray fills
        white: "#F8F6F2",
        tan: "#E4CE8C", // badge background (gold-light)
        "tan-text": "#6B5A3A",
        "text-dark": "#0D0D0D",
        "text-white": "#F8F6F2", // text on dark surfaces
        "text-cream": "#F8F6F2",
        "text-muted": "#6B6B6B",
        divider: "#E3D7BE",
        "card-bg": "#F8F6F2", // components share the page background (border-defined)
        gold: "#C9A227",
        "gold-light": "#E4CE8C",
      },
      fontFamily: {
        // Helvetica does both headline base + all body/UI (Section 4.1)
        sans: [
          "var(--font-arimo)",
          "-apple-system",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        // Playfair Display italic — accent word only
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      borderRadius: {
        none: "0px",
        card: "0px",
        button: "0px",
        "button-pill": "0px",
        "icon-button": "0px",
        badge: "0px",
        sm: "0px",
        DEFAULT: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        "3xl": "0px",
        full: "0px",
      },
      maxWidth: {
        container: "1240px",
      },
      letterSpacing: {
        wider2: "0.12em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
