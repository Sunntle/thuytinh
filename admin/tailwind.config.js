/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        main: "#FC8019",
        secondaryColor: "#fc8e32",
        borderSecondaryColor: "#fd9c4b",
        darkModeBg: "#001529",
        darkModeBgBox: "#794c2f6b"
      },
    },
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px"
    },
  },
  corePlugins: {
    preflight: false,
  },
};
