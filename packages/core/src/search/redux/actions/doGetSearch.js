// @TODO: Remove this file in version 2.0.0.
import * as actionTypes from '../actionTypes';
import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../../package.json';
import { warnDeprecatedMethod } from '../../../helpers';

/**
 * @typedef {object} GetSearchQuery
 * @property {string} [searchTerms] - Free text to find terms, including
 * listings, pdps, stopwords, percolations, and content pages redirects. The
 * maximum characters length is 200. Queries above 200 characters will be
 * truncated.
 * @property {number} [gender] - Gender context to find these terms,
 * allowing for a more narrow search.
 */

/**
 * @callback GetSearchThunkFactory
 * @param {GetSearchQuery} [query] - Query parameters to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Get the next action (redirect to a pdp, plp or another slug) for a given
 * search.
 *
 * @function doGetSearch
 * @memberof module:search/actions
 *
 * @deprecated Since version 1.x.x.
 * Will be deleted in version 2.0.0.
 * In case you need this behavior, use the doGetSearchIntents method instead.
 *
 * @param {Function} getSearch - Get search client.
 *
 * @returns {GetSearchThunkFactory} Thunk factory.
 */
export default getSearch => (query, config) => async dispatch => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    'doGetSearch',
    'doGetSearchIntents',
  );

  dispatch({
    meta: { query },
    type: actionTypes.GET_SEARCH_REQUEST,
  });

  try {
    const result = await getSearch(query, config);

    dispatch({
      meta: { query },
      payload: result,
      type: actionTypes.GET_SEARCH_SUCCESS,
    });
  } catch (error) {
    dispatch({
      meta: { query },
      payload: { error },
      type: actionTypes.GET_SEARCH_FAILURE,
    });

    throw error;
  }
};
