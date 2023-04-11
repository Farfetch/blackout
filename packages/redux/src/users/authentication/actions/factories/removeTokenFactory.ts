import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type DeleteToken,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Removes a user or client credentials token.
 *
 * @param deleteToken - Delete token client.
 *
 * @returns Thunk factory.
 */
const removeTokenFactory =
  (deleteToken: DeleteToken) =>
  (tokenId: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<number> => {
    try {
      dispatch({
        type: actionTypes.REMOVE_TOKEN_REQUEST,
      });

      const result = await deleteToken(tokenId, config);

      dispatch({
        meta: { tokenId },
        type: actionTypes.REMOVE_TOKEN_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.REMOVE_TOKEN_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default removeTokenFactory;
