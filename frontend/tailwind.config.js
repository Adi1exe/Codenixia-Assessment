/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-black': '#0a0a0a',
        'app-accent': '#10b981',
        'app-card': '#171717',
        'app-border': '#262626'
      }
    },
  },
  plugins: [],
}