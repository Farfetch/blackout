import {
  DELETE_USER_TOKEN_FAILURE,
  DELETE_USER_TOKEN_REQUEST,
  DELETE_USER_TOKEN_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { DeleteTokens } from '@farfetch/blackout-client/authentication/types';
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
        type: DELETE_USER_TOKEN_REQUEST,
      });
      const result = await deleteTokens(userTokenId, config);

      dispatch({
        meta: { userTokenId },
        type: DELETE_USER_TOKEN_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: DELETE_USER_TOKEN_FAILURE,
      });

      throw error;
    }
  };
