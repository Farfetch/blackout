import { normalize } from 'normalizr';
import {
  UPDATE_PREFERENCES_FAILURE,
  UPDATE_PREFERENCES_REQUEST,
  UPDATE_PREFERENCES_SUCCESS,
} from '../../actionTypes';
import userPreferencesSchema from '../../../entities/schemas/preference';
import type { Dispatch } from 'redux';
import type {
  SetPreferences,
  SetPreferencesData,
} from '@farfetch/blackout-client/users/types';

/**
 * @callback UpdatePreferencesThunkFactory
 * @param {object} userId - User's id to be filtered for.
 * @param {object} data - User preferences data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Updates the user preferences.
 *
 * @function updatePreferences
 * @memberof module:users/actions
 *
 * @param {Function} updatePreferences - Update preferences client.
 *
 * @returns {SetPreferencesThunkFactory} Thunk factory.
 */
const setPreferencesFactory =
  (updatePreferences: SetPreferences) =>
  (userId: number, data: SetPreferencesData, config: Record<string, unknown>) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: UPDATE_PREFERENCES_REQUEST,
    });

    try {
      const result = await updatePreferences(userId, data, config);

      dispatch({
        type: UPDATE_PREFERENCES_SUCCESS,
        payload: normalize(data, [userPreferencesSchema]),
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: UPDATE_PREFERENCES_FAILURE,
      });

      throw error;
    }
  };

export default setPreferencesFactory;
