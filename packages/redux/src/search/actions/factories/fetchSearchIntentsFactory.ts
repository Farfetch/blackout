import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetSearchIntents,
  type SearchIntents,
  type SearchIntentsQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { generateSearchIntentsHash } from '../../helpers/index.js';
import type { Dispatch } from 'redux';
import type { FetchSearchIntentsAction } from '../../types/index.js';

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
    const hash = generateSearchIntentsHash(query);

    try {
      dispatch({
        meta: { query, hash },
        type: actionTypes.FETCH_SEARCH_INTENTS_REQUEST,
      });

      const result = await getSearchIntents(query, config);

      dispatch({
        meta: { query, hash },
        payload: { result },
        type: actionTypes.FETCH_SEARCH_INTENTS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { query, hash },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_SEARCH_INTENTS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchSearchIntentsFactory;
