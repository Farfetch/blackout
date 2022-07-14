import * as actionTypes from '../../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import userPreferencesSchema from '../../../../entities/schemas/preference';
import type { Dispatch } from 'redux';
import type { GetUserPreferences } from '@farfetch/blackout-client/src/users/preferences/types';

/**
 * @param userId - User's id to.
 * @param code   - Preference code to be filtered.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetch the user preferences.
 *
 * @param getUserPreferences - Get preferences client.
 *
 * @returns Thunk factory.
 */
export const fetchUserPreferencesFactory =
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
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_USER_PREFERENCES_FAILURE,
      });

      throw error;
    }
  };
