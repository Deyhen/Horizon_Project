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
      },
      animation: {
        dropdown: 'dropdown 0.5s ease-in-out forwards',
        dropdownClose: 'dropdownClose 0.5s ease-in-out forwards',
      },

      colors: {
        primary: '#4D0173',
        secondary: '#9124BF',
        text: '#e9e8ee',
        text_secondary: '#b4b1b8',
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-in': 'slide-in 1s ease-out forwards',
      },
    },
    plugins: [],
  },
};
