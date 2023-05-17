import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetUserTitles,
  type GetUserTitlesQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import titlesSchema from '../../../../entities/schemas/titles.js';
import type { Dispatch } from 'redux';

/**
 * Fetch a list of titles.
 *
 * @param getUserTitles - Get titles client.
 *
 * @returns Thunk factory.
 */

const fetchUserTitlesFactory =
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_USER_TITLES_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchUserTitlesFactory;
