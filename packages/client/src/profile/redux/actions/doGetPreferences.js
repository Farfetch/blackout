import {
  GET_PREFERENCES_FAILURE,
  GET_PREFERENCES_REQUEST,
  GET_PREFERENCES_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import userPreferencesSchema from '../../../entities/schemas/preference';

/**
 * @callback GetPreferencesThunkFactory
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
 * @function doGetPreferences
 * @memberof module:profile/actions
 *
 * @param {Function} getPreferences - Get preferences client.
 *
 * @returns {GetPreferencesThunkFactory} Thunk factory.
 */
export default getPreferences => (userId, code, config) => async dispatch => {
  dispatch({
    type: GET_PREFERENCES_REQUEST,
  });

  try {
    const result = await getPreferences(userId, code, config);

    dispatch({
      payload: normalize(result, [userPreferencesSchema]),
      type: GET_PREFERENCES_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_PREFERENCES_FAILURE,
    });

    throw error;
  }
};
