import {
  CREATE_USER_TOKEN_FAILURE,
  CREATE_USER_TOKEN_REQUEST,
  CREATE_USER_TOKEN_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';

/**
 * @typedef {object} PostUserTokenData
 * @property {string} username - User's email.
 * @property {string} password - User's password.
 * @property {string} grantType - Identity GrantType.
 * @property {string} refreshToken - Refresh Token.
 */

/**
 * @callback PostTokensThunkFactory
 * @param {PostUserTokenData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a user token.
 *
 * @function createUserTokenFactory
 * @memberof module:authentication/actions/factories
 * @param {Function} postTokens - Post user token client.
 * @returns {PostTokensThunkFactory} Thunk factory.
 */
export default (postTokens: any) =>
  (
    data: {
      username: string;
      password: string;
      grantType: string;
      refreshToken: string;
    },
    config?: {
      [k: string]: any;
    },
  ) =>
  async (dispatch: Dispatch): Promise<any> => {
    dispatch({
      type: CREATE_USER_TOKEN_REQUEST,
    });

    try {
      const result = await postTokens(
        { ...data, grantType: 'password' },
        config,
      );

      dispatch({
        payload: result,
        type: CREATE_USER_TOKEN_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: CREATE_USER_TOKEN_FAILURE,
      });

      throw error;
    }
  };
