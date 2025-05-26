/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 定义暗色模式下的颜色
      colors: {
        dark: '#1a1a1a',
        darkGray: '#2d2d2d',
        lightGray: '#e0e0e0',
        secondary: '#a0a0a0',
        primary: '#4f46e5',
      },
    },
  },
  darkMode: 'class', // 启用基于类的暗色模式
  plugins: [],
};

