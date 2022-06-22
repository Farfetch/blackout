import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { PostTokens } from '@farfetch/blackout-client/authentication/types';

/**
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates client credentials token.
 *
 * @param postTokens    -
 * @param postUserToken - Post User token client guest credentials.
 *
 * @returns Thunk factory.
 */
export default (postTokens: PostTokens) =>
  (config?: Config) =>
  async (dispatch: Dispatch): Promise<any> => {
    try {
      dispatch({
        type: actionTypes.CREATE_CLIENT_CREDENTIALS_TOKEN_REQUEST,
      });
      const result = await postTokens(
        { grantType: 'client_credentials' },
        config,
      );

      dispatch({
        payload: result,
        type: actionTypes.CREATE_CLIENT_CREDENTIALS_TOKEN_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.CREATE_CLIENT_CREDENTIALS_TOKEN_FAILURE,
      });

      throw error;
    }
  };
