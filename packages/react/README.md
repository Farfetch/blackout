# @farfetch/blackout-react

React components, hooks and other tools filled with business logic to help using the Farfetch Platform Solutions' services in web or native e-commerce apps.

## Installation

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

- [`@farfetch/blackout-client`](https://www.npmjs.com/package/@farfetch/blackout-client)
- [`@farfetch/blackout-redux`](https://www.npmjs.com/package/@farfetch/blackout-redux)
- [`axios`](https://www.npmjs.com/package/axios)
- [`lodash`](https://www.npmjs.com/package/lodash)
- [`react`](https://www.npmjs.com/package/react)
- [`react-redux`](https://www.npmjs.com/package/react-redux)
- [`redux`](https://www.npmjs.com/package/redux)

## Usage

You just need to import and use what you need

```js
// Managing a bag item
import { useBagItem } from '@farfetch/blackout-react/bags';

const { error, isLoading } = useBagItem(bagItemId);
```

### Additional configuration

Since this package is published in its original structure, all the source code is contained in a `src` folder. This means you might need additional configurations:

- In order to have friendly imports (`@farfetch/blackout-react` vs `@farfetch/blackout-react/src`), you probably want to add aliases

  ```js
  // Webpack example
  config.resolve.alias = {
    '@farfetch/blackout-react': '@farfetch/blackout-react/src',
  };
  ```

- In order to have your project running, you probably need a specific loader
  ```js
  // Webpack example
  config.module.rules.push({
    test: /\.jsx?$/,
    include: [/node_modules\/@farfetch\/blackout-react/],
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
