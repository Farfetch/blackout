import {
  FETCH_PREFERENCES_FAILURE,
  FETCH_PREFERENCES_REQUEST,
  FETCH_PREFERENCES_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import userPreferencesSchema from '../../entities/schemas/preference';

/**
 * @callback FetchPreferencesThunkFactory
 * @param {string} userId - User's id to.
 * @param {string} code - Preference code to be filtered.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Gets the user preferences.
 *
 * @function fetchPreferences
 * @memberof module:users/actions
 *
 * @param {Function} getPreferences - Get preferences client.
 *
 * @returns {FetchPreferencesThunkFactory} Thunk factory.
 */
export default getPreferences => (userId, code, config) => async dispatch => {
  dispatch({
    type: FETCH_PREFERENCES_REQUEST,
  });

  try {
    const result = await getPreferences(userId, code, config);

    dispatch({
      payload: normalize(result, [userPreferencesSchema]),
      type: FETCH_PREFERENCES_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: FETCH_PREFERENCES_FAILURE,
    });

    throw error;
  }
};
