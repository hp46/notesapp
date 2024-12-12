/** @type {import('tailwindcss').Config} */
export default {
  content:["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      spacing: {
        '40%': '34%',
        '50%': '49%',
        '80%': '80%',
      }
    },
  },
  plugins: [],
}

