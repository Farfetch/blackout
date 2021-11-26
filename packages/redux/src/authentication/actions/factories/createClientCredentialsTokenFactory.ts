import {
  CREATE_CLIENT_CREDENTIALS_TOKEN_FAILURE,
  CREATE_CLIENT_CREDENTIALS_TOKEN_REQUEST,
  CREATE_CLIENT_CREDENTIALS_TOKEN_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';

/**
 * @callback PostTokensCredentialThunkFactory
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates client credentials token.
 *
 * @function createClientCredentialsToken
 * @param postTokens
 * @memberof module:authentication/actions/factories
 *
 * @param {Function} postUserToken - Post User token client guest credentials.
 * @returns {PostTokensCredentialThunkFactory} Thunk factory.
 */
export default (postTokens: any) =>
  (config?: { [k: string]: any }) =>
  async (dispatch: Dispatch): Promise<any> => {
    dispatch({
      type: CREATE_CLIENT_CREDENTIALS_TOKEN_REQUEST,
    });

    try {
      const result = await postTokens(
        { grantType: 'client_credentials' },
        config,
      );

      dispatch({
        payload: result,
        type: CREATE_CLIENT_CREDENTIALS_TOKEN_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: CREATE_CLIENT_CREDENTIALS_TOKEN_FAILURE,
      });

      throw error;
    }
  };
