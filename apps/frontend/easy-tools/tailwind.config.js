/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2',
        secondary: '#F5A623',
        dark: {
          primary: '#6366F1',
          secondary: '#EC4899'
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    }
  },
  plugins: [],
}

