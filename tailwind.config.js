/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black : '#000000',
        white : '#ffffff',
        lgray : '#a4a4a4',
        dgray : '#666666',
        purple: '#9448bc',
        red : '#ef2d56'
      }
    },
  },
  plugins: [],
}

