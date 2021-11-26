import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetProductSizes } from './types';

/**
 * @typedef {object} GetProductSizesQuery
 *
 * @alias GetProductSizesQuery
 * @memberof module:products/client
 *
 * @property {boolean} [includeOutOfStock] - If the sizes out of stock are
 * included or not.
 */

/**
 * Method responsible for loading the product sizes for a specific product id.
 *
 * @memberof module:products/client
 *
 * @param {number} id - Product identifier.
 * @param {GetProductSizesQuery} [query] - Query parameters to apply to the
 * request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const getProductSizes: GetProductSizes = (id, query, config) =>
  client
    .get(join('/commerce/v1/products', id, '/sizes', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getProductSizes;
