import {
  CREATE_PHONE_NUMBER_VALIDATIONS_FAILURE,
  CREATE_PHONE_NUMBER_VALIDATIONS_REQUEST,
  CREATE_PHONE_NUMBER_VALIDATIONS_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';
import type {
  PostPhoneNumberValidations,
  PostPhoneNumberValidationsData,
} from '@farfetch/blackout-client/users/types';

/**
 * @callback CreatePhoneNumberValidationsThunkFactory
 * @param {CreatePhoneNumberValidationsData} data - User to be registered.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a new guest user.
 *
 * @function createPhoneNumberValidations
 * @memberof module:users/actions
 *
 * @param {Function} postPhoneNumberValidations - Post guest user client.
 *
 * @returns {CreatePhoneNumberValidationsThunkFactory} Thunk factory.
 */

const createPhoneNumberValidations =
  (postPhoneNumberValidations: PostPhoneNumberValidations) =>
  (data: PostPhoneNumberValidationsData, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: CREATE_PHONE_NUMBER_VALIDATIONS_REQUEST,
    });

    try {
      const result = await postPhoneNumberValidations(data, config);

      dispatch({
        payload: result,
        type: CREATE_PHONE_NUMBER_VALIDATIONS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: CREATE_PHONE_NUMBER_VALIDATIONS_FAILURE,
      });

      throw error;
    }
  };

export default createPhoneNumberValidations;
