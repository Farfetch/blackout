import * as actionTypes from '../../actionTypes';
import { Config, PostToken, toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

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
const refreshTokenFactory =
  (postTokens: PostToken) =>
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
        payload: { error: toBlackoutError(error) },
        type: actionTypes.REFRESH_USER_TOKEN_FAILURE,
      });

      throw error;
    }
  };

export default refreshTokenFactory;
