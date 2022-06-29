import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetProductRecommendedSet } from './types';

/**
 * Method responsible for getting the information of a specific recommended set.
 * This does not return a listing like a regular set, but instead a list of product
 * ids - which may have stock or not. A regular set doesn't return products that
 * are OOS, so this endpoint is to fill that gap.
 *
 * @param id     - The identifier of the recommended set.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getProductRecommendedSet: GetProductRecommendedSet = (id, config) =>
  client
    .get(join('/commerce/v1/recommendedsets', id), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getProductRecommendedSet;
