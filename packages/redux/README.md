# @farfetch/blackout-redux

Modules to manage the application global state.

## Installation

**yarn**

```sh
yarn add @farfetch/blackout-redux
```

**npm**

```sh
npm i @farfetch/blackout-redux
```

### Peer dependencies

Make sure that you have installed the correct peer dependencies of this package:

- [`@farfetch/blackout-analytics`](https://www.npmjs.com/package/@farfetch/blackout-analytics)
- [`@farfetch/blackout-client`](https://www.npmjs.com/package/@farfetch/blackout-client)
- [`lodash`](https://www.npmjs.com/package/lodash)
- [`redux`](https://www.npmjs.com/package/redux)
- [`redux-thunk`](https://www.npmjs.com/package/redux-thunk)
- [`immer`](https://www.npmjs.com/package/immer)
- [`reselect`](https://www.npmjs.com/package/reselect)

## Usage

Update your store to include the reducers and entities, like the example below:

```js
// Typically in `store/buildStore.js`
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { bagMiddleware } from '@farfetch/blackout-redux/analytics/middlewares';
import { entitiesMapperReducer } from '@farfetch/blackout-redux/entities';
import bag from '@farfetch/blackout-redux/bags';
import otherScopeReducer from './other-scope';
import products from '@farfetch/blackout-redux';

// Create your reducer based on a combination of other reducers and entities
const reducers = combineReducers({
  bag,
  entities: entitiesMapperReducer(),
  products,
  otherScope: otherScopeReducer,
});
const middlewares = [bagMiddleware()];
const store = createStore(reducers, applyMiddleware(...middlewares));
```

With the store configured, you just need to import and use what you need

```js
// Fetching the bag
import { fetchBag } from '@farfetch/blackout-redux/bags';

fetchBag(bagId);
```

### Additional configuration

Since this package is published in its original structure, all the source code is contained in a `src` folder. This means you might need additional configurations:

- In order to have friendly imports (`@farfetch/blackout-redux` vs `@farfetch/blackout-redux/src`), you probably want to add aliases

  ```js
  // Webpack example
  config.resolve.alias = {
    '@farfetch/blackout-redux': '@farfetch/blackout-redux/src',
  };
  ```

- In order to have your project running, you probably need a specific loader
  ```js
  // Webpack example
  config.module.rules.push({
    test: /\.jsx?$/,
    include: [/node_modules\/@farfetch\/blackout-redux/],
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
