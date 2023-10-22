/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: { max: "640px" },
      md: { min: "641px", max: "768px" },
      lg: { min: "769px", max: "1024px" },
      xl: { min: "1025px", max: "1280px" },
      "2xl": { min: "1281px", max: "1536px" },
      "3xl": { min: "1537px" },
    },
    extend: {},
  },
  plugins: [],
};
