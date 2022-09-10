/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./resources/views/**/*.edge'],
  theme: {
    colors: {
      'transparent': 'transparent',
      'white': '#FFF',
      'gray': {
        450: '#E8E8E8',
        900: '#2C2C2C'
      },
      'red': '#FF5757'
    },
    fontFamily: {
      'sans': ['Space Grotesk', 'sans-serif']
    },
    fontSize: {
      'sm': '0.75rem',
      'base': '16px',
      'lg': '1.333rem',
      'xl': '1.777rem',
      '2xl': '2.369rem',
      '3xl': '3.157rem',
      '4xl': '4.209rem',
      '5xl': '5.61rem',
      '6xl': '7.478rem'
    }
  },
  plugins: []
}
