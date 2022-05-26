import {
  CREATE_PHONE_NUMBER_VALIDATIONS_FAILURE,
  CREATE_PHONE_NUMBER_VALIDATIONS_REQUEST,
  CREATE_PHONE_NUMBER_VALIDATIONS_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Dispatch } from 'redux';
import type {
  PostPhoneNumberValidations,
  PostPhoneNumberValidationsData,
} from '@farfetch/blackout-client/users/types';

/**
 * @param data   - User to be registered.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a new guest user.
 *
 * @param postPhoneNumberValidations - Post guest user client.
 *
 * @returns Thunk factory.
 */

const createPhoneNumberValidations =
  (postPhoneNumberValidations: PostPhoneNumberValidations) =>
  (data: PostPhoneNumberValidationsData, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: CREATE_PHONE_NUMBER_VALIDATIONS_REQUEST,
      });

      const result = await postPhoneNumberValidations(data, config);

      dispatch({
        payload: result,
        type: CREATE_PHONE_NUMBER_VALIDATIONS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: CREATE_PHONE_NUMBER_VALIDATIONS_FAILURE,
      });

      throw error;
    }
  };

export default createPhoneNumberValidations;
