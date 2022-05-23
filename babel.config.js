module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
        targets: {
          node: '8.9',
          browsers: 'extends browserslist-config-google',
        },
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic', // Starting from Babel 8, "automatic" will be the default runtime
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    [
      '@babel/plugin-proposal-private-methods',
      {
        loose: true,
      },
    ],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
  ],
};
