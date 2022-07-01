import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetUserTitles,
  GetUserTitlesQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import titlesSchema from '../../../../entities/schemas/titles';
import type { Dispatch } from 'redux';

/**
 * Fetch a list of titles.
 *
 * @param getUserTitles - Get titles client.
 *
 * @returns Thunk factory.
 */

export const fetchUserTitlesFactory =
  (getUserTitles: GetUserTitles) =>
  (query: GetUserTitlesQuery, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.FETCH_USER_TITLES_REQUEST,
      });

      const result = await getUserTitles(query, config);

      dispatch({
        payload: normalize(result, titlesSchema),
        type: actionTypes.FETCH_USER_TITLES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_USER_TITLES_FAILURE,
      });

      throw error;
    }
  };
