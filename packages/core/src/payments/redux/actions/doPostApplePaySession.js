import {
  POST_APPLE_PAY_SESSION_FAILURE,
  POST_APPLE_PAY_SESSION_REQUEST,
  POST_APPLE_PAY_SESSION_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} PostApplePaySessionData
 * @property {string} validationUrl - Set the validation url to get the Merchant session.
 */

/**
 * @callback PostApplePaySessionThunkFactory
 * @param {PostApplePaySessionData} data - Details for the apple pay session.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for creating an apple pay session.
 *
 * @function doPostApplePaySession
 * @memberof module:payments/actions
 *
 * @param {Function} postApplePaySession - Post apple pay session client.
 *
 * @returns {PostApplePaySessionThunkFactory} Thunk factory.
 */
export default postApplePaySession => (data, config) => async dispatch => {
  dispatch({
    type: POST_APPLE_PAY_SESSION_REQUEST,
  });

  try {
    const result = await postApplePaySession(data, config);

    dispatch({
      payload: result,
      type: POST_APPLE_PAY_SESSION_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: POST_APPLE_PAY_SESSION_FAILURE,
    });

    throw error;
  }
};
