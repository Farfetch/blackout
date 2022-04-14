import {
  POST_PHONE_NUMBER_VALIDATIONS_FAILURE,
  POST_PHONE_NUMBER_VALIDATIONS_REQUEST,
  POST_PHONE_NUMBER_VALIDATIONS_SUCCESS,
} from '../actionTypes';

/**
 * @callback PostPhoneNumberValidationsThunkFactory
 * @param {PostPhoneNumberValidationsData} data - Phone number validations object.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for validate a phone number without an account.
 *
 * @function doPostPhoneNumberValidations
 * @memberof module:profile/actions
 *
 * @param {Function} postPhoneNumberValidations - Post phone number validations client.
 *
 * @returns {PostPhoneNumberValidationsThunkFactory} Thunk factory.
 */

export default postPhoneNumberValidations =>
  (data, config) =>
  async dispatch => {
    dispatch({
      type: POST_PHONE_NUMBER_VALIDATIONS_REQUEST,
    });

    try {
      const result = await postPhoneNumberValidations(data, config);

      dispatch({
        type: POST_PHONE_NUMBER_VALIDATIONS_SUCCESS,
        payload: result,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: POST_PHONE_NUMBER_VALIDATIONS_FAILURE,
      });

      throw error;
    }
  };
