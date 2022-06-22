import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { PostTokens } from '@farfetch/blackout-client/authentication/types';

/**
 * @param refreshToken - Refresh Token.
 * @param config       - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Refreshes user or client's token.
 *
 * @param postTokens    -
 * @param postUserToken - Post User token client guest credentials.
 *
 * @returns Thunk factory.
 */
export default (postTokens: PostTokens) =>
  (refreshToken: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<any> => {
    try {
      dispatch({
        type: actionTypes.REFRESH_USER_TOKEN_REQUEST,
      });
      const result = await postTokens(
        { refreshToken, grantType: 'refresh_token' },
        config,
      );

      dispatch({
        payload: result,
        type: actionTypes.REFRESH_USER_TOKEN_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.REFRESH_USER_TOKEN_FAILURE,
      });

      throw error;
    }
  };
