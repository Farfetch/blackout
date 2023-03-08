import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetSizeGuides } from './types/index.js';

/**
 * Method responsible for loading the possible size guides for specific brand ids
 * and category ids. This size guides logic should be used in cases that the
 * project does not have a category tree. If your project has a category tree you
 * should use the size guides logic from
 * \@farfetch/blackout-client/products/details/client.
 *
 * @param query  - Query parameters to apply to the request.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getSizeGuides: GetSizeGuides = (query, config) => {
  return client
    .get(join('/commerce/v1/sizeGuides', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};

export default getSizeGuides;
