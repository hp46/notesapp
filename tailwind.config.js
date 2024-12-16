/** @type {import('tailwindcss').Config} */
export default {
  content:["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontSize: {
        title: '4vw',
      },
      spacing: {
        '7%': '7%',
        '20%': '8%',
        '30%': '30%',
        '40%': '34%',
        '50%': '49%',
        '80%': '80%',
      }
    },
  },
  plugins: [],
}

