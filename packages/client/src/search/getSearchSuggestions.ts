import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetSearchSuggestions } from './types';

/**
 * Method responsible for returning the suggestions for a given search.
 *
 * @param query  - Query parameters to apply to the search.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getSearchSuggestions: GetSearchSuggestions = (query, config) =>
  client
    .get(join('/commerce/v1/search/suggestions', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getSearchSuggestions;
