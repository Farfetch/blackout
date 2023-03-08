import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import type { GetCategories } from './types/index.js';

/**
 * Method responsible for getting the top categories.
 *
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getTopCategories: GetCategories = config =>
  client
    .get('/commerce/v1/categories/top', config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getTopCategories;
