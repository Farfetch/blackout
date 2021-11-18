import * as actionTypes from '../actionTypes';

/**
 * @typedef {object} GetSearchIntentsQuery
 * @property {string} [searchTerms] - Free text to find terms, including
 * listings, pdps, stopwords, percolations, and content pages redirects. The
 * maximum characters length is 200. Queries above 200 characters will be
 * truncated.
 * @property {number} [gender] - Gender context to find these terms,
 * allowing for a more narrow search.
 */

/**
 * @callback GetSearchIntentsThunkFactory
 * @param {GetSearchIntentsQuery} [query] - Query parameters to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Gets the search intents for the given query with search terms.
 * With these results is possible to know the next action to perform -
 * redirect to a pdp, plp or another redirectUrl.
 *
 * @function doGetSearchIntents
 * @memberof module:search/actions
 *
 * @param {Function} getSearchIntents - Get search intents client.
 *
 * @returns {GetSearchIntentsThunkFactory} Thunk factory.
 */
export default getSearchIntents => (query, config) => async dispatch => {
  dispatch({
    meta: { query },
    type: actionTypes.GET_SEARCH_INTENTS_REQUEST,
  });

  try {
    const result = await getSearchIntents(query, config);

    dispatch({
      meta: { query },
      payload: { result },
      type: actionTypes.GET_SEARCH_INTENTS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      meta: { query },
      payload: { error },
      type: actionTypes.GET_SEARCH_INTENTS_FAILURE,
    });

    throw error;
  }
};
