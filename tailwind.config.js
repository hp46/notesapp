/** @type {import('tailwindcss').Config} */
export default {
  content:["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      spacing: {
        '7%': '7%',
        '20%': '8%',
        '30%': '30%',
        'rabat_top': '34%',
        'rabat_left': '52%',
        '80%': '80%',
        'alhaouz_top': '83%',
        'alhaouz_left': '37%',
      }
    },
  },
  plugins: [],
}

