import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import userPreferencesSchema from '../../../entities/schemas/preference';
import type { Dispatch } from 'redux';
import type {
  SetUserPreferences,
  SetUserPreferencesData,
} from '@farfetch/blackout-client/users/preferences/types';

/**
 * @param userId - User's id to be filtered for.
 * @param data   - User preferences data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Updates the user preferences.
 *
 * @param updatePreferences - Update preferences client.
 *
 * @returns Thunk factory.
 */
const setPreferencesFactory =
  (updatePreferences: SetUserPreferences) =>
  (userId: number, data: SetUserPreferencesData, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.UPDATE_PREFERENCES_REQUEST,
      });

      const result = await updatePreferences(userId, data, config);

      dispatch({
        type: actionTypes.UPDATE_PREFERENCES_SUCCESS,
        payload: normalize(data, [userPreferencesSchema]),
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.UPDATE_PREFERENCES_FAILURE,
      });

      throw error;
    }
  };

export default setPreferencesFactory;
