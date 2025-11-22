
import { withAnimations } from 'tw-animate-css'

/** @type {import('tailwindcss').Config} */
const config = withAnimations({
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
})

export default config
