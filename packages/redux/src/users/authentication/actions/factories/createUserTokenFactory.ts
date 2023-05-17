import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PostToken,
  type PostTokenData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Creates a user token.
 *
 * @param postTokens - Post user token client.
 *
 * @returns Thunk factory.
 */
const createUserTokenFactory =
  (postTokens: PostToken) =>
  (data: PostTokenData, config?: Config) =>
  async (dispatch: Dispatch) => {
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.CREATE_USER_TOKEN_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default createUserTokenFactory;
