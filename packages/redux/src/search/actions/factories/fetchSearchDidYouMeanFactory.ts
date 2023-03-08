import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetSearchDidYouMean,
  type SearchDidYouMeanQuery,
  type SearchDidYouMeanSuggestion,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { generateSearchDidYouMeanHash } from '../../helpers/index.js';
import type { Dispatch } from 'redux';
import type { FetchSearchDidYouMeanAction } from '../../types/index.js';

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
    const hash = generateSearchDidYouMeanHash(query);

    try {
      dispatch({
        meta: { query, hash },
        type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_REQUEST,
      });

      const result = await getSearchDidYouMean(query, config);

      dispatch({
        meta: { query, hash },
        payload: { result },
        type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { query, hash },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchSearchDidYouMeanFactory;
