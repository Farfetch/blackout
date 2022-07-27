import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetSearchDidYouMean,
  SearchDidYouMeanQuery,
  SearchDidYouMeanSuggestion,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchSearchDidYouMeanAction } from '../../types';

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
  (query: SearchDidYouMeanQuery, config?: Config) =>
  async (
    dispatch: Dispatch<FetchSearchDidYouMeanAction>,
  ): Promise<SearchDidYouMeanSuggestion[]> => {
    try {
      dispatch({
        meta: { query },
        type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_REQUEST,
      });

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
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_FAILURE,
      });

      throw error;
    }
  };

export default fetchSearchDidYouMeanFactory;