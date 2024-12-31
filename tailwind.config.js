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
        '20%': '20%',
        '30%': '30%',
        //Rabat top
        '34%': '34%',
        //Rabat left
        '52%': '52%',
        '80%': '80%',
        //Alhaouz top
        '83%': '83%',
        //Alhaouz left
        '37%': '37%',
      }
    },
  },
  plugins: [],
}

