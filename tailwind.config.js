/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ucsd: {
          navy: '#182B49',
          gold: '#FFCD00',
          blue: '#00629B', // Connect Blue (Core)
          sky: '#00C6D7', // Innovation Blue (Accent)
          
          // Neutrals (from brand guide)
          black: '#000000',
          'cool-gray': '#747678', // Stone
          stone: '#B6B1A9',
          'light-gray': '#EAEAEA',
          white: '#FFFFFF',

          // Vibrant Accents
          'pacific-blue': '#006A96',
          'poppy-orange': '#FC8900',
          'tierra-clay': '#B56200',
          'palm-green': '#6E963B',
          'gold-accent': '#F3D54E',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'Source Sans Pro', 'sans-serif'],
      },
      backgroundImage: {
        'triton-pattern': "url('/triton-pattern.svg')", 
      }
    },
  },
  plugins: [],
}
