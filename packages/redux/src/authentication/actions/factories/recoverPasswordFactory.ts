import {
  PASSWORD_RECOVER_FAILURE,
  PASSWORD_RECOVER_REQUEST,
  PASSWORD_RECOVER_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Dispatch } from 'redux';

/**
 * @param data   - User details.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for sending an email for the user to reset the password.
 *
 * @param postPasswordRecover - Post password recover client.
 *
 * @returns Thunk factory.
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
    try {
      dispatch({
        type: PASSWORD_RECOVER_REQUEST,
      });
      const result = await postPasswordRecover(data, config);

      dispatch({
        type: PASSWORD_RECOVER_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: PASSWORD_RECOVER_FAILURE,
      });

      throw error;
    }
  };
