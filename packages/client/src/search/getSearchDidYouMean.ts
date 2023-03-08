import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetSearchDidYouMean } from './types/index.js';

/**
 * Method responsible for returning the facets available to a given search.
 *
 * @param query  - Query parameters to apply to the search.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getSearchDidYouMean: GetSearchDidYouMean = (query, config) =>
  client
    .get(join('/commerce/v1/search/didyoumean', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getSearchDidYouMean;
