import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostToken,
  PostTokenData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a user token.
 *
 * @param postTokens - Post user token client.
 *
 * @returns Thunk factory.
 */
const createUserTokenFactory =
  (postTokens: PostToken) =>
  (data: PostTokenData, config?: Config) =>
  async (dispatch: Dispatch): Promise<any> => {
    try {
      dispatch({
        type: actionTypes.CREATE_USER_TOKEN_REQUEST,
      });
      const result = await postTokens(
        { ...data, grantType: 'password' },
        config,
      );

      dispatch({
        payload: result,
        type: actionTypes.CREATE_USER_TOKEN_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_USER_TOKEN_FAILURE,
      });

      throw error;
    }
  };

export default createUserTokenFactory;
