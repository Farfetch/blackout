import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetBag } from './types/index.js';

/**
 * Method responsible for retrieving data from the bag.
 *
 * @param id     - Universal identifier of the bag.
 * @param query  - Query with parameters to get the bag.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getBag: GetBag = (id, query, config) =>
  client
    .get(
      join('/commerce/v1/bags', id, {
        query: {
          ...query,
          hydrate: 'true',
        },
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getBag;
