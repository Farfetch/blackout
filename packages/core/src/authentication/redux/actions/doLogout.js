import { LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from '../actionTypes';

/**
 * @callback LogoutThunkFactory
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Performs logout operation for the user.
 *
 * @function doLogout
 * @memberof module:authentication/actions
 *
 * @param {Function} postLogout - Post logout client.
 *
 * @returns {LogoutThunkFactory} Thunk factory.
 */
export default postLogout => config => async dispatch => {
  dispatch({
    type: LOGOUT_REQUEST,
  });

  try {
    await postLogout(config);

    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: LOGOUT_FAILURE,
    });

    throw error;
  }
};
