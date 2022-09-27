import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetBag } from './types';

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
