import {
  CREATE_PHONE_TOKEN_VALIDATIONS_FAILURE,
  CREATE_PHONE_TOKEN_VALIDATIONS_REQUEST,
  CREATE_PHONE_TOKEN_VALIDATIONS_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Dispatch } from 'redux';
import type {
  PostPhoneTokenValidations,
  PostPhoneTokenValidationsData,
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
 * @param postPhoneTokenValidations - Post guest user client.
 *
 * @returns Thunk factory.
 */

const createPhoneTokenValidations =
  (postPhoneTokenValidations: PostPhoneTokenValidations) =>
  (data: PostPhoneTokenValidationsData, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: CREATE_PHONE_TOKEN_VALIDATIONS_REQUEST,
      });

      const result = await postPhoneTokenValidations(data, config);

      dispatch({
        payload: result,
        type: CREATE_PHONE_TOKEN_VALIDATIONS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: CREATE_PHONE_TOKEN_VALIDATIONS_FAILURE,
      });

      throw error;
    }
  };

export default createPhoneTokenValidations;
