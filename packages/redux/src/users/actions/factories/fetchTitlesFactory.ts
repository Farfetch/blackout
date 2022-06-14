import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import titlesSchema from '../../../entities/schemas/titles';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { GetTitles } from '@farfetch/blackout-client/users/titles/types';
import type { GetTitlesQuery } from '@farfetch/blackout-client/users/types';

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
    try {
      dispatch({
        type: actionTypes.FETCH_TITLES_REQUEST,
      });

      const result = await getTitles(query, config);

      dispatch({
        payload: normalize(result, titlesSchema),
        type: actionTypes.FETCH_TITLES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.FETCH_TITLES_FAILURE,
      });

      throw error;
    }
  };

export default fetchTitlesFactory;
