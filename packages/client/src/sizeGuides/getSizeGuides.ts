import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetSizeGuides } from './types';

/**
 * @typedef {object} GetSizeGuidesQuery
 *
 * @alias GetSizeGuidesQuery
 * @memberof module:sizeGuides
 *
 * @property {Array} [brandIds] - Brand ids to search for size guides.
 * @property {Array} [categoryIds] - Category ids to search for size guides.
 */

/**
 * Method responsible for loading the possible size guides for specific brand ids
 * and category ids.
 * This size guides logic should be used in cases that the project does not have
 * a category tree.
 * If your project has a category tree you should use the size guides logic
 * from @farfetch/blackout-client/products/details/client.
 *
 * @memberof module:sizeGuides
 *
 * @param {GetSizeGuidesQuery} [query] - Query parameters to apply to the
 * request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
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
