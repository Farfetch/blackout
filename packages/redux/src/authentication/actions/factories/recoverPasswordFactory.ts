import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  PostPasswordRecover,
  PostPasswordRecoverData,
} from '@farfetch/blackout-client/authentication/types';

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
export default (postPasswordRecover: PostPasswordRecover) =>
  (data: PostPasswordRecoverData, config?: Config) =>
  async (dispatch: Dispatch): Promise<any> => {
    try {
      dispatch({
        type: actionTypes.PASSWORD_RECOVER_REQUEST,
      });
      const result = await postPasswordRecover(data, config);

      dispatch({
        type: actionTypes.PASSWORD_RECOVER_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.PASSWORD_RECOVER_FAILURE,
      });

      throw error;
    }
  };
