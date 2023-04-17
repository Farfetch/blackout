import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PostPhoneNumberValidation,
  type PostPhoneNumberValidationData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Creates a new phone number validation.
 *
 * @param postPhoneNumberValidation - Post phone number validation.
 *
 * @returns Thunk factory.
 */
const createPhoneNumberValidationFactory =
  (postPhoneNumberValidation: PostPhoneNumberValidation) =>
  (data: PostPhoneNumberValidationData, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.CREATE_PHONE_NUMBER_VALIDATION_REQUEST,
      });

      const result = await postPhoneNumberValidation(data, config);

      dispatch({
        payload: result,
        type: actionTypes.CREATE_PHONE_NUMBER_VALIDATION_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.CREATE_PHONE_NUMBER_VALIDATION_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default createPhoneNumberValidationFactory;
