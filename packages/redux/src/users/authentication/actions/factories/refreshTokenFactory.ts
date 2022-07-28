import * as actionTypes from '../../actionTypes';
import { Config, PostToken, toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Refreshes user or client's token.
 *
 * @param postToken - Post token client.
 *
 * @returns Thunk factory.
 */
const refreshTokenFactory =
  (postToken: PostToken) =>
  (refreshToken: string, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.REFRESH_USER_TOKEN_REQUEST,
      });
      const result = await postToken(
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
