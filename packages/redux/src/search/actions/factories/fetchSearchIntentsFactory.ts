import * as actionTypes from '../../actionTypes';
import type { Dispatch } from 'redux';
import type { FetchSearchIntentsAction } from '../../types';
import type {
  GetSearchIntents,
  SearchIntents,
  SearchIntentsQuery,
} from '@farfetch/blackout-client/search/types';

/**
 * @typedef {object} FetchSearchIntentsQuery
 *
 * @property {string} searchTerms - Free text to find terms, including
 * listings, pdps, stopwords, percolations, and content pages redirects. The
 * maximum characters length is 200. Queries above 200 characters will be
 * truncated.
 * @property {number} [gender] - Gender context to find these terms,
 * allowing for a more narrow search.
 */

/**
 * @callback FetchSearchIntentsThunkFactory
 *
 * @param {FetchSearchIntentsQuery} query - Query parameters to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch the
 * search intents for the given query with search terms. With these results is
 * possible to know the next action to perform - redirect to a pdp, plp or
 * another `redirectUrl`.
 *
 * @memberof module:search/actions/factories
 *
 * @param {Function} getSearchIntents - Get search intents client.
 *
 * @returns {FetchSearchIntentsThunkFactory} Thunk factory.
 */
const fetchSearchIntentsFactory =
  (getSearchIntents: GetSearchIntents) =>
  (query: SearchIntentsQuery, config?: Record<string, unknown>) =>
  async (
    dispatch: Dispatch<FetchSearchIntentsAction>,
  ): Promise<SearchIntents> => {
    dispatch({
      meta: { query },
      type: actionTypes.FETCH_SEARCH_INTENTS_REQUEST,
    });

    try {
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
        payload: { error },
        type: actionTypes.FETCH_SEARCH_INTENTS_FAILURE,
      });

      throw error;
    }
  };

export default fetchSearchIntentsFactory;
