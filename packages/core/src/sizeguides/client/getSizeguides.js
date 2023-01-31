import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetSizeGuidesQuery
 *
 * @alias GetSizeGuidesQuery
 * @memberof module:sizeGuides/client
 *
 * @property {Array} [brandIds] - Brand ids to search for sizeguides.
 * @property {Array} [categoryIds] - Category ids to search for sizeguides.
 */

/**
 * Method responsible for loading the possible sizeguides for specific brand ids
 * and category ids.
 * This sizeguides logic should be used in cases that the project does not have
 * a category tree.
 * If your project has a category tree you should use the sizeguides logic
 * from @farfetch/blackout-core/products/details/client.
 *
 * @function getSizeGuides
 * @memberof module:sizeGuides/client
 *
 * @param {GetSizeGuidesQuery} [query] - Query parameters to apply to the
 * request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (query, config) =>
  client
    .get(
      join('/commerce/v1/sizeguides', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
