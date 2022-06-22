import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import userPreferencesSchema from '../../../entities/schemas/preference';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  SetPreferences,
  SetPreferencesData,
} from '@farfetch/blackout-client/users/types';

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
  (updatePreferences: SetPreferences) =>
  (userId: number, data: SetPreferencesData, config?: Config) =>
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
        payload: { error: toError(error) },
        type: actionTypes.UPDATE_PREFERENCES_FAILURE,
      });

      throw error;
    }
  };

export default setPreferencesFactory;
