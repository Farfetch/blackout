import * as actionTypes from '../../actionTypes';
import { Config, PostToken, toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates client credentials token.
 *
 * @param postTokens - Post User token client guest credentials.
 *
 * @returns Thunk factory.
 */
const createClientCredentialsTokenFactory =
  (postTokens: PostToken) =>
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
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_CLIENT_CREDENTIALS_TOKEN_FAILURE,
      });

      throw error;
    }
  };

export default createClientCredentialsTokenFactory;
