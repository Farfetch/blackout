import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetSearchSuggestions,
  SearchSuggestion,
  SearchSuggestionsQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchSearchSuggestionsAction } from '../../types';

/**
 * @param query  - Query parameters to apply to the search.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch the
 * suggestions for a given search.
 *
 * @param getSearchSuggestions - Get search suggestions client.
 *
 * @returns Thunk factory.
 */
const fetchSearchSuggestionsFactory =
  (getSearchSuggestions: GetSearchSuggestions) =>
  (query: SearchSuggestionsQuery, config?: Config) =>
  async (
    dispatch: Dispatch<FetchSearchSuggestionsAction>,
  ): Promise<SearchSuggestion[]> => {
    try {
      dispatch({
        meta: { query },
        type: actionTypes.FETCH_SEARCH_SUGGESTIONS_REQUEST,
      });

      const result = await getSearchSuggestions(query, config);

      dispatch({
        meta: { query },
        payload: { result },
        type: actionTypes.FETCH_SEARCH_SUGGESTIONS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { query },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_SEARCH_SUGGESTIONS_FAILURE,
      });

      throw error;
    }
  };

export default fetchSearchSuggestionsFactory;
