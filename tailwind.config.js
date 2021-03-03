module.exports = {
  purge: ['./src/**/*.{js}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        '50h': '50vh',
      },
      height: {
        "48w": "48vw",
      },
      width: {
        "85w": "85vw",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
