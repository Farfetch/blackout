import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type DeleteToken,
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
const removeUserTokenFactory =
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.DELETE_USER_TOKEN_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default removeUserTokenFactory;
