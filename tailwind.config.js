module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      maxHeight: {
        '50h': '50vh'
      },
      height: {
        "48w": "48vw"
      },
      width: {
        "85w": "85vw"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
