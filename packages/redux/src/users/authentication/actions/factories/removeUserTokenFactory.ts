import * as actionTypes from '../../actionTypes';
import {
  Config,
  DeleteToken,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Deletes a user or client's token.
 *
 * @param deleteTokens - Delete user token client.
 *
 * @returns Thunk factory.
 */
const removeUserImpersonationFactory =
  (deleteTokens: DeleteToken) =>
  (userTokenId: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<number> => {
    try {
      dispatch({
        type: actionTypes.DELETE_USER_TOKEN_REQUEST,
      });
      const result = await deleteTokens(userTokenId, config);

      dispatch({
        meta: { userTokenId },
        type: actionTypes.DELETE_USER_TOKEN_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.DELETE_USER_TOKEN_FAILURE,
      });

      throw error;
    }
  };

export default removeUserImpersonationFactory;
