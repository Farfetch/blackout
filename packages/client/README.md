# @farfetch/blackout-client

Clients to connect to the Farfetch Platform Solutions' services.

## Installation

**yarn**

```sh
yarn add @farfetch/blackout-client
```

**npm**

```sh
npm i @farfetch/blackout-client
```

Make sure that you have installed the correct peer dependencies of this package:

- [`axios`](https://www.npmjs.com/package/axios)
- [`immer`](https://www.npmjs.com/package/immer)
- [`lodash`](https://www.npmjs.com/package/lodash)

## Usage

You just need to import and use what you need

```js
import { getBag } from '@farfetch/blackout-client/bags';

const fetchBag = myFetchBagAction(getBag);
```

### Additional configuration

Since this package is published in its original structure, all the source code is contained in a `src` folder. This means you might need additional configurations:

- In order to have friendly imports (`@farfetch/blackout-client` vs `@farfetch/blackout-client/src`), you probably want to add aliases

  ```js
  // Webpack example
  config.resolve.alias = {
    '@farfetch/blackout-client': '@farfetch/blackout-client/src',
  };
  ```

- In order to have your project running, you probably need a specific loader
  ```js
  // Webpack example
  config.module.rules.push({
    test: /\.jsx?$/,
    include: [/node_modules\/@farfetch\/blackout-client/],
    use: [
      {
        loader: 'babel-loader',
        options: myBabelConfig,
      },
    ],
  });
  ```

### Using `fetch` with axios

By default, all the clients exported by this package use [`axios`](https://github.com/axios/axios) with its default adapters, which `fetch` is not a part of.

If you need to use this package in an environment which only supports `fetch` API for making requests (e.g. Cloudflare Workers), we recommend you to use a custom adapter:

1. Install the package `@vespaiach/axios-fetch-adapter`:

**yarn**

```sh
yarn add @vespaiach/axios-fetch-adapter
```

**npm**

```sh
npm i @vespaiach/axios-fetch-adapter
```

2. Add the following code before any client requests are performed (for example, in your entry point file):

```js
import { client } from '@farfetch/blackout-client';
import fetchAdapter from '@vespaiach/axios-fetch-adapter';

client.defaults.adapter = fetchAdapter;
```

This sets the custom adapter to the axios instance used in @farfetch/blackout-client.

All set! Now you should see all requests from `@farfetch/blackout-client` clients using `fetch` under the hood.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

Please read the [CONTRIBUTING](../../CONTRIBUTING.md) file to know what we expect from your contribution and the guidelines you should follow.

## License

[MIT](../../LICENSE) @ Farfetch
