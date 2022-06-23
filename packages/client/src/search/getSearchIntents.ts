import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetSearchIntents } from './types';

/**
 * Method responsible for get the search intents for the given query with search
 * terms.
 *
 * @param query  - Query parameters to apply.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getSearchIntents: GetSearchIntents = (query, config) =>
  client
    .get(join('/commerce/v1/search/intent', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getSearchIntents;
