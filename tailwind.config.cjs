/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dandelion: "#f7da21",
      },
      fontFamily: {
        slab: `"Hepta Slab", serif`,
        zillaSlab: `"Zilla Slab", serif`,
        display: `"Grenze Gotisch", cursive`,
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
