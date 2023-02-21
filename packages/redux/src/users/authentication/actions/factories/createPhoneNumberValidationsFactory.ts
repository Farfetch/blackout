import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type PostPhoneNumberValidation,
  type PostPhoneNumberValidationData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Creates a new guest user.
 *
 * @param postPhoneNumberValidations - Post guest user client.
 *
 * @returns Thunk factory.
 */
const createPhoneNumberValidationsFactory =
  (postPhoneNumberValidations: PostPhoneNumberValidation) =>
  (data: PostPhoneNumberValidationData, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.CREATE_PHONE_NUMBER_VALIDATIONS_REQUEST,
      });

      const result = await postPhoneNumberValidations(data, config);

      dispatch({
        payload: result,
        type: actionTypes.CREATE_PHONE_NUMBER_VALIDATIONS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.CREATE_PHONE_NUMBER_VALIDATIONS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default createPhoneNumberValidationsFactory;
