import * as actionTypes from '../../actionTypes';
import { Config, PostToken, toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

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
  async (dispatch: Dispatch) => {
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.CREATE_CLIENT_CREDENTIALS_TOKEN_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default createClientCredentialsTokenFactory;
