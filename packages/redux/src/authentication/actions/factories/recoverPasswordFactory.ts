import {
  PASSWORD_RECOVER_FAILURE,
  PASSWORD_RECOVER_REQUEST,
  PASSWORD_RECOVER_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';

/**
 * @typedef {object} PasswordRecoveryData
 * @property {string} username - User's email.
 * @property {string} uri - URI where the user will reset its password.
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
 * @function recoverPassword
 * @memberof module:authentication/actions/factories
 *
 * @param {Function} postPasswordRecover - Post password recover client.
 *
 * @returns {PasswordRecoveryThunkFactory} Thunk factory.
 */
export default (postPasswordRecover: any) =>
  (
    data: {
      username: string;
      uri: string;
    },
    config?: {
      [k: string]: any;
    },
  ) =>
  async (dispatch: Dispatch): Promise<any> => {
    dispatch({
      type: PASSWORD_RECOVER_REQUEST,
    });

    try {
      const result = await postPasswordRecover(data, config);

      dispatch({
        type: PASSWORD_RECOVER_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: PASSWORD_RECOVER_FAILURE,
      });

      throw error;
    }
  };
