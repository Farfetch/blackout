import client, { adaptError } from '../../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetGroupingPropertiesQuery
 *
 * @alias GetGroupingPropertiesQuery
 * @memberof module:products/client
 *
 * @property {boolean} [hasStock] - Param to filter grouping properties by
 * stock.
 * Possible values are: null (for all), true (just for products with stock) and
 * false (just for products without stock).
 */

/**
 * Method responsible for loading the grouping properties for a specific
 * product.
 *
 * @function getGroupingProperties
 * @memberof module:products/client
 *
 * @param {number} id - Product identifier.
 * @param {GetGroupingPropertiesQuery} [query] - Query parameters to apply to the
 *  request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (id, query, config) =>
  client
    .get(
      join('/commerce/v1/products', id, '/groupingProperties', { query }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
