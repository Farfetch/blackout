import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetSearchSuggestionsQuery
 *
 * @alias GetSearchSuggestionsQuery
 * @memberof module:search/client
 *
 * @property {string} [query] - Query to search.
 * @property {number} [gender] - Gender to apply on search.
 * @property {boolean} [ignoreFilterExclusions=false] - Whether to ignore
 * (not apply) the filter exclusions.
 */

/**
 * Method responsible for returning the suggestions for a given search.
 *
 * @function getSearchSuggestions
 * @memberof module:search/client
 *
 * @param {GetSearchSuggestionsQuery} [query] - Query parameters to apply to
 * the search.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (query, config) =>
  client
    .get(join('/commerce/v1/search/suggestions', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
