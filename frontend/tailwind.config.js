/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '320px',
        // => @media (min-width: 320px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      colors: {
        'primary-btn': '#EF6820',
        'primary-btn-clicked': '#F7B27A',
        'primary-btn-disabled': '#E8E7EA',
      },
    },
  },
  /* eslint-disable global-require */
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: false,
    base: false,
    utils: true,
    logs: true,
    rtl: false,
    prefix: 'ds_',
  },
};
