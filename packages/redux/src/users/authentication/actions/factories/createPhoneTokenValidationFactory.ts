import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PostPhoneTokenValidation,
  type PostPhoneTokenValidationData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Creates a new phone token validation.
 *
 * @param postPhoneTokenValidation - Post phone token validation client.
 *
 * @returns Thunk factory.
 */
const createPhoneTokenValidationFactory =
  (postPhoneTokenValidation: PostPhoneTokenValidation) =>
  (data: PostPhoneTokenValidationData, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.CREATE_PHONE_TOKEN_VALIDATION_REQUEST,
      });

      const result = await postPhoneTokenValidation(data, config);

      dispatch({
        payload: result,
        type: actionTypes.CREATE_PHONE_TOKEN_VALIDATION_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.CREATE_PHONE_TOKEN_VALIDATION_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default createPhoneTokenValidationFactory;
