import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetSet } from './types';

/**
 * Method responsible for getting a set data.
 *
 * @param slug   - Set identifier (ID, slug or gender/slug).
 * @param query  - Query parameters to apply.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getSet: GetSet = (slug, query, config) =>
  client
    .get(join('/commerce/v1/sets', slug, { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getSet;
