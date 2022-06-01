import {
  FETCH_PREFERENCES_FAILURE,
  FETCH_PREFERENCES_REQUEST,
  FETCH_PREFERENCES_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import userPreferencesSchema from '../../../entities/schemas/preference';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { GetPreferences } from '@farfetch/blackout-client/users/types';

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
 * @param getPreferences - Get preferences client.
 *
 * @returns Thunk factory.
 */
const fetchPreferencesFactory =
  (getPreferences: GetPreferences) =>
  (userId: number, code: string, config?: Config) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: FETCH_PREFERENCES_REQUEST,
    });

    try {
      const result = await getPreferences(userId, code, config);

      dispatch({
        payload: normalize(result, [userPreferencesSchema]),
        type: FETCH_PREFERENCES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_PREFERENCES_FAILURE,
      });

      throw error;
    }
  };

export default fetchPreferencesFactory;
