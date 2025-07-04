/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#FF6347",
        secondary: "#F5A623",
        dark: {
          primary: "#D17A66",
          secondary: "#EC4899",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
