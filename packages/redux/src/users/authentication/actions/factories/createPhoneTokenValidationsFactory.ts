import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostPhoneTokenValidation,
  PostPhoneTokenValidationData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Creates a new guest user.
 *
 * @param postPhoneTokenValidations - Post guest user client.
 *
 * @returns Thunk factory.
 */
const createPhoneTokenValidationsFactory =
  (postPhoneTokenValidations: PostPhoneTokenValidation) =>
  (data: PostPhoneTokenValidationData, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.CREATE_PHONE_TOKEN_VALIDATIONS_REQUEST,
      });

      const result = await postPhoneTokenValidations(data, config);

      dispatch({
        payload: result,
        type: actionTypes.CREATE_PHONE_TOKEN_VALIDATIONS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_PHONE_TOKEN_VALIDATIONS_FAILURE,
      });

      throw error;
    }
  };

export default createPhoneTokenValidationsFactory;
