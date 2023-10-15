/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FC8019",
      },
      keyframes: {
        'swing': {
          '0%,100%' : { transform: 'rotate(15deg)' },
          '50%' : { transform: 'rotate(-15deg)' },
        }
      },
      animation: {
        'swing': 'swing 1s infinite'
      },
    },
  },
  plugins: [],
};
