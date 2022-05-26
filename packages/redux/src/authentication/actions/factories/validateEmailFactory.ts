import { toError } from '@farfetch/blackout-client/helpers/client';
import {
  VALIDATE_EMAIL_FAILURE,
  VALIDATE_EMAIL_REQUEST,
  VALIDATE_EMAIL_SUCCESS,
} from '../../actionTypes';
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
    try {
      dispatch({
        type: VALIDATE_EMAIL_REQUEST,
      });
      const result = await postValidateEmail(data, config);

      dispatch({
        type: VALIDATE_EMAIL_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: VALIDATE_EMAIL_FAILURE,
      });

      throw error;
    }
  };
