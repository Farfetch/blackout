import * as actionTypes from '../actionTypes';

/**
 * @typedef {object} GetSearchSuggestionsQuery
 * @property {string} [query] - Query to search.
 * @property {number} [gender] - Gender to apply on search.
 * @property {boolean} [ignoreFilterExclusions=false] - Whether to ignore
 * (not apply) the filter exclusions.
 */

/**
 * @callback GetSearchSuggestionsThunkFactory
 * @param {GetSearchSuggestionsQuery} [query] - Query parameters to apply to the
 *  search.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Gets the suggestions for a given search.
 *
 * @function doGetSearchSuggestions
 * @memberof module:search/actions
 *
 * @param {Function} getSearchSuggestions - Get search suggestions client.
 *
 * @returns {GetSearchSuggestionsThunkFactory} Thunk factory.
 */
export default getSearchSuggestions => (query, config) => async dispatch => {
  dispatch({
    meta: { query },
    type: actionTypes.GET_SEARCH_SUGGESTIONS_REQUEST,
  });

  try {
    const result = await getSearchSuggestions(query, config);

    dispatch({
      meta: { query },
      payload: { result },
      type: actionTypes.GET_SEARCH_SUGGESTIONS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      meta: { query },
      payload: { error },
      type: actionTypes.GET_SEARCH_SUGGESTIONS_FAILURE,
    });

    throw error;
  }
};
