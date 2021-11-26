/**
 * @jest-environment node
 */

/**
 * We need to test if the global variable `window` is not defined,
 * so we can have the full coverage needed for `gtm.js` file.
 * For that, we need to specify with the comment above that the environment is different from `jsdom` (node).
 * This comment only works if we specify the environment for the whole file, so we devided the tests in different files
 * for different environments.
 */

import { GTM } from '../..';

jest.mock('../gtmTag.js', () => jest.fn);

describe('GTM integration', () => {
  it('Should not write on the dataLayer if the window is not defined', () => {
    GTM.createInstance({ containerId: 123 }, {});

    expect(global.dataLayer).toBe(undefined);
  });
});
