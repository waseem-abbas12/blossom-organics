/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1a1a1a',
          gold: '#c59b27',
          'gold-light': '#fdf6e7',
          terracotta: '#7b3e1d',
          rose: '#d9777f',
          cream: '#fbf9f5',
          border: '#e5e5e5',
          muted: '#6b7280',
          sale: '#d94826'
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif']
      }
    },
  },
  plugins: [],
}
