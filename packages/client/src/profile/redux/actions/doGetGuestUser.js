import {
  GET_GUEST_USER_FAILURE,
  GET_GUEST_USER_REQUEST,
  GET_GUEST_USER_SUCCESS,
} from '../actionTypes';

/**
 * @callback GetGuestUserThunkFactory
 * @param {string} id - Universal identifier of the user.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Gets the guest user details with the specified id.
 *
 * @function doGetGuestUser
 * @memberof module:profile/actions
 *
 * @param {Function} getGuestUser - Get guest user client.
 *
 * @returns {GetGuestUserThunkFactory} Thunk factory.
 */
export default getGuestUser => (id, config) => async dispatch => {
  dispatch({
    type: GET_GUEST_USER_REQUEST,
  });

  try {
    const result = await getGuestUser(id, config);
    const userEntity = {
      entities: { user: result },
      result: result.id,
    };

    dispatch({
      payload: userEntity,
      type: GET_GUEST_USER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_GUEST_USER_FAILURE,
    });

    throw error;
  }
};
