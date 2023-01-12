import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetUserPreferences,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import userPreferencesSchema from '../../../../entities/schemas/preference';
import type { Dispatch } from 'redux';

/**
 * Fetch the user preferences.
 *
 * @param getUserPreferences - Get preferences client.
 *
 * @returns Thunk factory.
 */
const fetchUserPreferencesFactory =
  (getUserPreferences: GetUserPreferences) =>
  (userId: number, code: string, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.FETCH_USER_PREFERENCES_REQUEST,
      });

      const result = await getUserPreferences(userId, code, config);

      dispatch({
        payload: normalize(result, [userPreferencesSchema]),
        type: actionTypes.FETCH_USER_PREFERENCES_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_USER_PREFERENCES_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchUserPreferencesFactory;
