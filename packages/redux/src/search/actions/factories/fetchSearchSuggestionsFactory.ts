import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetSearchSuggestions,
  type SearchSuggestion,
  type SearchSuggestionsQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { generateSearchSuggestionsHash } from '../../helpers/index.js';
import type { Dispatch } from 'redux';
import type { FetchSearchSuggestionsAction } from '../../types/index.js';

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
    const hash = generateSearchSuggestionsHash(query);

    try {
      dispatch({
        meta: { query, hash },
        type: actionTypes.FETCH_SEARCH_SUGGESTIONS_REQUEST,
      });

      const result = await getSearchSuggestions(query, config);

      dispatch({
        meta: { query, hash },
        payload: { result },
        type: actionTypes.FETCH_SEARCH_SUGGESTIONS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { query, hash },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_SEARCH_SUGGESTIONS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchSearchSuggestionsFactory;
