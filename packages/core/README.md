# @farfetch/blackout-core

Clients to connect to the Farfetch Platform Solutions' services and modules to manage the application data layer and global state.

## Installation

**yarn**

```sh
yarn add @farfetch/blackout-core
```

**npm**

```sh
npm i @farfetch/blackout-core
```

## Usage

Update your store to include the reducers and entities, like the example below:

```js
// Typically in `store/buildStore.js`
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { bagMiddleware } from '@farfetch/blackout-core/analytics/redux/middlewares';
import {
  checkout,
  entitiesMapper,
  listing,
} from '@farfetch/blackout-core/redux';
import { createEntitiesReducer } from '@farfetch/blackout-core';
import otherScopeReducer from './other-scope';

// Create your reducer based on a combination of other reducers and entities
const reducers = combineReducers({
  checkout,
  entities: createEntitiesReducer({ ...entitiesMapper }),
  listing,
  otherScope: otherScopeReducer,
});
const middlewares = [bagMiddleware(analytics)];
const store = createStore(reducers, applyMiddleware(...middlewares));
```

With the store configured, you just need to import and use what you need

```js
// Fetching a listing page
import { doGetListing } from '@farfetch/blackout-core/products/listing/redux';
import { getListing as getListingClient } from '@farfetch/blackout-core/products/listing/client';

const fetchListing = doGetListing(getListingClient);

fetchListing(args);
```

### Additional configuration

Since this package is published in its original structure, all the source code is contained in a `src` folder. This means you might need additional configurations:

- In order to have friendly imports (`@farfetch/blackout-core` vs `@farfetch/blackout-core/src`), you probably want to add aliases

  ```js
  // Webpack example
  config.resolve.alias = {
    '@farfetch/blackout-core': '@farfetch/blackout-core/src',
  };
  ```

- In order to have your project running, you probably need a specific loader
  ```js
  // Webpack example
  config.module.rules.push({
    test: /\.jsx?$/,
    include: [/node_modules\/@farfetch\/blackout-core/],
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

Please read the [CONTRIBUTING](../../CONTRIBUTING) file to know what we expect from your contribution and the guidelines you should follow.

## License

[MIT](../../LICENSE) @ Farfetch
