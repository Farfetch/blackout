# @farfetch/blackout-redux

Modules to manage the application global state.

## Installation

The current version (1.x) requires at least Node 14.

**yarn**

```sh
yarn add @farfetch/blackout-redux
```

**npm**

```sh
npm i @farfetch/blackout-redux
```

Make sure that you have installed the correct peer dependencies of this package:

**yarn**

```sh
yarn add @farfetch/blackout-analytics @farfetch/blackout-client immer@^9.0.19 lodash-es redux@^4.1.0 redux-thunk@^2.4.2 reselect@^4.1.5
```

**npm**

```sh
npm i add @farfetch/blackout-analytics @farfetch/blackout-client immer@^9.0.19 lodash-es redux@^4.1.0 redux-thunk@^2.4.2 reselect@^4.1.5
```

Note: You might also need to install the peer dependencies of both [@farfetch/blackout-analytics](../analytics/README.md#installation) and [@farfetch/blackout-client](../client/README.md#installation) packages if you do not have them installed yet.

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

Update your store to include the reducers and entities, like the example below:

```js
// Typically in `store/buildStore.js`
import { applyMiddleware, combineReducers, createStore } from 'redux';
import {
  analyticsMiddlewares,
  bagsReducer,
  createDefaultEntitiesReducer,
  productsReducer,
} from '@farfetch/blackout-redux';
import { analytics } from '@farfetch/blackout-react';
import otherScopeReducer from './other-scope';

// Create your reducer based on a combination of other reducers and entities
const reducers = combineReducers({
  bags: bagsReducer,
  entities: createDefaultEntitiesReducer([]),
  products: productsReducer,
  otherScope: otherScopeReducer,
});

const middlewares = [
  analyticsMiddlewares.setUser(analytics),
  analyticsMiddlewares.bag(analytics),
  analyticsMiddlewares.wishlist(analytics),
];

const store = createStore(reducers, applyMiddleware(...middlewares));
```

With the store configured, you just need to import and use what you need. All imports should be done from the root of the package like in the following example:

```js
// Fetching the bag
import { fetchBag } from '@farfetch/blackout-redux';

fetchBag(bagId);
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

Please read the [CONTRIBUTING](../../CONTRIBUTING.md) file to know what we expect from your contribution and the guidelines you should follow.

## License

[MIT](../../LICENSE) @ Farfetch
