import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  PostTokens,
  PostTokensData,
} from '@farfetch/blackout-client/authentication/types';

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
export default (postTokens: PostTokens) =>
  (data: PostTokensData, config?: Config) =>
  async (dispatch: Dispatch): Promise<any> => {
    try {
      dispatch({
        type: actionTypes.CREATE_USER_TOKEN_REQUEST,
      });
      const result = await postTokens(
        { ...data, grantType: 'password' },
        config,
      );

      dispatch({
        payload: result,
        type: actionTypes.CREATE_USER_TOKEN_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.CREATE_USER_TOKEN_FAILURE,
      });

      throw error;
    }
  };
