const { withTouristicUI } = require('@turistikrota/ui/config')

module.exports = withTouristicUI({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        102: '26rem',
        104: '28rem',
        106: '30rem',
      },
    },
  },
})
