/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        dropdown: {
          '0%': { maxHeight: '0', opacity: '0' },
          '100%': { maxHeight: '1000px', opacity: '1' },
        },
        dropdownClose: {
          '0%': { maxHeight: '1000px', opacity: '1' },
          '100%': { maxHeight: '0', opacity: '0' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        dropdown: 'dropdown 0.5s ease-in-out forwards',
        dropdownClose: 'dropdownClose 0.5s ease-in-out forwards',
        'slide-in': 'slide-in 1s ease-out forwards',
      },
      colors: {
        primary: '#60018F',
        secondary: '#9124BF',
        focus: '#DB85FF',
        text: '#e9e8ee',
        text_secondary: '#b4b1b8',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.text-shadow-sm': {
          textShadow: '1px 1px 1px rgba(0, 0, 0)',
        },
        '.text-shadow': {
          textShadow: '2px 2px 2px rgba(0, 0, 0)',
        },
        '.text-shadow-lg': {
          textShadow: '4px 4px 4px rgba(0, 0, 0)',
        },
      });
    },
  ],
};