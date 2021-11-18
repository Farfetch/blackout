import {
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from '../actionTypes';

/**
 * @callback UpdateProfileThunkFactory
 * @param {number} id - User identifier.
 * @param {object} data - Profile data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Create update user profile.
 *
 * @function doUpdateProfile
 * @memberof module:profile/actions
 *
 * @param {Function} updateProfile - Update profile client.
 *
 * @returns {UpdateProfileThunkFactory} Thunk factory.
 */
export default updateProfile => (id, data, config) => async dispatch => {
  dispatch({
    type: UPDATE_PROFILE_REQUEST,
  });

  try {
    const result = await updateProfile(id, data, config);
    const userEntity = {
      entities: { user: result },
      result: result.id,
    };

    dispatch({
      payload: userEntity,
      type: UPDATE_PROFILE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: UPDATE_PROFILE_FAILURE,
    });

    throw error;
  }
};
