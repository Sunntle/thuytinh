/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#FC8019",
        secondaryColor: "#fc8e32",
        borderSecondaryColor: "#fd9c4b",
      },
    },
    screens: {
      'xs': '320px',
      'sm': '640px',
    },
  },
  corePlugins: {
    preflight: false // <== disable this!
  },
};
