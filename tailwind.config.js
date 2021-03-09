module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      maxHeight: {
        '50h': '50vh',
        '40h': '40vh'
      },
      height: {
        "10p": "10%",
        "48w": "48vw",
        "70vh": "70vh",
        "80vh": "80vh"
      },
      width: {
        "85w": "85vw",
        '30w': '30vw'
      },
      boxShadow: {
        custom: 'inset 1px 0px #ffffff, inset 0px 1px #ffffff, inset -1px 0px #ffffff, 0px 2px rgba(31, 41, 55, 1)',
      },
      backgroundColor: {
        'light': '#243040',
        'lighter': '#293647',
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
