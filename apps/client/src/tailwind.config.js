/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // 这个很重要！
    theme: {
      extend: {},
    },
    plugins: [],
  }