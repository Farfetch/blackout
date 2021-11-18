import {
  PASSWORD_RECOVER_FAILURE,
  PASSWORD_RECOVER_REQUEST,
  PASSWORD_RECOVER_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} PasswordRecoveryData
 * @property {string} username - User's email.
 */

/**
 * @callback PasswordRecoveryThunkFactory
 * @param {PasswordRecoveryData} data - User details.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for sending an email for the user to reset the password.
 *
 * @function doPasswordRecover
 * @memberof module:authentication/actions
 *
 * @param {Function} postPasswordRecover - Post password recover client.
 *
 * @returns {PasswordRecoveryThunkFactory} Thunk factory.
 */
export default postPasswordRecover => (data, config) => async dispatch => {
  dispatch({
    type: PASSWORD_RECOVER_REQUEST,
  });

  try {
    await postPasswordRecover(data, config);

    dispatch({
      type: PASSWORD_RECOVER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: PASSWORD_RECOVER_FAILURE,
    });

    throw error;
  }
};
