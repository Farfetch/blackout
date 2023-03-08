import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetCategory } from './types/index.js';

/**
 * Method responsible for getting a category by its id.
 *
 * @param categoryId - Category identifier.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getCategory: GetCategory = (categoryId, config) =>
  client
    .get(join('/commerce/v1/categories', categoryId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCategory;
