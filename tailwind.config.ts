import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // MATCH-inspired black / white / tan palette (Section 4.2)
        bg: "#FFFFFF",
        "bg-alt": "#FBFBFA",
        black: "#111111",
        "black-alt": "#2A2A2A",
        tan: "#D9C9A3",
        "tan-text": "#6B5A3A",
        "text-dark": "#111111",
        "text-white": "#FFFFFF",
        "text-muted": "#6B6B6B",
        divider: "#ECEBE8",
        // Warm gold used on the real bottle labels / logo foil
        gold: "#C6A15B",
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
