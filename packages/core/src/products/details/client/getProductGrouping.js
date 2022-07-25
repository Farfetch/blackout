import client, { adaptError } from '../../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetGroupingQuery
 *
 * @alias GetGroupingQuery
 * @memberof module:products/client
 *
 * @property {number} [pageIndex=1] - The current page. The default is 1 on
 * the backend side.
 * @property {number} [pageSize=10] - Size of each page, as a number. The
 * default is 10 on the backend side.
 * @property {string} [properties] - Get product variations for specific
 * properties, identified by their type (propertyType:attributeValueId),
 * separated by commas.
 */

/**
 * Method responsible for loading the grouping for a specific product.
 *
 * @function getGrouping
 * @memberof module:products/client
 *
 * @param {number} id - Product identifier.
 * @param {GetGroupingQuery} [query] - Query parameters to apply to the
 *  request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (id, query, config) =>
  client
    .get(join('/commerce/v1/products', id, '/grouping', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
