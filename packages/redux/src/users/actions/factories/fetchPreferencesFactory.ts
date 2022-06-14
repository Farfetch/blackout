import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import userPreferencesSchema from '../../../entities/schemas/preference';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { GetUserPreferences } from '@farfetch/blackout-client/users/preferences/types';

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
  (getPreferences: GetUserPreferences) =>
  (userId: number, code: string, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.FETCH_PREFERENCES_REQUEST,
      });

      const result = await getPreferences(userId, code, config);

      dispatch({
        payload: normalize(result, [userPreferencesSchema]),
        type: actionTypes.FETCH_PREFERENCES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.FETCH_PREFERENCES_FAILURE,
      });

      throw error;
    }
  };

export default fetchPreferencesFactory;
