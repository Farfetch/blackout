import {
  VALIDATE_EMAIL_FAILURE,
  VALIDATE_EMAIL_REQUEST,
  VALIDATE_EMAIL_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';

/**
 * @typedef {object} ValidateEmailData
 * @property {string} username - User's email.
 * @property {string} token - User's validation token.
 */

/**
 * @callback ValidateEmailThunkFactory
 * @param {ValidateEmailData} data - Details to validate user's e-mail.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for validating the user's e-mail, activating the account.
 *
 * @function validateEmail
 * @memberof module:authentication/actions/factories
 *
 * @param {Function} postValidateEmail - Post validate email client.
 *
 * @returns {ValidateEmailThunkFactory} Thunk factory.
 */
export default (postValidateEmail: any) =>
  (
    data: {
      username: string;
      token: string;
    },
    config?: {
      [k: string]: any;
    },
  ) =>
  async (dispatch: Dispatch): Promise<any> => {
    dispatch({
      type: VALIDATE_EMAIL_REQUEST,
    });

    try {
      const result = await postValidateEmail(data, config);

      dispatch({
        type: VALIDATE_EMAIL_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: VALIDATE_EMAIL_FAILURE,
      });

      throw error;
    }
  };
