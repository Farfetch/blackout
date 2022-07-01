import * as actionTypes from '../../actionTypes';
import {
  Config,
  PutUserPreferences,
  PutUserPreferencesData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import userPreferencesSchema from '../../../../entities/schemas/preference';
import type { Dispatch } from 'redux';

/**
 * Updates the user preferences.
 *
 * @param putUserPreferences - Update preferences client.
 *
 * @returns Thunk factory.
 */
export const setUserPreferencesFactory =
  (putUserPreferences: PutUserPreferences) =>
  (userId: number, data: PutUserPreferencesData, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.UPDATE_USER_PREFERENCES_REQUEST,
      });

      const result = await putUserPreferences(userId, data, config);

      dispatch({
        type: actionTypes.UPDATE_USER_PREFERENCES_SUCCESS,
        payload: normalize(data, [userPreferencesSchema]),
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.UPDATE_USER_PREFERENCES_FAILURE,
      });

      throw error;
    }
  };
