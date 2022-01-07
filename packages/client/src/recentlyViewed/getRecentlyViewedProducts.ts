import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetRecentlyViewedProducts } from './types';

/**
 * Method responsible for retrieving data from recently viewed products
 * endpoint on MKT API.
 *
 * @function getRecentlyViewedProducts
 * @memberof module:recentlyViewed
 *
 * @param {GetRecentlyViewedProductsQuery} [query] - Query parameters to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the endpoint finishes.
 */

const getRecentlyViewedProducts: GetRecentlyViewedProducts = (
  query = { page: 1, pageSize: 10 },
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

export default getRecentlyViewedProducts;
