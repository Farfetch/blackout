/**
 * @jest-environment node
 */

/**
 * We need to test if the global variable `window` is not defined, so we can have
 * the full coverage needed for `gtm.js` file. For that, we need to specify with
 * the comment above that the environment is different from `jsdom` (node). This
 * comment only works if we specify the environment for the whole file, so we
 * divided the tests in different files for different environments.
 */

import { GTM } from '../../index.js';
import { loadIntegrationData } from 'tests/__fixtures__/analytics/index.mjs';

jest.mock('../gtmTag', () => jest.fn);

describe('GTM integration', () => {
  it('Should not write on the dataLayer if the window is not defined', () => {
    GTM.createInstance({ containerId: '123' }, loadIntegrationData, {
      createEvent: type => Promise.resolve({ ...loadIntegrationData, type }),
    });

    // @ts-expect-error
    expect(global.dataLayer).toBe(undefined);
  });
});
