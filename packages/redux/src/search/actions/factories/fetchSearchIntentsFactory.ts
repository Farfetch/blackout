import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetSearchIntents,
  SearchIntents,
  SearchIntentsQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchSearchIntentsAction } from '../../types';

/**
 * @param query  - Query parameters to apply.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch the search
 * intents for the given query with search terms. With these results is possible to
 * know the next action to perform - redirect to a pdp, plp or another
 * `redirectUrl`.
 *
 * @param getSearchIntents - Get search intents client.
 *
 * @returns Thunk factory.
 */
const fetchSearchIntentsFactory =
  (getSearchIntents: GetSearchIntents) =>
  (query: SearchIntentsQuery, config?: Config) =>
  async (
    dispatch: Dispatch<FetchSearchIntentsAction>,
  ): Promise<SearchIntents> => {
    try {
      dispatch({
        meta: { query },
        type: actionTypes.FETCH_SEARCH_INTENTS_REQUEST,
      });

      const result = await getSearchIntents(query, config);

      dispatch({
        meta: { query },
        payload: { result },
        type: actionTypes.FETCH_SEARCH_INTENTS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { query },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_SEARCH_INTENTS_FAILURE,
      });

      throw error;
    }
  };

export default fetchSearchIntentsFactory;
