import {
  CREATE_PHONE_TOKEN_VALIDATIONS_FAILURE,
  CREATE_PHONE_TOKEN_VALIDATIONS_REQUEST,
  CREATE_PHONE_TOKEN_VALIDATIONS_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';
import type {
  PostPhoneTokenValidations,
  PostPhoneTokenValidationsData,
} from '@farfetch/blackout-client/users/types';

/**
 * @callback CreatePhoneTokenValidationsThunkFactory
 * @param {CreatePhoneTokenValidationsData} data - User to be registered.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a new guest user.
 *
 * @function createPhoneTokenValidations
 * @memberof module:users/actions
 *
 * @param {Function} postPhoneTokenValidations - Post guest user client.
 *
 * @returns {CreatePhoneTokenValidationsThunkFactory} Thunk factory.
 */

const createPhoneTokenValidations =
  (postPhoneTokenValidations: PostPhoneTokenValidations) =>
  (data: PostPhoneTokenValidationsData, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: CREATE_PHONE_TOKEN_VALIDATIONS_REQUEST,
    });

    try {
      const result = await postPhoneTokenValidations(data, config);

      dispatch({
        payload: result,
        type: CREATE_PHONE_TOKEN_VALIDATIONS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: CREATE_PHONE_TOKEN_VALIDATIONS_FAILURE,
      });

      throw error;
    }
  };

export default createPhoneTokenValidations;
