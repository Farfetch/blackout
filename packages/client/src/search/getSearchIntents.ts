import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetSearchIntents } from './types';

/**
 * @typedef {object} GetSearchIntentsQuery
 *
 * @alias GetSearchIntentsQuery
 * @memberof module:search/client
 *
 * @property {string} [searchTerms] - Free text to find terms, including
 * listings, pdps, stopwords, percolations and content pages redirects.
 * The maximum characters length is 200.
 * Queries above 200 characters will be truncated.
 * @property {number} [gender] - Gender context to find these terms,
 * allowing for a more narrow search.
 */

/**
 * Method responsible for get the search intents for the given query with
 * search terms.
 *
 * @memberof module:search/client
 *
 * @param {GetSearchIntentsQuery} [query] - Query parameters to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const getSearchIntents: GetSearchIntents = (query, config) =>
  client
    .get(join('/commerce/v1/search/intent', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getSearchIntents;
