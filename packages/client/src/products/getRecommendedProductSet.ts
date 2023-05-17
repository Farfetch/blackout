import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetRecommendedProductSet } from './types/index.js';

/**
 * Method responsible for getting the information of a specific recommended product set.
 * This does not return a listing like a regular set, but instead a list of product
 * ids - which may have stock or not. A regular set doesn't return products that
 * are OOS, so this endpoint is to fill that gap.
 *
 * @param id     - The identifier of the recommended product set.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getRecommendedProductSet: GetRecommendedProductSet = (id, config) =>
  client
    .get(join('/commerce/v1/recommendedsets', id), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getRecommendedProductSet;
