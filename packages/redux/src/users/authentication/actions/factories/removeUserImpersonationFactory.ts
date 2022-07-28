import * as actionTypes from '../../actionTypes';
import {
  Config,
  DeleteUserImpersonation,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Deletes an user impersonation.
 *
 * @param deleteUserImpersonation - Delete user impersonation client.
 *
 * @returns Thunk factory.
 */
const removeUserImpersonationFactory =
  (deleteUserImpersonation: DeleteUserImpersonation) =>
  (impersonatedAccessTokenId: string, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.DELETE_USER_IMPERSONATION_REQUEST,
      });
      const result = await deleteUserImpersonation(
        impersonatedAccessTokenId,
        config,
      );

      dispatch({
        meta: { impersonatedAccessTokenId },
        type: actionTypes.DELETE_USER_IMPERSONATION_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.DELETE_USER_IMPERSONATION_FAILURE,
      });

      throw error;
    }
  };

export default removeUserImpersonationFactory;
