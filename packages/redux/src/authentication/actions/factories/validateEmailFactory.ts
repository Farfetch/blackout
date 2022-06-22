import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  PostValidateEmail,
  PostValidateEmailData,
} from '@farfetch/blackout-client/authentication/types';

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
export default (postValidateEmail: PostValidateEmail) =>
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
        payload: { error: toError(error) },
        type: actionTypes.VALIDATE_EMAIL_FAILURE,
      });

      throw error;
    }
  };
