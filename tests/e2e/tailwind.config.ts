import path from 'path';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [path.join(__dirname, './app/**/*.{html,tsx}')],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Roboto'],
      },
    },
  },
  plugins: [],
};

export default config;
