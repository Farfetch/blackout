# @farfetch/blackout-analytics

Centralized and agnostic way of tracking data with built-in integrations.

## Installation

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
- [`lodash`](https://www.npmjs.com/package/lodash)

## Usage

You just need to import and use what you need

```js
import { FromParameterTypes } from '@farfetch/analytics';

console.log(FromParameterTypes.BAG);
```

### Additional configuration

Since this package is published in its original structure, all the source code is contained in a `src` folder. This means you might need additional configurations:

- In order to have friendly imports (`@farfetch/blackout-analytics` vs `@farfetch/blackout-analytics/src`), you probably want to add aliases

  ```js
  // Webpack example
  config.resolve.alias = {
    '@farfetch/blackout-analytics': '@farfetch/blackout-analytics/src',
  };
  ```

- In order to have your project running, you probably need a specific loader
  ```js
  // Webpack example
  config.module.rules.push({
    test: /\.jsx?$/,
    include: [/node_modules\/@farfetch\/blackout-analytics/],
    use: [
      {
        loader: 'babel-loader',
        options: myBabelConfig,
      },
    ],
  });
  ```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

Please read the [CONTRIBUTING](../../CONTRIBUTING.md) file to know what we expect from your contribution and the guidelines you should follow.

## License

[MIT](../../LICENSE) @ Farfetch
