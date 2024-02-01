import path from 'path';

const config = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: { config: path.join(__dirname, './tailwind.config.ts') },
    'postcss-preset-env': {
      features: { 'nesting-rules': false },
    },
  },
};

export default config;
