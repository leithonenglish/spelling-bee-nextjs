/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        slab: `"Hepta Slab", serif`,
      },
      transitionProperty: {
        "color-transform": "background, color, border-color, fill, transform",
      },
    },
  },
  plugins: [],
};
