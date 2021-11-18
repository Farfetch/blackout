import * as actionTypes from '../actionTypes';

/**
 * @typedef {object} GetSearchDidYouMeanQuery
 * @property {string} [searchTerms] - Query to find in products.
 * @property {Array} [genders] - Genders to get results, separated by commas.
 */

/**
 * @callback GetSearchDidYouMeanThunkFactory
 * @param {GetSearchDidYouMeanQuery} [query] - Query parameters to apply to the
 * search.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Gets the facets available to a given search.
 *
 * @function doGetSearchDidYouMean
 * @memberof module:search/actions
 *
 * @param {Function} getSearchDidYouMean - Get search did you mean client.
 *
 * @returns {GetSearchDidYouMeanThunkFactory} Thunk factory.
 */
export default getSearchDidYouMean => (query, config) => async dispatch => {
  dispatch({
    meta: { query },
    type: actionTypes.GET_SEARCH_DID_YOU_MEAN_REQUEST,
  });

  try {
    const result = await getSearchDidYouMean(query, config);

    dispatch({
      meta: { query },
      payload: { result },
      type: actionTypes.GET_SEARCH_DID_YOU_MEAN_SUCCESS,
    });
  } catch (error) {
    dispatch({
      meta: { query },
      payload: { error },
      type: actionTypes.GET_SEARCH_DID_YOU_MEAN_FAILURE,
    });

    throw error;
  }
};
