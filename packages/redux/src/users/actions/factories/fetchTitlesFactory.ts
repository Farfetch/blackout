import {
  FETCH_TITLES_FAILURE,
  FETCH_TITLES_REQUEST,
  FETCH_TITLES_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import titlesSchema from '../../../entities/schemas/titles';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetTitles,
  GetTitlesQuery,
} from '@farfetch/blackout-client/users/types';

/**
 * @param query  - Query parameters for get titles.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetch a list of titles.
 *
 * @param getTitles - Get titles client.
 *
 * @returns Thunk factory.
 */

const fetchTitlesFactory =
  (getTitles: GetTitles) =>
  (query: GetTitlesQuery, config?: Config) =>
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
