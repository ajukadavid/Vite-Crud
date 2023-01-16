const colors = require('tailwindcss/colors')
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors:{
      ...colors,
      'bodyColor': '#E5E5E5',
      'navColor': '#F0F0F0',
      'OutlineColor': '#ACADAF',
      'cancelColor': '#EFEFF0',
      'createEventColor': '#999A9B',
      'cardNameColor':  '#555658',
      'verifyColor': '#FFF0CB'
  
    }
  },
  variants: {
    extend: {},
  },

}
