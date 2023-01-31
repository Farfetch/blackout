// @TODO: Remove this file in version 2.0.0.
import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../package.json';
import { warnDeprecatedMethod } from '../../helpers';
import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetSearchQuery
 *
 * @alias GetSearchQuery
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
 * Method responsible for get the right term for a given search.
 *
 * @function getSearch
 * @memberof module:search/client
 *
 * @deprecated Since version 1.x.x.
 * Will be deleted in version 2.0.0.
 * In case you need this behavior, use the getSearchIntents method instead.
 *
 * @param {GetSearchQuery} [query] - Query parameters to apply to the search.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (query, config) => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    'getSearch',
    'getSearchIntents',
  );

  return client
    .get(join('/commerce/v1/search/intent', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};
