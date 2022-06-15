import {
  REFRESH_EMAIL_TOKEN_FAILURE,
  REFRESH_EMAIL_TOKEN_REQUEST,
  REFRESH_EMAIL_TOKEN_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  PostRefreshEmailToken,
  PostRefreshEmailTokenData,
} from '@farfetch/blackout-client/authentication/types';

/**
 * @param data   - Details to refresh the user's validation token.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Refreshes the user's validation token. To be used when the user went past the
 * token's expiration date or there was other kind of error validation the user's
 * email.
 *
 * @param postRefreshEmailToken - Post refresh email token client.
 *
 * @returns Thunk factory.
 */
export default (postRefreshEmailToken: PostRefreshEmailToken) =>
  (data: PostRefreshEmailTokenData, config?: Config) =>
  async (dispatch: Dispatch): Promise<any> => {
    try {
      dispatch({
        type: REFRESH_EMAIL_TOKEN_REQUEST,
      });
      const result = await postRefreshEmailToken(data, config);

      dispatch({
        type: REFRESH_EMAIL_TOKEN_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: REFRESH_EMAIL_TOKEN_FAILURE,
      });

      throw error;
    }
  };