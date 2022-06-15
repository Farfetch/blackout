import {
  PASSWORD_RESET_FAILURE,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  PostPasswordReset,
  PostPasswordResetData,
} from '@farfetch/blackout-client/authentication/types';

/**
 * @param data   - User details.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for resetting and setting a new password.
 *
 * @param postPasswordReset - Post password reset client.
 *
 * @returns Thunk factory.
 */
export default (postPasswordReset: PostPasswordReset) =>
  (data: PostPasswordResetData, config?: Config) =>
  async (dispatch: Dispatch): Promise<any> => {
    try {
      dispatch({
        type: PASSWORD_RESET_REQUEST,
      });
      const result = await postPasswordReset(data, config);

      dispatch({
        type: PASSWORD_RESET_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: PASSWORD_RESET_FAILURE,
      });

      throw error;
    }
  };