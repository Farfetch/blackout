import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method to receive all the commerce pages corresponding to the query object received.
 *
 * @function getCommercePages
 * @memberof module:contents/client
 *
 * @param {object} query - Query object with search terms to apply.
 * @param {string} query.type - Query by a page type.
 * @param {number} [query.id] - Query by a specified product or set identifier.
 * @param {number} [query.gender] - Query by a gender (E.g. 0 = Woman, 1 = Man, 2 = Unisex, 3 = Kid).
 * @param {number} [query.brand] - Query by a specified brand identifier.
 * @param {string} [query.category] - Query by a specified category identifiers, separated
 * by commas (E.g. 139065,139088).
 * @param {string} [query.priceType] - Query by a specified price type, separated by commas
 * (E.g. 0,1,2).
 * @param {number} [query.sku] - Query by a specified sku identifier.
 * @param {number} [query.pageIndex] - Number of the page to get, starting at 1. The default is 1.
 * @param {number} [query.pageSize] - Size of each page, as a number between 1 and 180. The default is 60.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to the endpoint finishes.
 */
export default (query, config) =>
  client
    .get(join('content/v1/commercepages', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
