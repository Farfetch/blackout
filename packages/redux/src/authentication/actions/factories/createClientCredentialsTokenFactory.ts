import {
  CREATE_CLIENT_CREDENTIALS_TOKEN_FAILURE,
  CREATE_CLIENT_CREDENTIALS_TOKEN_REQUEST,
  CREATE_CLIENT_CREDENTIALS_TOKEN_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';

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
