import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostPhoneNumberValidation,
  PostPhoneNumberValidationData,
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
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_PHONE_NUMBER_VALIDATIONS_FAILURE,
      });

      throw error;
    }
  };

export default createPhoneNumberValidationsFactory;
