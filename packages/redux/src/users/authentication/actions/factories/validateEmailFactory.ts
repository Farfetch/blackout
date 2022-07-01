import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostValidateEmail,
  PostValidateEmailData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * @param data   - Details to validate user's e-mail.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for validating the user's e-mail, activating the account.
 *
 * @param postValidateEmail - Post validate email client.
 *
 * @returns Thunk factory.
 */
const validateEmailFactory =
  (postValidateEmail: PostValidateEmail) =>
  (data: PostValidateEmailData, config?: Config) =>
  async (dispatch: Dispatch): Promise<any> => {
    try {
      dispatch({
        type: actionTypes.VALIDATE_EMAIL_REQUEST,
      });
      const result = await postValidateEmail(data, config);

      dispatch({
        type: actionTypes.VALIDATE_EMAIL_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.VALIDATE_EMAIL_FAILURE,
      });

      throw error;
    }
  };

export default validateEmailFactory;
