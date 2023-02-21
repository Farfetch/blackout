import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type PostPhoneToken,
  type PostPhoneTokenData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Creates a new guest user.
 *
 * @param postPhoneToken - Post guest user client.
 *
 * @returns Thunk factory.
 */
const createPhoneTokensFactory =
  (postPhoneToken: PostPhoneToken) =>
  (data: PostPhoneTokenData, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.CREATE_PHONE_TOKEN_REQUEST,
      });

      const result = await postPhoneToken(data, config);

      dispatch({
        payload: result,
        type: actionTypes.CREATE_PHONE_TOKEN_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.CREATE_PHONE_TOKEN_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default createPhoneTokensFactory;
