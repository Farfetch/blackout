import {
  PASSWORD_CHANGE_FAILURE,
  PASSWORD_CHANGE_REQUEST,
  PASSWORD_CHANGE_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} PasswordChangeData
 * @property {string} oldPassword - Old Password.
 * @property {string} newPassword - New Password.
 * @property {string} userId - User's identifier.
 * @property {string} username - User's email.
 */

/**
 * @callback PasswordChangeThunkFactory
 * @param {PasswordChangeData} data - Password details.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for changing a user password.
 *
 * @function doPasswordChange
 * @memberof module:authentication/actions
 *
 * @param {Function} postPasswordChange - Post password change client.
 *
 * @returns {PasswordChangeThunkFactory} Thunk factory.
 */
export default postPasswordChange => (data, config) => async dispatch => {
  dispatch({
    type: PASSWORD_CHANGE_REQUEST,
  });

  try {
    await postPasswordChange(data, config);

    dispatch({
      type: PASSWORD_CHANGE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: PASSWORD_CHANGE_FAILURE,
    });

    throw error;
  }
};
