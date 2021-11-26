import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetSearchDidYouMean } from './types';

/**
 * @typedef {object} GetSearchDidYouMeanQuery
 *
 * @alias GetSearchDidYouMeanQuery
 * @memberof module:search/client
 *
 * @property {string} [searchTerms] - Query to find in products.
 * @property {Array} [genders] - Genders to get results, separated by commas.
 */

/**
 * Method responsible for returning the facets available to a given search.
 *
 * @memberof module:search/client
 *
 * @param {GetSearchDidYouMeanQuery} [query] - Query parameters to apply to the
 * search.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const getSearchDidYouMean: GetSearchDidYouMean = (query, config) =>
  client
    .get(join('/commerce/v1/search/didyoumean', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getSearchDidYouMean;
