/** @type {import('tailwindcss').Config} */
export default {
  content:["./src/**/*.{html,js,jsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '2':'200px minmax(900px, 1fr) 100px',
      },
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
        '38%': '38%',
        //Rabat left
        '52%': '52%',
        //Casablanca
        '45%': '45%',
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

