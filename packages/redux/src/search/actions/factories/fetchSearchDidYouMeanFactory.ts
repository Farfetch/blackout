import * as actionTypes from '../../actionTypes';
import type { Dispatch } from 'redux';
import type { FetchSearchDidYouMeanAction } from '../../types';
import type {
  GetSearchDidYouMean,
  SearchDidYouMean,
  SearchDidYouMeanQuery,
} from '@farfetch/blackout-client/search/types';

/**
 * @typedef {object} FetchSearchDidYouMeanQuery
 *
 * @property {string} searchTerms - Free text to find in products, including in
 * the description, shortDescription, categories, colors, and attributes.
 * @property {string[]} genders - Get suggestions for genders, separated by
 * commas: 0 = Woman, 1 = Man, 2 = Unisex, 3 = Kid.
 */

/**
 * @callback FetchSearchDidYouMeanThunkFactory
 *
 * @param {FetchSearchDidYouMeanQuery} query - Query parameters to apply to
 * the search.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch the
 * facets available to a given search.
 *
 * @memberof module:search/actions/factories
 *
 * @param {Function} getSearchDidYouMean - Get search did you mean client.
 *
 * @returns {FetchSearchDidYouMeanThunkFactory} Thunk factory.
 */
const fetchSearchDidYouMeanFactory =
  (getSearchDidYouMean: GetSearchDidYouMean) =>
  (query: SearchDidYouMeanQuery, config?: Record<string, unknown>) =>
  async (
    dispatch: Dispatch<FetchSearchDidYouMeanAction>,
  ): Promise<SearchDidYouMean[]> => {
    dispatch({
      meta: { query },
      type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_REQUEST,
    });

    try {
      const result = await getSearchDidYouMean(query, config);

      dispatch({
        meta: { query },
        payload: { result },
        type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { query },
        payload: { error },
        type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_FAILURE,
      });

      throw error;
    }
  };

export default fetchSearchDidYouMeanFactory;
