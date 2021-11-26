import * as actionTypes from '../../actionTypes';
import type { Dispatch } from 'redux';
import type { FetchSearchSuggestionsAction } from '../../types';
import type {
  GetSearchSuggestions,
  SearchSuggestion,
  SearchSuggestionsQuery,
} from '@farfetch/blackout-client/search/types';

/**
 * @typedef {object} FetchSearchSuggestionsQuery
 *
 * @property {string} query - Query to search.
 * @property {number} [gender] - Gender to apply on search (0 = Woman, 1 = Man,
 * 2 = Unisex, 3 = Kid).
 * @property {boolean} [ignoreFilterExclusions=false] - In case of true, ignore
 * all exclusion filters configured.
 */

/**
 * @callback FetchSearchSuggestionsThunkFactory
 *
 * @param {FetchSearchSuggestionsQuery} query - Query parameters to apply to
 * the search.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch the
 * suggestions for a given search.
 *
 * @memberof module:search/actions/factories
 *
 * @param {Function} getSearchSuggestions - Get search suggestions client.
 *
 * @returns {FetchSearchSuggestionsThunkFactory} Thunk factory.
 */
const fetchSearchSuggestionsFactory =
  (getSearchSuggestions: GetSearchSuggestions) =>
  (query: SearchSuggestionsQuery, config?: Record<string, unknown>) =>
  async (
    dispatch: Dispatch<FetchSearchSuggestionsAction>,
  ): Promise<SearchSuggestion[]> => {
    dispatch({
      meta: { query },
      type: actionTypes.FETCH_SEARCH_SUGGESTIONS_REQUEST,
    });

    try {
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
        payload: { error },
        type: actionTypes.FETCH_SEARCH_SUGGESTIONS_FAILURE,
      });

      throw error;
    }
  };

export default fetchSearchSuggestionsFactory;
