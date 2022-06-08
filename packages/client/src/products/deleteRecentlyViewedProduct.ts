import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { DeleteRecentlyViewedProduct } from './types';

/**
 * Method responsible for deleting the data of a recently viewed product endpoint
 * on the Marketing API.
 *
 * @param id     - Identification number of the recently viewed product to delete.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */

const deleteRecentlyViewedProduct: DeleteRecentlyViewedProduct = (id, config) =>
  client
    .delete(join('/marketing/v1/recentlyViewed/products', id), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteRecentlyViewedProduct;
