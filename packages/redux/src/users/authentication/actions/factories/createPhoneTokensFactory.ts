import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostPhoneToken,
  PostPhoneTokenData,
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
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_PHONE_TOKEN_FAILURE,
      });

      throw error;
    }
  };

export default createPhoneTokensFactory;
