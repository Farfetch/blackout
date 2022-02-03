import {
  FETCH_TITLES_FAILURE,
  FETCH_TITLES_REQUEST,
  FETCH_TITLES_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import titlesSchema from '../../../entities/schemas/titles';
import type { Dispatch } from 'redux';
import type {
  GetTitles,
  GetTitlesQuery,
} from '@farfetch/blackout-client/users/types';

/**
 * @typedef {object} GetTitlesQuery
 * @property {number} [page=1] - Number of the page to get, starting at 1.
 * The default is 1.
 * @property {number} [pageSize=10000] - Size of each page, as a number.
 * The default is 10000.
 */

/**
 * @callback GetTitlesThunkFactory
 * @param {GetTitlesQuery} [query] - Query parameters for get titles.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Fetch a list of titles.
 *
 * @function fetchTitles
 * @memberof module:users/actions
 *
 * @param {Function} getTitles - Get titles client.
 *
 * @returns {FetchTitlesThunkFactory} Thunk factory.
 */

const fetchTitlesFactory =
  (getTitles: GetTitles) =>
  (query: GetTitlesQuery, config: Record<string, unknown>) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: FETCH_TITLES_REQUEST,
    });

    try {
      const result = await getTitles(query, config);

      dispatch({
        payload: normalize(result, titlesSchema),
        type: FETCH_TITLES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_TITLES_FAILURE,
      });

      throw error;
    }
  };

export default fetchTitlesFactory;
