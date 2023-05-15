# @farfetch/blackout-analytics

Centralized and agnostic way of tracking data with built-in integrations.

## Installation

The current version (1.x) requires at least Node 14.

**yarn**

```sh
yarn add @farfetch/blackout-analytics
```

**npm**

```sh
npm i @farfetch/blackout-analytics
```

### Peer dependencies

Make sure that you have installed the correct peer dependencies of this package:

- [`@farfetch/blackout-client`](https://www.npmjs.com/package/@farfetch/blackout-client)
- [`lodash-es`](https://www.npmjs.com/package/lodash-es)

### Configuration

**IMPORTANT** This package is a Pure ESM package which means it cannot be `require()`'d from CommonJS. If you cannot change to ESM or want to keep using Commonjs, consider using the `import()` function to load the modules from this package asynchronously.

#### Webpack

- If it is necessary to transpile the package, add a specific loader for it:

  ```js
  // Webpack example
  config.module.rules.push({
    test: /\.jsx?$/,
    // This will add all @farfetch packages, lodash-es and crypto-es packages which are ESM only
    include: [/node_modules\/(@farfetch|lodash-es|crypto-es)/],
    use: [
      {
        loader: 'babel-loader',
        options: myBabelConfig,
      },
    ],
    // If using webpack 5, you might need this depending on the transformations used
    resolve: { fullySpecified: false },
  });
  ```

#### Jest

- In order to support unit tests via jest, it is necessary to transpile the package to Commonjs by adding the following value to the `transformIgnorePatterns` option in Jest configuration:

```js
// jest.config.js
transformIgnorePatterns: [
  '/node_modules/(?!(@farfetch|lodash-es|crypto-es)).+\\.js$',
];
```

## Usage

You just need to import and use what you need. All imports should be done from the root of the package like in the following example:

```js
import { FromParameterType } from '@farfetch/blackout-analytics';

console.log(FromParameterType.BAG);
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

Please read the [CONTRIBUTING](../../CONTRIBUTING.md) file to know what we expect from your contribution and the guidelines you should follow.

## License

[MIT](../../LICENSE) @ Farfetch
