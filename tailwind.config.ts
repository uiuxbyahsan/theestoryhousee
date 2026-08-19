import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dmariz Brand Palette exact tokens
        page: "#FAF6F0",
        primary: {
          dark: "#3D1117",
          darkAlt: "#5C1A22",
        },
        gold: {
          DEFAULT: "#C9A769",
          light: "#E8C896",
        },
        text: {
          dark: "#2A2A2A",
          cream: "#FAF6F0",
          gold: "#C9A769",
        },
        divider: "#E5DDD5",
        card: "#FFFFFF",
        badge: "#F0E8DC",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(61, 17, 23, 0.06)',
        'warm-md': '0 12px 24px -6px rgba(61, 17, 23, 0.08), 0 4px 10px -2px rgba(61, 17, 23, 0.04)',
        'warm-lg': '0 20px 40px -10px rgba(61, 17, 23, 0.12), 0 8px 16px -4px rgba(61, 17, 23, 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
