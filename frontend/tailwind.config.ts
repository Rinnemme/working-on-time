import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "wot-rose": "#820263",
        "wot-light-rose": "#b32390",
        "wot-green": "#0b6e4f",
        "wot-light-green": "#1da67b",
        "wot-blue": "#3066be",
        "wot-light-blue": "#5797ff",
        "wot-yellow": "#fa9f42",
        "wot-light-yellow": "#ffba73",
        "wot-gray": "#a8a8a8",
        "wot-light-gray": "#d4d4d4",
        "wot-lighter-gray": "#efefef",
        "wot-off-white": "#fbfbfb",
        "wot-black": "#212121",
      },
    },
  },
  plugins: [],
} satisfies Config;
