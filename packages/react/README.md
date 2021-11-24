# @farfetch/blackout-react

React components, hooks and other tools filled with business logic to help you use Farfetch Platform Solutions' services in your web or native e-commerce app.

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

Make sure that you have installed the correct Farfetch's peer dependencies:

- [`@farfetch/blackout-core`](https://www.npmjs.com/package/@farfetch/blackout-core)

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
