import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostRefreshEmailToken,
  PostRefreshEmailTokenData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Refreshes the user's validation token. To be used when the user went past the
 * token's expiration date or there was other kind of error validation the user's
 * email.
 *
 * @param postRefreshEmailToken - Post refresh email token client.
 *
 * @returns Thunk factory.
 */
const refreshEmailTokenFactory =
  (postRefreshEmailToken: PostRefreshEmailToken) =>
  (data: PostRefreshEmailTokenData, config?: Config) =>
  async (dispatch: Dispatch): Promise<any> => {
    try {
      dispatch({
        type: actionTypes.REFRESH_EMAIL_TOKEN_REQUEST,
      });
      const result = await postRefreshEmailToken(data, config);

      dispatch({
        type: actionTypes.REFRESH_EMAIL_TOKEN_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.REFRESH_EMAIL_TOKEN_FAILURE,
      });

      throw error;
    }
  };

export default refreshEmailTokenFactory;
