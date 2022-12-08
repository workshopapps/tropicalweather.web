/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-btn': '#EF6820',
        'primary-btn-clicked': '#F7B27A',
        'primary-btn-disabled': '#E8E7EA',
      },
    },
  },
  plugins: []
};
