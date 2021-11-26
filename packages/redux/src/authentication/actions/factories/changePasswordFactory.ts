import {
  PASSWORD_CHANGE_FAILURE,
  PASSWORD_CHANGE_REQUEST,
  PASSWORD_CHANGE_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';

/**
 * @typedef {object} PasswordChangeData
 * @property {string} oldPassword - Old Password.
 * @property {string} newPassword - New Password.
 * @property {string} userId - User's identifier.
 * @property {string} username - User's email.
 */

/**
 * @callback ChangePasswordThunkFactory
 * @param {PasswordChangeData} data - Password details.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for changing a user password.
 *
 * @function changePassword
 * @memberof module:authentication/actions/factories
 *
 * @param {Function} postPasswordChange - Post password change client.
 *
 * @returns {ChangePasswordThunkFactory} Thunk factory.
 */
export default (postPasswordChange: any) =>
  (
    data: {
      oldPassword: string;
      newPassword: string;
      userId: string;
      username: string;
    },
    config?: { [k: string]: any },
  ) =>
  async (dispatch: Dispatch): Promise<any> => {
    dispatch({
      type: PASSWORD_CHANGE_REQUEST,
    });

    try {
      const result = await postPasswordChange(data, config);

      dispatch({
        type: PASSWORD_CHANGE_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: PASSWORD_CHANGE_FAILURE,
      });

      throw error;
    }
  };
