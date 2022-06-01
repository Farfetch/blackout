import * as actionTypes from '../../actionTypes';
import type { Dispatch } from 'redux';
import type { FetchSearchDidYouMeanAction } from '../../types';
import type {
  GetSearchDidYouMean,
  SearchDidYouMean,
  SearchDidYouMeanQuery,
} from '@farfetch/blackout-client/search/types';

/**
 * @param query  - Query parameters to apply to the search.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch the facets
 * available to a given search.
 *
 * @param getSearchDidYouMean - Get search did you mean client.
 *
 * @returns Thunk factory.
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
