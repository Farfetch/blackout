import {
  POST_PHONE_TOKEN_VALIDATIONS_FAILURE,
  POST_PHONE_TOKEN_VALIDATIONS_REQUEST,
  POST_PHONE_TOKEN_VALIDATIONS_SUCCESS,
} from '../actionTypes';

/**
 * @callback PostPhoneTokenValidationsThunkFactory
 * @param {PostPhoneTokenValidationsData} data - Phone token validations object.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for validate the user's phone number with a phone token.
 *
 * @function doPostPhoneTokenValidations
 * @memberof module:profile/actions
 *
 * @param {Function} postPhoneTokenValidations - Post phone token validations client.
 *
 * @returns {PostPhoneTokenValidationsThunkFactory} Thunk factory.
 */

export default postPhoneTokenValidations => (data, config) => async dispatch => {
  dispatch({
    type: POST_PHONE_TOKEN_VALIDATIONS_REQUEST,
  });

  try {
    const result = await postPhoneTokenValidations(data, config);

    dispatch({
      type: POST_PHONE_TOKEN_VALIDATIONS_SUCCESS,
      payload: result,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: POST_PHONE_TOKEN_VALIDATIONS_FAILURE,
    });

    throw error;
  }
};
