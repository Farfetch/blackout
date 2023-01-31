import {
  PASSWORD_RESET_FAILURE,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} PasswordResetData
 * @property {string} username - User's email.
 * @property {string} token - Reset password token.
 * @property {string} password - User's new password.
 */

/**
 * @callback PasswordResetThunkFactory
 * @param {PasswordResetData} data - User details.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for resetting and setting a new password.
 *
 * @function doPasswordReset
 * @memberof module:authentication/actions
 *
 * @param {Function} postPasswordReset - Post password reset client.
 *
 * @returns {PasswordResetThunkFactory} Thunk factory.
 */
export default postPasswordReset => (data, config) => async dispatch => {
  dispatch({
    type: PASSWORD_RESET_REQUEST,
  });

  try {
    await postPasswordReset(data, config);

    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: PASSWORD_RESET_FAILURE,
    });

    throw error;
  }
};
