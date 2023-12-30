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
        dandelion: "#f7da21",
      },
      fontFamily: {
        slab: ["var(--font-hepta)", "serif"],
        zillaSlab: ["var(--font-zilla)", "serif"],
        display: ["var(--font-grenze)", "serif"],
      },
      transitionProperty: {
        "color-transform": "background, color, border-color, fill, transform",
      },
      screens: {
        xs: { raw: "(min-height: 375px)" },
      },
    },
  },
  plugins: [],
};
export default config;
