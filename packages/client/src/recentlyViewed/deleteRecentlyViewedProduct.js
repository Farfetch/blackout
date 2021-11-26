import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for deleting the data of a recently viewed product endpoint on the Marketing API.
 *
 * @function deleteRecentlyViewedProduct
 * @memberof module:recentlyViewed
 *
 * @param {number} id - Identification number of the recently viewed product to delete.
 * @param {object} [config] - Custom configurations to send to the client instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the endpoint finishes.
 */
export default (id, config) =>
  client
    .delete(join('/marketing/v1/recentlyViewed/products', id), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
