import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetProductDetails } from './types';

/**
 * @typedef {object} GetProductDetailsQuery
 *
 * @alias GetProductDetailsQuery
 * @memberof module:products/client
 *
 * @property {string} [fields] - (To be exposed by BE) - Get the specified
 * field of the product, separated by commas, improving performance
 * (e.g., id, shortDescription, brand).
 * @property {number} [merchantId] - Specific merchant id to get the product.
 * @property {string} [perferredSize] - Specific size to get the product.
 */

/**
 * Method responsible for loading the product.
 *
 * @memberof module:products/client
 *
 * @param {number} id - Product identifier.
 * @param {GetProductDetailsQuery} [query] - Query parameters to apply to the
 * request.
 * @param {object} [config] - Custom configurations to send to the client instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const getProductDetails: GetProductDetails = (id, query, config) =>
  client
    .get(join('/commerce/v1/products', id, { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getProductDetails;
