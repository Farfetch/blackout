import {
  DELETE_USER_IMPERSONATION_FAILURE,
  DELETE_USER_IMPERSONATION_REQUEST,
  DELETE_USER_IMPERSONATION_SUCCESS,
} from '../../actionTypes';
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
export default (deleteUserImpersonation: any) =>
  (
    impersonatedAccessTokenId: string,
    config?: {
      [k: string]: any;
    },
  ) =>
  async (dispatch: Dispatch): Promise<any> => {
    dispatch({
      type: DELETE_USER_IMPERSONATION_REQUEST,
    });

    try {
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
        payload: { error },
        type: DELETE_USER_IMPERSONATION_FAILURE,
      });

      throw error;
    }
  };
