import {
  REFRESH_USER_TOKEN_FAILURE,
  REFRESH_USER_TOKEN_REQUEST,
  REFRESH_USER_TOKEN_SUCCESS,
} from '../../actionTypes';
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
export default (postTokens: any) =>
  (
    refreshToken: string,
    config?: {
      [k: string]: any;
    },
  ) =>
  async (dispatch: Dispatch): Promise<any> => {
    dispatch({
      type: REFRESH_USER_TOKEN_REQUEST,
    });

    try {
      const result = await postTokens(
        { refreshToken, grantType: 'refresh_token' },
        config,
      );

      dispatch({
        payload: result,
        type: REFRESH_USER_TOKEN_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: REFRESH_USER_TOKEN_FAILURE,
      });

      throw error;
    }
  };
