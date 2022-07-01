import { warnDeprecatedMethod } from '../helpers';
import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetProductColorGrouping } from './types';

// We use a require here to avoid typescript complaining of `package.json` is not
// under rootDir that we would get if we used an import. Typescript apparently ignores
// requires.
const {
  name: PCKG_NAME,
  version: PCKG_VERSION,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('../../package.json');

/**
 * Method responsible for loading the color grouping for a specific product.
 *
 * @param id     - Product identifier.
 * @param query  - Query parameters to apply to the request.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getProductColorGrouping: GetProductColorGrouping = (
  id,
  query,
  config,
) => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    '@farfetch/blackout-client/product/getProductColorGrouping',
  );

  return client
    .get(join('/commerce/v1/products', id, '/colorgrouping', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};

export default getProductColorGrouping;
