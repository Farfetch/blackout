import {
  DELETE_USER_IMPERSONATION_FAILURE,
  DELETE_USER_IMPERSONATION_REQUEST,
  DELETE_USER_IMPERSONATION_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { DeleteUserImpersonation } from '@farfetch/blackout-client/authentication/types';
import type { Dispatch } from 'redux';

/**
 * @param impersonatedAccessTokenId - The impersonated access token.
 * @param config                    - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Deletes an user impersonation.
 *
 * @param deleteUserImpersonation - Delete user impersonation client.
 *
 * @returns Thunk factory.
 */
export default (deleteUserImpersonation: DeleteUserImpersonation) =>
  (impersonatedAccessTokenId: number, config?: Config) =>
  async (dispatch: Dispatch): Promise<any> => {
    try {
      dispatch({
        type: DELETE_USER_IMPERSONATION_REQUEST,
      });
      const result = await deleteUserImpersonation(
        impersonatedAccessTokenId,
        config,
      );

      dispatch({
        meta: { impersonatedAccessTokenId },
        type: DELETE_USER_IMPERSONATION_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: DELETE_USER_IMPERSONATION_FAILURE,
      });

      throw error;
    }
  };
