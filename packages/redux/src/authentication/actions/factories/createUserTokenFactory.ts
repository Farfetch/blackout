import {
  CREATE_USER_TOKEN_FAILURE,
  CREATE_USER_TOKEN_REQUEST,
  CREATE_USER_TOKEN_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';

/**
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a user token.
 *
 * @param postTokens - Post user token client.
 *
 * @returns Thunk factory.
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
