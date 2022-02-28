// eslint-disable-next-line
/**
 * @jest-environment node
 */

/**
 * We need to test if the global variable `window` is not defined,
 * so we can have the full coverage needed for `defaults.js` file.
 * For that, we need to specify with the comment above that the environment is different from `jsdom` (node).
 * This comment only works if we specify the environment for the whole file, so we split the tests in different files
 * for different environments.
 */

import * as defaults from '../defaults';

describe('Defaults', () => {
  it('Should export an empty object when calling getPageDefaults() if window is not defined', () => {
    const result = defaults.getPageDefaults();

    expect(result).toMatchObject({});
  });

  it('Should export an empty object when calling getContextDefaults() if window is not defined', () => {
    const result = defaults.getContextDefaults();

    expect(result).toMatchObject({});
  });
});
