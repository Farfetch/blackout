# @farfetch/blackout-react

React components, hooks and other tools filled with business logic to help using the Farfetch Platform Solutions' services in web or native e-commerce apps.

## Installation

The current version (1.x) requires at least Node 14.

**yarn**

```sh
yarn add @farfetch/blackout-react
```

**npm**

```sh
npm i @farfetch/blackout-react
```

### Peer dependencies

Make sure that you have installed the correct peer dependencies of this package:

- [`@farfetch/blackout-analytics`](https://www.npmjs.com/package/@farfetch/blackout-analytics)
- [`@farfetch/blackout-client`](https://www.npmjs.com/package/@farfetch/blackout-client)
- [`@farfetch/blackout-redux`](https://www.npmjs.com/package/@farfetch/blackout-redux)
- [`axios`](https://www.npmjs.com/package/axios)
- [`lodash-es`](https://www.npmjs.com/package/lodash-es)
- [`react`](https://www.npmjs.com/package/react)
- [`react-redux`](https://www.npmjs.com/package/react-redux)
- [`redux`](https://www.npmjs.com/package/redux)

### Configuration

**IMPORTANT** This package is a Pure ESM package which means it cannot be `require()`'d from CommonJS. If you cannot change to ESM or want to keep using Commonjs, consider using the `import()` function to load the modules from this package asynchronously.

#### Webpack

- If it is necessary to transpile the package, add a specific loader for it:

  ```js
  // Webpack example
  config.module.rules.push({
    test: /\.jsx?$/,
    // This will add all @farfetch packages and lodash-es package which are ESM only
    include: [/node_modules\/(@farfetch|lodash-es)/],
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
transformIgnorePatterns: ['/node_modules/(?!(@farfetch|lodash-es)).+\\.js$'];
```

## Usage

You just need to import and use what you need. All imports should be done from the root of the package like in the following example:

```js
// Managing a bag item
import { useBagItem } from '@farfetch/blackout-react';

const { error, isLoading } = useBagItem(bagItemId);
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

Please read the [CONTRIBUTING](../../CONTRIBUTING.md) file to know what we expect from your contribution and the guidelines you should follow.

## License

[MIT](../../LICENSE) @ Farfetch
