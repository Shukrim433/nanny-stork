/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fem: {
          Pri: "#E76262",
          Sec: "#F59191",
          Ter: "#FFCACA",
          Qua: "#ECCCCF",
        },

        boy: {
          boyPri: "#2062A4",
          boySec: "#B7E6FF", 
          boyTer: "#93B9DE",
          boyQua: "#8BADD3",
        },
      }
    },
  },
  plugins: [],
});
