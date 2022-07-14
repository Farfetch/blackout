import * as actionTypes from '../../actionTypes';
import { toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type {
  PostPhoneTokenValidations,
  PostPhoneTokenValidationsData,
} from '@farfetch/blackout-client/src/users/types';

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

export const createPhoneTokenValidationsFactory =
  (postPhoneTokenValidations: PostPhoneTokenValidations) =>
  (data: PostPhoneTokenValidationsData, config?: Record<string, unknown>) =>
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
