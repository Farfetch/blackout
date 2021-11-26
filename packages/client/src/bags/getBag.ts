import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetBag } from './types';

/**
 * @typedef {object} GetBagQuery
 *
 * @alias GetBagQuery
 * @memberof module:bags/client
 *
 * @property {boolean} [includeOutOfStock=false] - If the response should
 * include sold out items in the bag.
 */

/**
 * Method responsible for retrieving data from the bag.
 *
 * @memberof module:bags/client
 *
 * @param {string} id - Universal identifier of the bag.
 * @param {GetBagQuery} [query] - Query with parameters to get the bag.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const getBag: GetBag = (id, query = {}, config) =>
  client
    .get(
      join('/commerce/v1/bags', id, {
        query: {
          ...query,
          hydrate: 'true',
        },
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getBag;
