import * as actionTypes from '../../actionTypes';
import {
  Config,
  DeleteTokens,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * @param userTokenId - The user token Id.
 * @param config      - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Deletes a user or client's token.
 *
 * @param deleteTokens - Delete user token client.
 *
 * @returns Thunk factory.
 */
export default (deleteTokens: DeleteTokens) =>
  (userTokenId: number, config?: Config) =>
  async (dispatch: Dispatch): Promise<any> => {
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
