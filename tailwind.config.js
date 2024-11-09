/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        myBg: '#15141A',
        myRound : '#313134',
        bgCol: '#21212B',
        greencol: '#D6EF9C'
      },
      borderRadius : {}
    },
  },
  plugins: [],
}

