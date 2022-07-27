import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import type { GetCategories } from './types';

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