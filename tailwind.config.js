// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'xl': '1200px',  // Custom desktop mode at 1200px and above
        'lg': {'max': '1999px'}, // Custom mobile mode from 1999px and below
      },
      fontFamily: {
        gotham: ['Gotham Book', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    // other plugins...
  ],
}
