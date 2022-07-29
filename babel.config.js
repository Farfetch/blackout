module.exports = function (api) {
  const isTestEnvironment = api.env('test');
  const presetEnv = [];

  if (isTestEnvironment) {
    presetEnv.push([
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
        targets: {
          node: '8.9',
          browsers: 'extends browserslist-config-google',
        },
      },
    ]);
  }

  return {
    plugins: [
      ['./babel-plugins/packageJsonTransformer'], // This must be the first plugin
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
    presets: [
      ...presetEnv,
      [
        '@babel/preset-react',
        {
          runtime: 'automatic', // Starting from Babel 8, "automatic" will be the default runtime
        },
      ],
      '@babel/preset-typescript',
    ],
  };
};
