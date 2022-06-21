# @farfetch/blackout-client

Clients to connect to the Farfetch Platform Solutions' services.

## Installation

The current version (2.x) requires at least Node 14.

**yarn**

```sh
yarn add @farfetch/blackout-client
```

**npm**

```sh
npm i @farfetch/blackout-client
```

Make sure that you have installed the correct peer dependencies of this package:

**yarn**

```sh
yarn add lodash-es axios@1.3.1
```

**npm**

```sh
npm i lodash-es axios@1.3.1
```

## Usage

You just need to import and use what you need. All imports should be done from the root of the package like in the following example:

```js
import { getBag } from '@farfetch/blackout-client';

const fetchBag = myFetchBagAction(getBag);
```

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
