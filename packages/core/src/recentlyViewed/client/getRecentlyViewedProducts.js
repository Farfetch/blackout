import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetRecentlyViewedProductsQuery
 *
 * @alias GetRecentlyViewedProductsQuery
 * @memberof module:recentlyViewed/client
 *
 * @property {number} [page] - Page to be retrieved with the recently
 * viewed products.
 * @property {number} [pageSize] - Quantity of items to be retrievedwithin
 * each page.
 */

/**
 * Method responsible for retrieving data from recently viewed products
 * endpoint on MKT API.
 *
 * @function getRecentlyViewedProducts
 * @memberof module:recentlyViewed/client
 *
 * @param {GetRecentlyViewedProductsQuery} [query] - Query parameters to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the endpoint finishes.
 */
export default (
  query = {
    page: 1,
    pageSize: 10,
  },
  config,
) =>
  client
    .get(
      join('/marketing/v1/recentlyViewed/products', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
