module.exports = function (api) {
  return {
    plugins: [
      ['./babel-plugins/plugin-package-json-transformer'], // This must be the first plugin
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          bugfixes: true,
          modules: !!api.env('test') ? 'auto' : false,
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
  };
};
