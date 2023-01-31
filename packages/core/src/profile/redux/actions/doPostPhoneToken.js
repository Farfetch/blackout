import {
  POST_PHONE_TOKEN_FAILURE,
  POST_PHONE_TOKEN_REQUEST,
  POST_PHONE_TOKEN_SUCCESS,
} from '../actionTypes';

/**
 * @callback PostPhoneTokenThunkFactory
 * @param {PostPhoneTokenData} data - Phone token object.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for sends a phone token to the specified phone number.
 *
 * @function doPostPhoneToken
 * @memberof module:profile/actions
 *
 * @param {Function} postPhoneToken - Post phone token client.
 *
 * @returns {PostPhoneTokenThunkFactory} Thunk factory.
 */

export default postPhoneToken => (data, config) => async dispatch => {
  dispatch({
    type: POST_PHONE_TOKEN_REQUEST,
  });

  try {
    const result = await postPhoneToken(data, config);

    dispatch({
      type: POST_PHONE_TOKEN_SUCCESS,
      payload: result,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: POST_PHONE_TOKEN_FAILURE,
    });

    throw error;
  }
};
