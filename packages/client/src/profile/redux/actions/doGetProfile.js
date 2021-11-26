import {
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
} from '../actionTypes';

/**
 * @callback GetProfileThunkFactory
 * @param {(Array | string)} params - Possibilites are: `bag`, `membership`,
 * `wishlist`.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Gets the user profile.
 *
 * @function doGetProfile
 * @memberof module:profile/actions
 *
 * @param {Function} getProfile - Get profile client.
 *
 * @returns {GetProfileThunkFactory} Thunk factory.
 */
export default getProfile => (data, config) => async dispatch => {
  dispatch({
    type: GET_PROFILE_REQUEST,
  });

  try {
    const result = await getProfile(data, config);
    const userEntity = {
      entities: { user: result },
      result: result.id,
    };

    dispatch({
      payload: userEntity,
      type: GET_PROFILE_SUCCESS,
      meta: config,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_PROFILE_FAILURE,
    });

    throw error;
  }
};
