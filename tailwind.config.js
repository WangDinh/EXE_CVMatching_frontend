/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textShadow: {
        default: '0 4px 15px rgba(0, 0, 0, 1)'
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(-120deg, rgb(245, 129, 50) 0%, rgb(148, 75, 26) 100%)',
        'hero-pattern': "url('/FSAmembers.png')",
        gradient: 'linear-gradient(184.78deg, #fa709a 7.64%, #fee140 120.07%)'
      }
    }
  },
  plugins: []
}
